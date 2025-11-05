import { useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AppLayout } from './components/layout/AppLayout';
import { AudioList } from './components/audio/AudioList';
import { AudioPlayer } from './components/audio/AudioPlayer';
import { AudioUploadForm, AudioUploadFormValues } from './components/audio/AudioUploadForm';
import { ErrorBanner } from './components/feedback/ErrorBanner';
import { LoadingSpinner } from './components/feedback/LoadingSpinner';
import { useAudioLibrary } from './hooks/useAudioLibrary';
import { usePlaybackSync } from './hooks/usePlaybackSync';
import { useAppDispatch, useAppSelector } from './store';
import { setCurrentTrack, setIsPlaying, setPosition } from './store/slices/playbackSlice';
import { uploadTrack } from './store/slices/audioLibrarySlice';

/**
 * Root component orchestrating the AudioLibrary experience.
 */
const App = () => {
  const dispatch = useAppDispatch();
  const { tracks, status, error, refresh } = useAudioLibrary();
  const playback = useAppSelector((state) => state.playback);
  const [isUploading, setIsUploading] = useState(false);

  usePlaybackSync();

  const activeTrack = useMemo(
    () => tracks.find((track) => track.id === playback.currentTrackId) ?? null,
    [tracks, playback.currentTrackId],
  );

  useEffect(() => {
    const handleKeyboardShortcuts = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      const audioElement = document.getElementById('audio-player') as HTMLAudioElement | null;
      if (!audioElement) {
        return;
      }

      if (event.code === 'Space') {
        event.preventDefault();
        if (audioElement.paused) {
          void audioElement.play();
        } else {
          audioElement.pause();
        }
      }

      if (event.key.toLowerCase() === 'f') {
        event.preventDefault();
        audioElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyboardShortcuts);
    return () => window.removeEventListener('keydown', handleKeyboardShortcuts);
  }, []);

  const toDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const handleUpload = async ({
    title,
    author,
    description,
    duration,
    file,
  }: AudioUploadFormValues) => {
    if (!file) {
      return;
    }

    setIsUploading(true);

    try {
      const dataUrl = await toDataUrl(file);
      await dispatch(
        uploadTrack({
          title,
          author,
          description,
          duration: duration || Math.ceil(file.size / 1000),
          url: dataUrl,
        }),
      ).unwrap();
      toast.success('Audio uploaded successfully.');
    } catch (uploadError) {
      toast.error('Audio upload failed. Please try again.');
      throw uploadError;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelectTrack = (trackId: string) => {
    dispatch(setCurrentTrack(trackId));
    dispatch(setPosition(0));
  };

  return (
    <AppLayout>
      <Row className="gy-4">
        <Col xl={4} lg={5} md={12}>
          <section aria-labelledby="upload-heading">
            <h2 id="upload-heading" className="h4 mb-4">
              Upload a new audio story
            </h2>
            <AudioUploadForm onUpload={handleUpload} isSubmitting={isUploading} />
          </section>
        </Col>
        <Col xl={8} lg={7} md={12} id="catalog">
          <section aria-labelledby="catalog-heading">
            <h2 id="catalog-heading" className="h4 mb-4">
              Library
            </h2>
            {(status === 'loading' || status === 'idle') && <LoadingSpinner />}
            {status === 'failed' && error && <ErrorBanner message={error} onRetry={refresh} />}
            {status === 'succeeded' &&
              (tracks.length ? (
                <AudioList
                  tracks={tracks}
                  activeTrackId={playback.currentTrackId}
                  onSelect={(track) => handleSelectTrack(track.id)}
                />
              ) : (
                <p className="text-muted">Upload your first audio story to populate the catalog.</p>
              ))}
          </section>
        </Col>
        <Col xs={12}>
          <section aria-labelledby="player-heading" className="mt-4">
            <h2 id="player-heading" className="h4 mb-3">
              Player
            </h2>
            <AudioPlayer
              track={activeTrack}
              position={playback.position}
              onProgress={(position) => dispatch(setPosition(position))}
              onPlay={() => dispatch(setIsPlaying(true))}
              onPause={() => dispatch(setIsPlaying(false))}
              onEnded={() => dispatch(setIsPlaying(false))}
            />
          </section>
        </Col>
      </Row>
    </AppLayout>
  );
};

export default App;
