import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlaybackProgress } from '../../types/audio';

export interface PlaybackState {
  currentTrackId: string | null;
  isPlaying: boolean;
  position: number;
}

const initialState: PlaybackState = {
  currentTrackId: null,
  isPlaying: false,
  position: 0,
};

/**
 * Stores playback information to keep the audio player in sync.
 */
export const playbackSlice = createSlice({
  name: 'playback',
  initialState,
  reducers: {
    /**
     * Updates the active track identifier.
     */
    setCurrentTrack(state, action: PayloadAction<string | null>) {
      state.currentTrackId = action.payload;
      state.position = action.payload === null ? 0 : state.position;
    },
    /**
     * Marks whether the current track is playing.
     */
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    /**
     * Updates the playback position in seconds.
     */
    setPosition(state, action: PayloadAction<number>) {
      state.position = action.payload;
    },
    /**
     * Rehydrates playback state from a persisted snapshot.
     */
    hydrateFromProgress(state, action: PayloadAction<PlaybackProgress>) {
      state.currentTrackId = action.payload.trackId;
      state.position = action.payload.position;
      state.isPlaying = false;
    },
    /**
     * Resets playback to its initial value.
     */
    resetPlayback() {
      return initialState;
    },
  },
});

export const { hydrateFromProgress, resetPlayback, setCurrentTrack, setIsPlaying, setPosition } =
  playbackSlice.actions;

export default playbackSlice.reducer;
