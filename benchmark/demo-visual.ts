#!/usr/bin/env node
/**
 * Visual Demo Script
 * Runs a real benchmark suite and opens results in browser
 */

import { executeSuite } from "./runners/executeSuite";
import { aggregateDAS, aggregateCPS, aggregateDAL } from "./runners/scoreAggregation";
import { readabilityIndex, socraticDepth, l2lIndex } from "./runners/metrics";
import * as fs from "fs/promises";
import * as path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
};

async function generateHTML(suiteResult: any) {
  // Calculate metrics for each task
  const tasksWithMetrics = suiteResult.taskResults.map((task: any) => {
    const readability = readabilityIndex(task.response);
    const socratic = socraticDepth(task.response);

    return {
      ...task,
      metrics: {
        readability,
        socratic,
      },
    };
  });

  // Calculate overall scores
  const avgReadability = tasksWithMetrics.reduce((sum: number, t: any) => sum + t.metrics.readability, 0) / tasksWithMetrics.length;
  const avgSocratic = tasksWithMetrics.reduce((sum: number, t: any) => sum + t.metrics.socratic, 0) / tasksWithMetrics.length;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${suiteResult.suiteId} - Live Results</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            color: #e0e0e0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            padding: 2rem;
            min-height: 100vh;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        header {
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(167, 139, 250, 0.2);
        }

        h1 {
            font-size: 2.5rem;
            background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.5rem;
        }

        .subtitle {
            color: #9ca3af;
            font-size: 1.1rem;
        }

        .live-badge {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            margin-top: 1rem;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.05);
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid rgba(167, 139, 250, 0.2);
            backdrop-filter: blur(10px);
        }

        .stat-label {
            color: #9ca3af;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .metrics-section {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 2rem;
            border: 1px solid rgba(167, 139, 250, 0.2);
        }

        .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: #a78bfa;
        }

        .metric-item {
            background: rgba(0, 0, 0, 0.2);
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        }

        .metric-label {
            color: #9ca3af;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            display: flex;
            justify-content: space-between;
        }

        .metric-score {
            font-weight: 600;
            color: #e0e0e0;
        }

        .progress-bar {
            width: 100%;
            height: 12px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 6px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            border-radius: 6px;
            transition: width 1s ease-out;
        }

        .progress-excellent {
            background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
        }

        .progress-good {
            background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
        }

        .progress-fair {
            background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%);
        }

        .tasks-section {
            margin-top: 2rem;
        }

        .task-card {
            background: rgba(0, 0, 0, 0.3);
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            border-left: 4px solid #a78bfa;
        }

        .task-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        .task-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #a78bfa;
        }

        .task-id {
            font-size: 0.8rem;
            color: #6b7280;
            font-family: 'Courier New', monospace;
        }

        .task-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
            font-size: 0.85rem;
            color: #9ca3af;
        }

        .task-response {
            background: rgba(0, 0, 0, 0.4);
            padding: 1rem;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            color: #d1d5db;
            max-height: 200px;
            overflow-y: auto;
            margin-bottom: 1rem;
        }

        .task-metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .task-card {
            animation: fadeIn 0.5s ease-out;
        }

        .footer {
            text-align: center;
            margin-top: 3rem;
            padding: 2rem;
            color: #6b7280;
        }

        .success-badge {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.8rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🚀 Live Benchmark Results</h1>
            <p class="subtitle">${suiteResult.suiteId.replace(/_/g, " ")}</p>
            <span class="live-badge">✅ Just Completed</span>
        </header>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">Tasks Completed</div>
                <div class="stat-value">${suiteResult.summary.totalTasks}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Success Rate</div>
                <div class="stat-value">${((suiteResult.summary.successfulTasks / suiteResult.summary.totalTasks) * 100).toFixed(0)}%</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Avg Latency</div>
                <div class="stat-value">${suiteResult.summary.avgLatencyMs.toFixed(0)}ms</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Total Cost</div>
                <div class="stat-value">$${suiteResult.summary.totalCost.toFixed(4)}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Duration</div>
                <div class="stat-value">${(suiteResult.durationMs / 1000).toFixed(1)}s</div>
            </div>
        </div>

        <div class="metrics-section">
            <h2 class="section-title">📊 Overall Metrics</h2>

            <div class="metric-item">
                <div class="metric-label">
                    <span>📖 Readability Index</span>
                    <span class="metric-score">${avgReadability.toFixed(1)}/100</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill ${avgReadability >= 60 ? 'progress-excellent' : avgReadability >= 40 ? 'progress-good' : 'progress-fair'}"
                         style="width: ${avgReadability}%"></div>
                </div>
            </div>

            <div class="metric-item">
                <div class="metric-label">
                    <span>🧠 Socratic Depth</span>
                    <span class="metric-score">${avgSocratic.toFixed(1)}/100</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill ${avgSocratic >= 60 ? 'progress-excellent' : avgSocratic >= 40 ? 'progress-good' : 'progress-fair'}"
                         style="width: ${avgSocratic}%"></div>
                </div>
            </div>
        </div>

        <div class="tasks-section">
            <div class="metrics-section">
                <h2 class="section-title">📋 Task Results (${tasksWithMetrics.length} tasks)</h2>

                ${tasksWithMetrics.map((task: any, index: number) => `
                    <div class="task-card" style="animation-delay: ${index * 0.1}s">
                        <div class="task-header">
                            <div>
                                <div class="task-title">Task ${index + 1}: ${task.taskId}</div>
                                <div class="task-id">${task.dimensionKey}</div>
                            </div>
                            <span class="success-badge">✅ Success</span>
                        </div>

                        <div class="task-meta">
                            <span>⚡ ${task.latencyMs}ms</span>
                            <span>📊 ${task.tokensUsed} tokens</span>
                            <span>💰 $${task.costUsd.toFixed(4)}</span>
                        </div>

                        <div class="task-response">${task.response}</div>

                        <div class="task-metrics">
                            <div class="metric-item">
                                <div class="metric-label">
                                    <span>Readability</span>
                                    <span class="metric-score">${task.metrics.readability.toFixed(1)}</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill ${task.metrics.readability >= 60 ? 'progress-excellent' : 'progress-fair'}"
                                         style="width: ${task.metrics.readability}%"></div>
                                </div>
                            </div>
                            <div class="metric-item">
                                <div class="metric-label">
                                    <span>Socratic</span>
                                    <span class="metric-score">${task.metrics.socratic.toFixed(1)}</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill ${task.metrics.socratic >= 60 ? 'progress-excellent' : 'progress-fair'}"
                                         style="width: ${task.metrics.socratic}%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="footer">
            <p>Executed at ${new Date(suiteResult.executedAt).toLocaleString()}</p>
            <p style="margin-top: 0.5rem;">Model: ${suiteResult.modelId}</p>
            <p style="margin-top: 0.5rem;">Eval Version: ${suiteResult.evalVersion}</p>
        </div>
    </div>
</body>
</html>`;

  return html;
}

async function runVisualDemo() {
  console.log(`\n${colors.bright}${colors.cyan}🚀 Running Visual Benchmark Demo${colors.reset}\n`);
  console.log(`${colors.yellow}This will:${colors.reset}`);
  console.log(`  1. Run the DAS Readability test suite (12 tasks)`);
  console.log(`  2. Calculate real metrics on responses`);
  console.log(`  3. Generate a beautiful HTML report`);
  console.log(`  4. Open it in your browser automatically\n`);

  console.log(`${colors.cyan}⏳ Running benchmark suite...${colors.reset}\n`);

  try {
    // Run the suite
    const result = await executeSuite({
      modelId: "local:helpful-v1",
      suiteId: "DAS_v1_readability",
      evalVersion: "v0.3",
    });

    console.log(`${colors.green}✅ Benchmark complete!${colors.reset}\n`);
    console.log(`📊 ${result.summary.successfulTasks}/${result.summary.totalTasks} tasks successful`);
    console.log(`⚡ Avg latency: ${result.summary.avgLatencyMs.toFixed(0)}ms`);
    console.log(`💰 Total cost: $${result.summary.totalCost.toFixed(4)}\n`);

    console.log(`${colors.cyan}📝 Generating HTML report...${colors.reset}`);

    // Generate HTML
    const html = await generateHTML(result);

    // Save to file
    const outputPath = path.join(process.cwd(), "benchmark", "live-results.html");
    await fs.writeFile(outputPath, html, "utf-8");

    console.log(`${colors.green}✅ Report saved to: benchmark/live-results.html${colors.reset}\n`);
    console.log(`${colors.cyan}🌐 Opening in browser...${colors.reset}\n`);

    // Open in browser
    await execAsync(`open "${outputPath}"`);

    console.log(`${colors.bright}${colors.green}✨ Done! Check your browser for the visual results.${colors.reset}\n`);
  } catch (error) {
    console.error(`\n${colors.bright}❌ Demo failed:${colors.reset}`, error);
    process.exit(1);
  }
}

runVisualDemo();
