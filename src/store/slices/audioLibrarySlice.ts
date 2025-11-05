import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { audioLibraryService } from '../../services/audioLibraryService';
import { AudioTrack } from '../../types/audio';

export interface AudioLibraryState {
  items: AudioTrack[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: AudioLibraryState = {
  items: [],
  status: 'idle',
};

/**
 * Requests the audio catalog from the backend or local cache.
 */
export const fetchLibrary = createAsyncThunk('audioLibrary/fetchLibrary', async () => {
  const tracks = await audioLibraryService.fetchLibrary();
  return tracks;
});

/**
 * Uploads a new track and returns the persisted entity.
 */
export const uploadTrack = createAsyncThunk(
  'audioLibrary/uploadTrack',
  async (payload: Omit<AudioTrack, 'id' | 'uploadedAt'>) => {
    const track = await audioLibraryService.uploadTrack(payload);
    return track;
  },
);

/**
 * Redux slice responsible for the audio catalog lifecycle.
 */
export const audioLibrarySlice = createSlice({
  name: 'audioLibrary',
  initialState,
  reducers: {
    /**
     * Replaces the entire audio catalog.
     */
    setLibrary(state, action: PayloadAction<AudioTrack[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLibrary.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(fetchLibrary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchLibrary.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unable to load audio catalog.';
      })
      .addCase(uploadTrack.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(uploadTrack.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(uploadTrack.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unable to upload audio track.';
      });
  },
});

export const { setLibrary } = audioLibrarySlice.actions;

export default audioLibrarySlice.reducer;
