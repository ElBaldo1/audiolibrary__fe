import {getToken} from 'api/utils';
import AudioPlayer from 'components/player/AudioPlayer';
import {ResponseAudiolibro} from 'model/responseDTO';
import React, {useEffect} from 'react';
import {Image} from 'react-bootstrap';
import 'components/Audiobooks/audiobooksItem/audioBooksDetails/audioBooksDetails.scss'
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {authSelector} from 'store/authentication/auth.selector';

// interface AudioBooksDetailsProps specifica il tipo di oggetti che accetta il componente
export interface AudioBooksDetailsProps {
    audiobook: ResponseAudiolibro;
}

// questo componente mostra i dettagli di un singolo audiobook

function AudioBooksDetails (props: AudioBooksDetailsProps) {
    const navigate=useNavigate();
    const checkAuth=useSelector(authSelector.userLogged);

    // controllo se l'utente è loggato e se non lo è lo reindirizzo alla pagina di login
    useEffect(() => {
        if( !checkAuth || getToken()===null){
            navigate('/login');
        }
    }, [])

    const {audiobook} = props;
    //todo fare con src vero/**/



    return (
        (!checkAuth) ? <></> :
        <div >
            <div className="cover">
                <div className="book">
                    <label htmlFor="page-1" className="book__page book__page--1">
                        <Image src={audiobook.copertina} alt="Immagine non caricata" />
                    </label>
                    <label htmlFor="page-2" className="book__page book__page--4">
                        <div className="page__content">
                            <h1 className="page__content-title">{audiobook.titolo}</h1>
                            <div className="page__content-text">
                                <p>{audiobook.descrizione} </p>
                            </div>
                            <AudioPlayer src={audiobook.audio} secondsStart={audiobook.ultimoAscolto.secondi} idAudiolibro={audiobook.idAudiolibro} />
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default AudioBooksDetails;
