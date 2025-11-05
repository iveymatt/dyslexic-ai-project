/**
 * WATCHER Agent
 * Detects tool updates and enqueues benchmark runs
 * Requires 2 independent signals before triggering
 */

import {
  WatcherEvent,
  WatcherTrigger,
  OrchestrationError,
  ErrorStage,
} from "../../orchestrator/schemas";

interface SignalRecord {
  toolId: string;
  versionHint: string;
  trigger: WatcherTrigger;
  evidence: string;
  timestamp: Date;
}

/**
 * Signal accumulator
 * Tracks signals for each tool/version to enforce 2-signal rule
 */
class SignalAccumulator {
  private signals: Map<string, SignalRecord[]> = new Map();

  /**
   * Add a signal and check if threshold is met (2 independent signals)
   */
  addSignal(signal: SignalRecord): WatcherEvent | null {
    const key = `${signal.toolId}:${signal.versionHint}`;
    const existing = this.signals.get(key) || [];

    // Check if this trigger type already exists
    if (existing.some((s) => s.trigger === signal.trigger)) {
      console.log(`[WATCHER] Duplicate signal for ${key} from ${signal.trigger}. Ignoring.`);
      return null;
    }

    // Add new signal
    existing.push(signal);
    this.signals.set(key, existing);

    // Check if we have 2+ independent signals
    if (existing.length >= 2) {
      console.log(`[WATCHER] Threshold met for ${key}. Emitting event.`);

      // Clear signals for this key
      this.signals.delete(key);

      // Emit WatcherEvent
      return {
        toolId: signal.toolId,
        versionHint: signal.versionHint,
        trigger: signal.trigger, // Use most recent trigger
        evidence: existing.map((s) => s.evidence),
        action: "enqueue_run",
      };
    }

    console.log(
      `[WATCHER] Signal ${existing.length}/2 for ${key} from ${signal.trigger}. Waiting for more.`
    );
    return null;
  }

  /**
   * Clear old signals (older than 7 days)
   */
  clearOldSignals(maxAgeMs: number = 7 * 24 * 60 * 60 * 1000): void {
    const now = Date.now();
    let cleared = 0;

    for (const [key, signals] of this.signals.entries()) {
      const filtered = signals.filter(
        (s) => now - s.timestamp.getTime() < maxAgeMs
      );

      if (filtered.length === 0) {
        this.signals.delete(key);
        cleared++;
      } else if (filtered.length < signals.length) {
        this.signals.set(key, filtered);
        cleared += signals.length - filtered.length;
      }
    }

    if (cleared > 0) {
      console.log(`[WATCHER] Cleared ${cleared} old signals`);
    }
  }
}

const accumulator = new SignalAccumulator();

/**
 * Process a manual trigger
 */
export function triggerManual(
  toolId: string,
  versionHint: string,
  evidence: string
): WatcherEvent | OrchestrationError {
  try {
    const signal: SignalRecord = {
      toolId,
      versionHint,
      trigger: WatcherTrigger.Manual,
      evidence,
      timestamp: new Date(),
    };

    const event = accumulator.addSignal(signal);

    if (event) {
      return event;
    }

    // Not enough signals yet
    return createError(
      `Signal recorded (1/2). Need one more independent signal to trigger benchmark.`,
      true,
      { signal }
    );
  } catch (error) {
    return createError(
      `Manual trigger failed: ${error instanceof Error ? error.message : String(error)}`,
      false,
      { error }
    );
  }
}

/**
 * Monitor RSS feed for updates
 * TODO: Implement actual RSS parsing
 */
export async function monitorRSS(
  feedUrl: string,
  toolId: string
): Promise<WatcherEvent | null> {
  console.log(`[WATCHER] Monitoring RSS feed: ${feedUrl} for ${toolId}`);

  // TODO: Implement RSS feed parsing
  // 1. Fetch feed
  // 2. Parse XML
  // 3. Look for version numbers in titles/content
  // 4. If new version found, add signal

  // Placeholder
  return null;
}

/**
 * Monitor GitHub releases
 * TODO: Implement GitHub API integration
 */
export async function monitorGitHub(
  repoOwner: string,
  repoName: string,
  toolId: string
): Promise<WatcherEvent | null> {
  console.log(`[WATCHER] Monitoring GitHub releases: ${repoOwner}/${repoName} for ${toolId}`);

  // TODO: Implement GitHub API calls
  // 1. Call /repos/:owner/:repo/releases/latest
  // 2. Compare with last known version
  // 3. If new, add signal

  // Placeholder
  return null;
}

/**
 * Monitor status page
 * TODO: Implement status page scraping
 */
export async function monitorStatusPage(
  statusUrl: string,
  toolId: string
): Promise<WatcherEvent | null> {
  console.log(`[WATCHER] Monitoring status page: ${statusUrl} for ${toolId}`);

  // TODO: Implement status page scraping
  // 1. Fetch status page
  // 2. Parse for version announcements
  // 3. If new version found, add signal

  // Placeholder
  return null;
}

/**
 * Run watcher loop
 * Checks all monitors periodically
 */
export async function runWatcherLoop(
  config: {
    rssFeeds?: Array<{ url: string; toolId: string }>;
    githubRepos?: Array<{ owner: string; repo: string; toolId: string }>;
    statusPages?: Array<{ url: string; toolId: string }>;
    intervalMs?: number;
  }
): Promise<void> {
  const intervalMs = config.intervalMs || 6 * 60 * 60 * 1000; // Default: 6 hours

  console.log(`[WATCHER] Starting watcher loop (interval: ${intervalMs}ms)`);

  while (true) {
    try {
      // Clear old signals
      accumulator.clearOldSignals();

      // Monitor RSS feeds
      if (config.rssFeeds) {
        for (const feed of config.rssFeeds) {
          await monitorRSS(feed.url, feed.toolId);
        }
      }

      // Monitor GitHub repos
      if (config.githubRepos) {
        for (const repo of config.githubRepos) {
          await monitorGitHub(repo.owner, repo.repo, repo.toolId);
        }
      }

      // Monitor status pages
      if (config.statusPages) {
        for (const status of config.statusPages) {
          await monitorStatusPage(status.url, status.toolId);
        }
      }

      // Wait for next interval
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    } catch (error) {
      console.error("[WATCHER] Loop error:", error);
      // Continue loop despite errors
      await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait 1 minute on error
    }
  }
}

/**
 * Create standardized error response
 */
function createError(
  message: string,
  recoverable: boolean,
  details?: Record<string, unknown>
): OrchestrationError {
  return {
    error: {
      stage: ErrorStage.WATCHER,
      message,
      recoverable,
      details,
    },
  };
}

/**
 * Validate WatcherEvent
 */
export function validateWatcherEvent(event: WatcherEvent): string | null {
  if (!event.toolId) return "toolId is required";
  if (!event.versionHint) return "versionHint is required";
  if (!Object.values(WatcherTrigger).includes(event.trigger)) {
    return "trigger must be one of: rss, github, status, manual";
  }
  if (!Array.isArray(event.evidence) || event.evidence.length === 0) {
    return "evidence must be a non-empty array";
  }
  if (event.action !== "enqueue_run") return "action must be 'enqueue_run'";

  return null;
}
