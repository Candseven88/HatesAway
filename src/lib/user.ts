import { v4 as uuidv4 } from 'uuid';

const USER_ID_KEY = 'hatesaway_user_id';

/**
 * Get or create a unique user ID for anonymous identification
 * Stored in localStorage for persistence across sessions
 */
export function getUserId(): string {
  if (typeof window === 'undefined') return '';
  
  let userId = localStorage.getItem(USER_ID_KEY);
  
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem(USER_ID_KEY, userId);
    
    // Also set cookie as backup
    document.cookie = `${USER_ID_KEY}=${userId}; max-age=31536000; path=/; SameSite=Lax`;
  }
  
  return userId;
}

/**
 * Convert user ID to a friendly display name
 * Format: "Anonymous #12345"
 */
export function getUserDisplayName(userId: string): string {
  if (!userId) return 'Anonymous #00000';
  
  // Convert UUID to a readable 5-digit number
  const hash = userId.replace(/-/g, '');
  const num = parseInt(hash.substring(0, 8), 16) % 99999;
  return `Anonymous #${num.toString().padStart(5, '0')}`;
}

/**
 * Clear user ID (useful for testing)
 */
export function clearUserId(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(USER_ID_KEY);
  document.cookie = `${USER_ID_KEY}=; max-age=0; path=/`;
}
