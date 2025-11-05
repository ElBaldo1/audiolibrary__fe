import { useEffect, useRef } from 'react';
import { playbackService } from '../services/playbackService';
import { useAppDispatch, useAppSelector } from '../store';
import { hydrateFromProgress } from '../store/slices/playbackSlice';

const USER_ID = 'portfolio-listener';

/**
 * Keeps the Redux playback slice aligned with the persistent storage layer so
 * that listening progress follows the user across sessions and devices.
 */
export const usePlaybackSync = () => {
  const dispatch = useAppDispatch();
  const currentTrackId = useAppSelector((state) => state.playback.currentTrackId);
  const position = useAppSelector((state) => state.playback.position);
  const hasHydrated = useRef(false);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const progress = await playbackService.loadProgress(USER_ID);
        dispatch(hydrateFromProgress(progress));
        hasHydrated.current = true;
      } catch (error) {
        console.error('Unable to load playback progress.', error);
      }
    };

    loadProgress().catch((error) => console.error(error));
  }, [dispatch]);

  useEffect(() => {
    if (!hasHydrated.current) {
      return;
    }

    const persist = async () => {
      const payload = {
        trackId: currentTrackId,
        position,
        updatedAt: new Date().toISOString(),
      };
      await playbackService.saveProgress(USER_ID, payload);
    };

    persist().catch((error) => console.error('Unable to persist playback progress.', error));
  }, [currentTrackId, position]);
};
