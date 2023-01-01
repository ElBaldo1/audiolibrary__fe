import {RequestAudiolibroAscolta} from 'model/requestDTO';
import React, {useState, useEffect, useRef} from "react";
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import {audiolibroAction} from 'store/audiolibro/audiolibro.action';
import {useAppDispatch} from 'store/store.config';
import AudioControls from "./AudioControls";
import './style.css';


// questa interfaccia specifica i tipi di oggetti che il componente riceve
export interface AudioPlayerProps {
    src: string;
    secondsStart: number;
    idAudiolibro: number;
}

// questo componente serve per visualizzare il player
const AudioPlayer = (props: AudioPlayerProps) => {
    const {src, secondsStart, idAudiolibro} = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // questo stato serve per far scorrere la setBar
    const [trackProgress, setTrackProgress] = useState(0);
    // questo stato serve per capire se il player è in pausa o in riproduzione
    const [isPlaying, setIsPlaying] = useState(false);

    // Qui creo un nuovo audio dal src pdell'audiolibro, setto i secondi d'inizio
    const newAudio = new Audio(src);
    newAudio.currentTime = secondsStart;
    const audioRef = useRef(newAudio);
    const intervalRef = useRef();
    let duration = audioRef.current.duration;

    // questo metodo serve per far partire il player
    const startTimer = () => {
        // Elimina il timer precedente
        clearInterval(intervalRef.current);

        // @ts-ignore
        intervalRef.current = setInterval(() => {
            setTrackProgress(audioRef.current.currentTime);
        }, 1);
    };

    //
    const onScrub = (value: string) => {
        const initialValue = Number(value);
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = initialValue;
        setTrackProgress(audioRef.current.currentTime);
    };

    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    };


    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);


    useEffect(() => {
        if(audioRef.current.duration){
            duration = audioRef.current.duration;
        }
       setIsPlaying(true);
        setTrackProgress(secondsStart);
        // Pause and clean up on unmount
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        };
    }, []);

    // questo metodo viene chiamato quando si clicca sul pulsante salva ascolto, per mandare la richiesta al server
    const onTimeUpdate = () => {
        const requestAudiolibroAscolta: RequestAudiolibroAscolta =
            {
                idAudiolibro: idAudiolibro,
                secondi: audioRef.current.currentTime || 0
            }
        dispatch(audiolibroAction.fineAscolto(requestAudiolibroAscolta));
        navigate('/home');
    }

    // questo metodo serve per far tornare l'audio 10 secondi prima
    const onPrevClick = () => {
        if (audioRef.current.currentTime >= 10) {
            audioRef.current.currentTime -= 10;
        } else {
            audioRef.current.currentTime = 0;
        }
        setTrackProgress(audioRef.current.currentTime);
    }

    // questo metodo serve per far andare l'audio 10 secondi dopo
    const onNextClick = () => {
        if (audioRef.current.currentTime <= audioRef.current.duration - 10) {
            audioRef.current.currentTime += 10;
        } else {
            audioRef.current.currentTime = audioRef.current.duration;
        }
        setTrackProgress(audioRef.current.currentTime);
    }

    // questo metodo converte i secondi in minuti e secondi
    const calculateTime = (secs: number) => {
        if(isNaN(secs)){
            return "--:--";
        }
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }


return (
    <>
        <div className="audio-player">
            <div className="track-info">
                <AudioControls
                    isPlaying={isPlaying}
                    onPlayPauseClick={setIsPlaying}
                    onPrevClick={onPrevClick}
                    onNextClick={onNextClick}
                />
                <div className="secondsButton">
                    {calculateTime(audioRef.current.currentTime)}
                    <div>{calculateTime(duration)}</div>
                </div>
                <input
                    type="range"
                    value={trackProgress}
                    step="1"
                    min="0"
                    max={duration ? duration : `${duration}`}
                    className="progress"
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                />
            </div>
        </div>
        <Button onClick={() => onTimeUpdate()}>Salva punto di ascolto ed esci</Button>
    </>
);
}
;

export default AudioPlayer;
