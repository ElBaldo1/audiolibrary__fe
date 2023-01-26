import {getToken, getUser} from 'api/utils';
import AudiobookItem from 'components/Audiobooks/audiobooksItem/AudiobookItem';
import AudioBooksDetails from 'components/Audiobooks/audiobooksItem/audioBooksDetails/audioBooksDetails';
import Back from 'components/back/Back';
import MenuModificaCondivisione from 'components/menuModificaCondivisione/MenuModificaCondivisione';
import Navbar from 'components/navbar/Navbar';
import {Spinner} from 'components/spinner/spinner';
import {RequestAudiolibroModifica} from 'model/requestDTO';
import {ResponseAudiolibro} from 'model/responseDTO';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {audiolibroAction} from 'store/audiolibro/audiolibro.action';
import {audiolibroSelector} from 'store/audiolibro/audiolibro.selector';
import {PageType} from 'store/audiolibro/types';
import {authSelector} from 'store/authentication/auth.selector';
import {useAppDispatch} from 'store/store.config';


function AudiobooksList () {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const audiobooks = useSelector(audiolibroSelector.list);
    const pageType = useSelector(audiolibroSelector.page);
    const checkAuth = useSelector(authSelector.userLogged);
    const loading = useSelector(audiolibroSelector.loading);
    const utente =useSelector(authSelector.userLogged)
    const [audiobooksSelected, setAudiobooksSelected] = useState<ResponseAudiolibro | null>();
    const [showMenuModificaCondivisione, setMenuModificaCondivisione] = useState(false);

    // qui controllo se l'utente è loggato, se non lo è lo reindirizzo alla pagina di login
    useEffect(() => {
        if (!checkAuth || getToken() === null) {
            navigate('/login');
            return;
        }
    }, []);


    // questo useState si salva se l'utente seleziona un audiobook
    const onSelectAudiobook = (audiobook: ResponseAudiolibro) => {
        setAudiobooksSelected(audiobook);
    }

    // questa funzione restituisce un testo quando non ci sono audiolibri, diverso per ogni tipo di pagina
    function testoSeListaVuota () {
        if (audiobooks.length === 0) {
            if (pageType === PageType.HOMEPAGE) {
                return <Alert key="secondary" variant="secondary">
                    <Alert.Heading>Non hai ancora caricato nessun audiolibro</Alert.Heading>
                </Alert>;
            } else if (pageType === PageType.FAVOURITEPAGE) {
                return <Alert key="secondary" variant="secondary">
                    <Alert.Heading>Non hai ancora aggiunto nessun audiolibro ai preferiti</Alert.Heading>
                </Alert>;
            } else if (pageType === PageType.NETWORKPAGE) {
                return <Alert key="secondary" variant="secondary">
                    <Alert.Heading>Non hai ancora nessun audiolibro nella tua rete</Alert.Heading>
                </Alert>;
            } else if (pageType === PageType.SEARCHPAGE) {
                return <Alert key="secondary" variant="secondary">
                    <Alert.Heading>La ricerca non ha prodotto risultati</Alert.Heading>
                </Alert>;
            }
        }
    }

    //questa funzione restituisce un bottone per aggiungere o rimuovere un audiolibro ai preferiti
    function favouriteButton () {
        if (audiobooksSelected) {
            const dto: RequestAudiolibroModifica = {
                idAudiolibro: audiobooksSelected.idAudiolibro
            }
            //todo vedere i favoriti appena ggiounge il campo
            if (!audiobooksSelected.preferito) {
                return <Button variant="secondary" size="lg"
                               onClick={() => dispatch(audiolibroAction.aggiungiAudiolibroPreferito(dto))}> Aggiungi
                    ai preferiti </Button>
            } else {
                return <Button variant="secondary" size="lg"
                               onClick={() => dispatch(audiolibroAction.rimuoviAudiolibroPreferito(dto))}> Rimuovi
                    dai preferiti</Button>
            }
        }
    }

    //questa funzione restituisce un bottone per modificare la visibilità dell'audiolibro
    function buttonCondivisione () {
        if (audiobooksSelected) {
            const userSession = getUser();
            if (userSession.username === audiobooksSelected.creatore.username) {
                return <Button variant="secondary" size="lg" onClick={() => setMenuModificaCondivisione(true)}> Modifica
                    Condivisione </Button>
            }
        }
    }

    return (
        (!checkAuth) ? <div data-testid='paginaVuota'></div> :
            (loading) ? <div data-testid='spinnerLoading' ><Spinner/> </div> :
                (audiobooksSelected == null) ?
                    (
                        <div data-testid='audiobooksList'>
                            <Navbar/>
                            <h4 style={{ position:'relative', textAlign:'center', marginTop:'20%' }}> Benvenuto {utente?.username} </h4>

                            <div className='row d-flex justify-content-center'>
                                {
                                    audiobooks.map((audiobook, index) => <AudiobookItem  key={index}
                                                                                        audiobooks={audiobook}
                                                                                        onSelectAudiobook={onSelectAudiobook}
                                    />)
                                }
                            </div>
                            {testoSeListaVuota()}
                            {pageType===PageType.HOMEPAGE  && <Button data-testid='buttonAggiuntaAudiobook' variant="primary"
                                     onClick={() => navigate('/addAudiobook')}>Aggiungi un nuovo
                                audiobook</Button>}
                        </div>
                    ) :(!showMenuModificaCondivisione) ? (
                        <>
                            <div style={{marginLeft: 0}} className="d-flex justify-content-between">
                                <Back onClick={() => setAudiobooksSelected(null)}/>
                                {favouriteButton()}
                                {buttonCondivisione()}
                            </div>
                            <AudioBooksDetails audiobook={audiobooksSelected}/>

                            {utente?.username=== audiobooksSelected?.creatore?.username  &&
                                <Button variant="primary" onClick={() => {
                                    const id: RequestAudiolibroModifica = {
                                        idAudiolibro: audiobooksSelected?.idAudiolibro
                                    };
                                    dispatch(audiolibroAction.eliminazioneAudiolibro(id));
                                }}>Rimuovi audiobook
                                </Button>
                            }

                        </>
                    ) : (
                        <><Back onClick={() => setMenuModificaCondivisione(false)}/><MenuModificaCondivisione audioLibro={audiobooksSelected}/></>
                    )

    );
}

export default AudiobooksList;
