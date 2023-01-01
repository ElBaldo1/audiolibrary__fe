import {
    aggiungiCondivisioniAudiolibro,
    rendiAudioLibroNonPubblico,
    rendiAudiolibroPubblico, rimuoviCondivisioniAudiolibro
} from 'api/audiolibro.service';
import {
    RequestAudiolibroCondivisione,
    RequestAudiolibroModifica,
    RequestUtenteIdentificativo
} from 'model/requestDTO';
import {ResponseAudiolibro} from 'model/responseDTO';
import React, {useState} from 'react';
import {Form, InputGroup} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {audiolibroAction} from 'store/audiolibro/audiolibro.action';
import {useAppDispatch} from 'store/store.config';
import {toastActions} from 'store/toastr/toast.action';
import {ToastType} from 'store/toastr/types';


export interface MenuModificaCondivisioneProps {
    audioLibro: ResponseAudiolibro;
}

function MenuModificaCondivisione (props: MenuModificaCondivisioneProps) {
    const dispatch = useAppDispatch();
    const {audioLibro} = props;
    const [textInputAggiunta, setTextInputAggiunta] = useState<string>('');
    const [textInputRimozione, setTextInputRimozione] = useState<string>('');
    const [isPublic, setIsPublic] = useState(audioLibro.pubblico);

    // questa funzione rende l'audiolibro non pubblico e richiama l'api
    const makeNonPubblico = () => {
        const dto: RequestAudiolibroModifica = {
            idAudiolibro: audioLibro.idAudiolibro,
        }
        rendiAudioLibroNonPubblico(dto).then((response) => {
            if (response.status === 200) {
                setIsPublic(false);
                dispatch(audiolibroAction.changeVisibility({id: audioLibro.idAudiolibro, visible: false}));
                dispatch(toastActions.showToast({
                    message: 'Audiolibro reso privato',
                    type: ToastType.SUCCESS
                }));
            }
        }).catch((error) => {
            // Quando va in errore
            //stampo il toast
            dispatch(toastActions.showToast({message: error.response?.data, type: ToastType.ERROR}));
        })
    }

    // questa funzione rende l'audiolibro pubblico e richiama l'api

    const makePubblico = () => {
        const dto: RequestAudiolibroModifica = {
            idAudiolibro: audioLibro.idAudiolibro,
        }
        rendiAudiolibroPubblico(dto).then((response) => {
            if (response.status === 200) {
                setIsPublic(true);
                dispatch(audiolibroAction.changeVisibility({id: audioLibro.idAudiolibro, visible: true}));
                dispatch(toastActions.showToast({
                    message: 'Audiolibro reso pubblico',
                    type: ToastType.SUCCESS
                }));
            }
        }).catch((error) => {
            // Quando va in errore
            //stampo il toast
            dispatch(toastActions.showToast({message: error.response?.data, type: ToastType.ERROR}));
        })
    }

     // questa funzione condivide l'audiolibro con determinati utenti e richiama l'api
    const aggiungiCondividisioneAudiolibroConUtenti = () => {
        if(textInputAggiunta.length>0) {
            const listaUtentiAggiunti: RequestUtenteIdentificativo[] = textInputAggiunta.split(',').map((item) => {
                return {username: item}
            });
            if (listaUtentiAggiunti.length > 0) {
                const dto: RequestAudiolibroCondivisione = {
                    idAudiolibro: audioLibro.idAudiolibro,
                    utenti: listaUtentiAggiunti
                }
                aggiungiCondivisioniAudiolibro(dto).then(() => {
                    dispatch(toastActions.showToast({message: 'Condivisione aggiunta', type: ToastType.SUCCESS}));
                }).catch((error) => {
                    // Quando va in errore
                    //stampo il toast
                    dispatch(toastActions.showToast({message: error.response?.data, type: ToastType.ERROR}));
                })
            }
        }
    }

    // questa funzione rimuove la condivisione con l'audiolibro con determinati utenti e richiama l'api
    const rimuoviCondividisioneAudiolibroConUtenti = () => {
        if(textInputRimozione.length>0) {
            const listaUtentiRimossi: RequestUtenteIdentificativo[] = textInputRimozione.split(',').map((item) => {
                return {username: item}
            });
            if (listaUtentiRimossi.length > 0) {
                const dto: RequestAudiolibroCondivisione = {
                    idAudiolibro: audioLibro.idAudiolibro,
                    utenti: listaUtentiRimossi
                }
                rimuoviCondivisioniAudiolibro(dto).then(() => {
                    dispatch(toastActions.showToast({message: 'Condivisione rimossa', type: ToastType.SUCCESS}));
                }).catch((error) => {
                    // Quando va in errore
                    //stampo il toast
                    dispatch(toastActions.showToast({message: error.response?.data, type: ToastType.ERROR}));
                })
            }
        }
    }

    return (
        <div style={{backgroundColor: "#F5F5F5"}}>
            <h1>Modifica condivisione audiolibro {audioLibro.titolo}</h1>
            <h5>Inserire lista username utenti a cui dare accesso all'audiolibro separati con una virgola</h5>

            <InputGroup size="lg">
                <InputGroup.Text id="inputGroup-sizing-lg">Inserire lista username</InputGroup.Text>

                <Form.Control
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={(e) => setTextInputAggiunta(e.target.value)}
                />
                <Button style={{margin: "5px"}} className="d-flex justify-content-end" variant="primary" size="lg"
                        onClick={aggiungiCondividisioneAudiolibroConUtenti}>  Aggiungi condivisione utenti  </Button>
            </InputGroup>
            <div className="d-flex justify-content" style={{margin: "10px"}}>
                {
                    isPublic ?
                        (
                            <Button style={{margin: "5px"}} variant="primary" size="lg" onClick={makeNonPubblico}> Rendi
                                privato </Button>
                        ) : (
                            <Button style={{margin: "5px"}} variant="primary" size="lg" onClick={makePubblico}>Rendi
                                pubblico</Button>
                        )
                }
            </div>
            <hr/>
            <h5>Inserire lista username utenti a cui rimuovere accesso all'audiolibro separati con una virgola</h5>
            <InputGroup size="lg">
                <InputGroup.Text id="inputGroup-sizing-lg">Inserire lista username</InputGroup.Text>
                <Form.Control
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={(e) => setTextInputRimozione(e.target.value)}
                    value={textInputRimozione}
                />
                <Button style={{margin: "5px"}} className="d-flex justify-content-end" variant="primary" size="lg"
                        onClick={rimuoviCondividisioneAudiolibroConUtenti}> Rimuovi condivisione utenti </Button>
            </InputGroup>
            <hr/>
        </div>
    );
}

export default MenuModificaCondivisione;
