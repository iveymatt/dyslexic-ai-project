import type { Prompt, PromptFilters, SortOption } from '../types/prompts';

/**
 * Search prompts across title, description, tags, and prompt text
 */
export function searchPrompts(prompts: Prompt[], query: string): Prompt[] {
  if (!query.trim()) return prompts;

  const lowerQuery = query.toLowerCase();

  return prompts.filter(prompt => {
    return (
      prompt.title.toLowerCase().includes(lowerQuery) ||
      prompt.description.toLowerCase().includes(lowerQuery) ||
      prompt.prompt.toLowerCase().includes(lowerQuery) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      prompt.exampleUseCase.toLowerCase().includes(lowerQuery)
    );
  });
}

/**
 * Filter prompts by user type
 */
export function filterByUserType(prompts: Prompt[], userType: string): Prompt[] {
  if (userType === 'all') return prompts;
  return prompts.filter(p => p.userType === userType);
}

/**
 * Filter prompts by tags
 */
export function filterByTags(prompts: Prompt[], tags: string[]): Prompt[] {
  if (tags.length === 0) return prompts;

  return prompts.filter(prompt =>
    tags.some(tag => prompt.tags.includes(tag))
  );
}

/**
 * Sort prompts by specified criteria
 */
export function sortPrompts(prompts: Prompt[], sortBy: SortOption): Prompt[] {
  const sorted = [...prompts];

  switch (sortBy) {
    case 'popular':
      return sorted.sort((a, b) => b.rating - a.rating);

    case 'newest':
      return sorted.sort((a, b) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );

    case 'most-used':
      return sorted.sort((a, b) => b.usedCount - a.usedCount);

    case 'trending':
      // Trending = combination of recent usage and rating
      // Simple algorithm: (rating * 0.6) + (usedCount / 100 * 0.4)
      return sorted.sort((a, b) => {
        const scoreA = (a.rating * 0.6) + (a.usedCount / 100 * 0.4);
        const scoreB = (b.rating * 0.6) + (b.usedCount / 100 * 0.4);
        return scoreB - scoreA;
      });

    default:
      return sorted;
  }
}

/**
 * Apply all filters and sorting
 */
export function applyFilters(prompts: Prompt[], filters: PromptFilters): Prompt[] {
  let filtered = prompts;

  // Apply user type filter
  filtered = filterByUserType(filtered, filters.userType);

  // Apply search
  filtered = searchPrompts(filtered, filters.searchQuery);

  // Apply tag filters
  filtered = filterByTags(filtered, filters.selectedTags);

  // Apply sorting
  filtered = sortPrompts(filtered, filters.sortBy);

  return filtered;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackErr) {
      console.error('Failed to copy:', fallbackErr);
      return false;
    }
  }
}

/**
 * Get related prompts by IDs
 */
export function getRelatedPrompts(prompt: Prompt, allPrompts: Prompt[]): Prompt[] {
  return allPrompts.filter(p => prompt.relatedPromptIds.includes(p.id));
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
