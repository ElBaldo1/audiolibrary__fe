import {getToken} from 'api/utils';
import Back from 'components/back/Back';
import {RequestAudiolibroModificaCampi} from 'model/requestDTO';
import {ResponseAudiolibro} from 'model/responseDTO';
import React, {useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {audiolibroAction} from 'store/audiolibro/audiolibro.action';
import {audiolibroSelector} from 'store/audiolibro/audiolibro.selector';
import {authSelector} from 'store/authentication/auth.selector';
import {useAppDispatch} from 'store/store.config';
import {toastActions} from 'store/toastr/toast.action';
import {ToastType} from 'store/toastr/types';

export interface ModificaAudiolibroProps {
    audiobook: ResponseAudiolibro;
    back: (arg: boolean) => void;
}
//questo componente permette di modificare l'audiolibro
function ModificaAudiolibro (props:ModificaAudiolibroProps) {
    const {audiobook, back} = props;
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
    const [audiobookModifica, setAudiobookModifica] = useState<RequestAudiolibroModificaCampi>({
        idAudiolibro:audiobook.idAudiolibro,
        titolo: '',
        descrizione: '',
        copertina: ''
    });

    const onChangeImg = (e: { target: { files: any; }; }) => {
        const files = e.target.files;
        const file = files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const str=reader.result as string;
            const res = str.split("base64,");
            setAudiobookModifica({...audiobookModifica, copertina: res[1]});
        };
    };



    return (
        (!checkAuth) ? <></> :
            <>
                <div style={{marginLeft:'47%', position:'absolute',marginTop:'8%'}}><Back  onClick={() => back(false)} /> </div>
                <div data-testid='formModificaAudiolibro' className="Auth-form-container ">
                    <form className="Auth-form">
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Modifica audiolibro</h3>
                            <h5>Inserire solo i dati da modificare</h5>
                            <div className="form-group mt-3">
                                <label>Titolo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Titolo"
                                    onChange={(e) => setAudiobookModifica({
                                        ...audiobookModifica,
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
                                    onChange={(e) => setAudiobookModifica({
                                        ...audiobookModifica,
                                        descrizione: e.target.value
                                    })}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Copertina</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={onChangeImg}
                                />
                            </div>

                            <div className="d-grid gap-2 mt-3">
                                <Button  type="submit" className="btn btn-primary" variant="warning" onClick={async() => {
                                    debugger;
                                    if(audiobookModifica.titolo==='' && audiobookModifica.descrizione==='' && audiobookModifica.copertina===''){
                                        dispatch(toastActions.showToast({message: 'Inserire almeno un campo', type: ToastType.ERROR}));
                                    }else{
                                        await dispatch(audiolibroAction.modificaAudiolibroAction(audiobookModifica))
                                    }
                                    navigate('/home');
                                }}>Modifica</Button>
                            </div>
                            {loading && <Spinner animation="border" variant="warning"/>}
                        </div>
                    </form>
                </div>
            </>
    );
}

export default ModificaAudiolibro;
