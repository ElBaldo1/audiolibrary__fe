import { playbackService } from '../src/services/playbackService';
import { PlaybackProgress } from '../src/types/audio';

describe('playbackService', () => {
  beforeEach(() => {
    window.localStorage.clear();
    delete process.env.REACT_APP_API_BASE_URL;
  });

  it('returns an empty progress object when no cache exists', async () => {
    const progress = await playbackService.loadProgress('user');
    expect(progress).toEqual({ trackId: null, position: 0, updatedAt: expect.any(String) });
  });

  it('persists progress to local storage', async () => {
    const payload: PlaybackProgress = {
      trackId: '123',
      position: 42,
      updatedAt: new Date().toISOString(),
    };

    await playbackService.saveProgress('user', payload);
    const cached = playbackService.readCache();

    expect(cached).toEqual(payload);
  });
});
