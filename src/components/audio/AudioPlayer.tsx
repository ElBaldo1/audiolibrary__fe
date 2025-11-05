import { FC, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import { AudioTrack } from '../../types/audio';

export interface AudioPlayerProps {
  track: AudioTrack | null;
  position: number;
  onProgress: (position: number) => void;
  onPlay: () => void;
  onPause: () => void;
  onEnded: () => void;
}

/**
 * Wraps the native audio element to provide consistent styling and event
 * tracking while remaining fully accessible.
 */
export const AudioPlayer: FC<AudioPlayerProps> = ({
  track,
  position,
  onProgress,
  onPlay,
  onPause,
  onEnded,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const element = audioRef.current;
    if (!element || position === 0) {
      return;
    }
    if (Math.abs(element.currentTime - position) > 1) {
      element.currentTime = position;
    }
  }, [position, track?.id]);

  useEffect(() => {
    const element = audioRef.current;
    if (!element) {
      return;
    }

    const handleTimeUpdate = () => {
      onProgress(element.currentTime);
    };

    element.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      element.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onProgress, track?.id]);

  if (!track) {
    return (
      <Card className="bg-secondary text-light">
        <Card.Body>
          <Card.Title>Audio player</Card.Title>
          <Card.Text>Select a track from the library to start listening.</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="bg-secondary text-light" aria-live="polite">
      <Card.Body>
        <Card.Title>{track.title}</Card.Title>
        <Card.Subtitle className="mb-3">{track.author}</Card.Subtitle>
        {/* Captions are not applicable to audio-only content; the control remains accessible via ARIA labels. */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio
          id="audio-player"
          ref={audioRef}
          src={track.url}
          controls
          className="w-100"
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          aria-label={`Audio player for ${track.title}`}
        />
      </Card.Body>
    </Card>
  );
};
