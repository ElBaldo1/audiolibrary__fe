import { AudioTrack } from '../types/audio';
import { apiClient } from './apiClient';

const STORAGE_KEY = 'audiolibrary.tracks';

const createIdentifier = () => {
  const cryptoApi =
    typeof globalThis !== 'undefined' ? (globalThis.crypto as Crypto | undefined) : undefined;

  if (cryptoApi?.randomUUID) {
    return cryptoApi.randomUUID();
  }

  if (cryptoApi?.getRandomValues) {
    const buffer = new Uint32Array(4);
    cryptoApi.getRandomValues(buffer);
    return `track-${Array.from(buffer)
      .map((value) => value.toString(16))
      .join('')}`;
  }

  return `track-${Math.random().toString(36).slice(2, 11)}`;
};

/**
 * Provides CRUD utilities for audio tracks while gracefully degrading when the
 * backend API is unavailable. Data is cached locally to keep the experience
 * consistent across reloads.
 */
export const audioLibraryService = {
  /**
   * Retrieves the full audio catalog. It first attempts to contact the backend
   * and falls back to the cached copy stored in local storage.
   */
  async fetchLibrary(): Promise<AudioTrack[]> {
    try {
      if (process.env.REACT_APP_API_BASE_URL) {
        const response = await apiClient.get<AudioTrack[]>('/audiobooks');
        this.persist(response.data);
        return response.data;
      }
    } catch (error) {
      console.warn('Falling back to local cache for audio catalog.', error);
    }

    const cached = this.readCache();
    if (cached.length) {
      return cached;
    }

    const seed: AudioTrack[] = [
      {
        id: createIdentifier(),
        title: 'Exploring the Cosmos',
        author: 'Antonio Baldari',
        description: 'A guided tour across the observable universe.',
        duration: 1860,
        url: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
        uploadedAt: new Date().toISOString(),
      },
    ];
    this.persist(seed);
    return seed;
  },

  /**
   * Uploads a new audio track. The track is optimisticly appended to the local
   * cache and optionally pushed to the backend if an endpoint is configured.
   */
  async uploadTrack(partial: Omit<AudioTrack, 'id' | 'uploadedAt'>): Promise<AudioTrack> {
    const track: AudioTrack = {
      ...partial,
      id: createIdentifier(),
      uploadedAt: new Date().toISOString(),
    };

    try {
      if (process.env.REACT_APP_API_BASE_URL) {
        const response = await apiClient.post<AudioTrack>('/audiobooks', track);
        this.persist([...this.readCache(), response.data]);
        return response.data;
      }
    } catch (error) {
      console.error('Unable to persist audio track remotely.', error);
    }

    const updated = [...this.readCache(), track];
    this.persist(updated);
    return track;
  },

  /**
   * Stores the provided audio tracks inside local storage.
   */
  persist(tracks: AudioTrack[]): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tracks));
  },

  /**
   * Reads the cached audio tracks from local storage.
   */
  readCache(): AudioTrack[] {
    if (typeof window === 'undefined') {
      return [];
    }
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw) as AudioTrack[];
      return parsed;
    } catch (error) {
      console.error('Failed to parse cached audio catalog.', error);
      return [];
    }
  },
};
