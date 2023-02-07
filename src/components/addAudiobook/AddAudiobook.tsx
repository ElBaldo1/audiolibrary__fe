import {getToken} from 'api/utils';
import {RequestAudiolibroInserisci} from 'model/requestDTO';
import React, {useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {authSelector} from 'store/authentication/auth.selector';
import {audiolibroAction} from 'store/audiolibro/audiolibro.action';
import {audiolibroSelector} from 'store/audiolibro/audiolibro.selector';
import {useAppDispatch} from 'store/store.config';
import {toastActions} from 'store/toastr/toast.action';
import {ToastType} from 'store/toastr/types';


// questo componente è stato creato per la gestione dell'aggiunta di un nuovo audiobook

function AddAudiobook () {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const checkAuth=useSelector(authSelector.userLogged);
    const loading = useSelector(audiolibroSelector.loading);

// controllo se l'utente è loggato, se non lo è viene reindirizzato alla pagina di login
    useEffect(() => {
        if( !checkAuth || getToken()===null){
            navigate('/login');
        }
    }, []);

    // variabili per la gestione del form
    const [newAudiobook, setNewAudiobook] = useState<RequestAudiolibroInserisci>({
        titolo: '',
        descrizione: '',
        copertina: '',
        audio: '',
    });

    // funzione per il caricamento dell'immagine di copertina
    const onChangeImg = (e: { target: { files: any; }; }) => {
        const files = e.target.files;
        const file = files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const str=reader.result as string;
            const res = str.split("base64,");
            setNewAudiobook({...newAudiobook, copertina: res[1]});
        };
    };


    // funzione per il caricamento del file audio
    const onChangeAudio = (e: { target: { files: any }; }) => {
        const files = e.target.files;
        const file = files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const str=reader.result as string;
            const res = str.split("base64,");
            setNewAudiobook({...newAudiobook, audio: res[1]});
        };
    }

    const addAudiolibroControllerDispatch=(requestAudiolibro:RequestAudiolibroInserisci)=>{
        let correct=true;
        if(requestAudiolibro.titolo==='' || requestAudiolibro.copertina==='' || requestAudiolibro.audio===''  || requestAudiolibro.descrizione==='' || requestAudiolibro.copertina===''){
            correct=false;
            dispatch(toastActions.showToast({message: 'Compila tutti i campi', type: ToastType.ERROR}));
        }
        if(requestAudiolibro.titolo==null || requestAudiolibro.audio==null || requestAudiolibro.descrizione==null || requestAudiolibro.copertina==null){
            correct=false;
            dispatch(toastActions.showToast({message: 'Compila tutti i campi', type: ToastType.ERROR}));
        }
        return correct;

    }

    return (
        (!checkAuth) ? <></> :
        <div data-testid='formAggiuntaAudiolibro' className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Aggiungi nuovo audiolibro</h3>
                    <div className="form-group mt-3">
                        <label>Titolo</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Titolo"
                            required={true}
                            value={newAudiobook.titolo}
                            onChange={(e) => setNewAudiobook({
                                ...newAudiobook,
                                titolo: e.target.value
                            })}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Descrizione</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Descrizione"
                            required={true}
                            value={newAudiobook.descrizione}
                            onChange={(e) => setNewAudiobook({
                                ...newAudiobook,
                                descrizione: e.target.value
                            })}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Copertina</label>
                        <input
                            type="file"
                            className="form-control"
                            placeholder="Copertina"
                            required={true}
                            onChange={onChangeImg}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Audio</label>
                        <input
                            type="file"
                            className="form-control"
                            placeholder="Audio"
                            required={true}
                            onChange={onChangeAudio}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <Button  type="submit" className="btn btn-primary" variant="warning" onClick={() => {
                            if(addAudiolibroControllerDispatch(newAudiobook)) {
                                dispatch(audiolibroAction.addNewAudiobook(newAudiobook))
                            }
                            navigate('/home');
                        }}>Aggiungi</Button>
                    </div>
                    {loading && <Spinner animation="border" variant="warning"/>}
                    <div className="mt-3">
                        <Link to="/home">Torna alla home</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddAudiobook;
