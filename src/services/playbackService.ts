import { PlaybackProgress } from '../types/audio';
import { apiClient } from './apiClient';

const STORAGE_KEY = 'audiolibrary.playback';

/**
 * Handles persistence of playback progress to keep listening positions in sync
 * across devices.
 */
export const playbackService = {
  /**
   * Loads the latest playback progress from the API when available, otherwise
   * returning the cached value from local storage.
   */
  async loadProgress(userId: string): Promise<PlaybackProgress> {
    try {
      if (process.env.REACT_APP_API_BASE_URL) {
        const response = await apiClient.get<PlaybackProgress>(`/users/${userId}/playback`);
        this.persist(response.data);
        return response.data;
      }
    } catch (error) {
      console.warn('Falling back to cached playback progress.', error);
    }

    return this.readCache();
  },

  /**
   * Saves the provided playback progress both locally and remotely when an API
   * endpoint is available.
   */
  async saveProgress(userId: string, progress: PlaybackProgress): Promise<void> {
    this.persist(progress);

    if (!process.env.REACT_APP_API_BASE_URL) {
      return;
    }

    try {
      await apiClient.put(`/users/${userId}/playback`, progress);
    } catch (error) {
      console.error('Remote playback persistence failed.', error);
    }
  },

  /**
   * Stores playback progress inside local storage for offline resilience.
   */
  persist(progress: PlaybackProgress): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  },

  /**
   * Reads playback progress from local storage, falling back to an empty
   * structure when unavailable.
   */
  readCache(): PlaybackProgress {
    if (typeof window === 'undefined') {
      return { trackId: null, position: 0, updatedAt: new Date(0).toISOString() };
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { trackId: null, position: 0, updatedAt: new Date(0).toISOString() };
    }

    try {
      return JSON.parse(raw) as PlaybackProgress;
    } catch (error) {
      console.error('Failed to parse cached playback progress.', error);
      return { trackId: null, position: 0, updatedAt: new Date(0).toISOString() };
    }
  },
};
