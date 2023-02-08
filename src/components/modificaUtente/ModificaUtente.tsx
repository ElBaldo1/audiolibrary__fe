import Back from 'components/back/Back';
import {RequestUtenteModifica} from 'model/requestDTO';
import React, {useState} from 'react';
import {Spinner} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {audiolibroAction} from 'store/audiolibro/audiolibro.action';
import {audiolibroSelector} from 'store/audiolibro/audiolibro.selector';
import {PageType} from 'store/audiolibro/types';
import {authAction} from 'store/authentication/auth.action';
import {regexEmail} from 'store/authentication/auth.controller';
import {authSelector} from 'store/authentication/auth.selector';
import {useAppDispatch} from 'store/store.config';
import {toastActions} from 'store/toastr/toast.action';
import {ToastType} from 'store/toastr/types';

function ModificaUtente() {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(authSelector.loading);
    const pageType = useSelector(audiolibroSelector.page);
    const navigate = useNavigate();
    const [modificaUser, setModificaUser] = useState<RequestUtenteModifica>({
        email: '',
        password: ''
    });
    const [confirmPassword, setConfirmPassword] = useState<string>('');


    const onClickModify = async () => {
        if (modificaUser.email !== "" && (!regexEmail(modificaUser.email) || modificaUser.email === "")) {
            dispatch(toastActions.showToast({message: 'Email non valida', type: ToastType.ERROR}));
            return;
        }
        if (modificaUser.password !== "" && modificaUser.password !== confirmPassword) {
            dispatch(toastActions.showToast({message: 'Password non corrispondono', type: ToastType.ERROR}));
            return;
        }
        if (modificaUser.email === "" && modificaUser.password === confirmPassword && confirmPassword !== "") {
            dispatch(authAction.modificaUser(modificaUser));
            await dispatchModificaUtente();
            return;
        }

        if (modificaUser.password === confirmPassword && regexEmail(modificaUser.email)) {
            dispatch(authAction.modificaUser(modificaUser));
            await dispatchModificaUtente();
            return;
        }

        if (modificaUser.password === "" && modificaUser.email === "" && confirmPassword === "") {
            dispatch(toastActions.showToast({message: 'Inserire almeno un campo', type: ToastType.ERROR}));
            return;
        }
        if (modificaUser.password === "" && modificaUser.email === "" && confirmPassword !== "") {
            dispatch(toastActions.showToast({
                message: 'La mail non è valida e le password non corrispondono',
                type: ToastType.ERROR
            }));
            return;
        }
        if (modificaUser.password !== "" || modificaUser.email !== "") {
            await dispatch(audiolibroAction.getAudiobooksbyUserList());
            await dispatchModificaUtente();
        }
    };

    const dispatchModificaUtente = async () => {
        if (pageType === PageType.FAVOURITEPAGE) {
            await dispatch(audiolibroAction.getFavuoritesAudiobookByUserList);
        } else if (pageType === PageType.NETWORKPAGE) {
            await dispatch(audiolibroAction.getPublicAudiobookList);
        } else {
            await dispatch(audiolibroAction.getAudiobooksbyUserList);
        }
    }

    return (
        <>
            <div style={{marginLeft: '47%', position: 'absolute', marginTop: '2%'}}><Back
                onClick={() => navigate('/home')}/></div>
            <div data-testid='popupLogout' className="Auth-form-container">
                <div className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Modifica utente</h3>
                        <h5>Inserire solo i dati da modificare</h5>
                        <div className="form-group mt-3">
                            <label>Indirizzo e-mail</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                required={true}
                                value={modificaUser.email}
                                onChange={(e) => setModificaUser({
                                    ...modificaUser,
                                    email: e.target.value
                                })}
                            />
                        </div>


                        <div className="form-group mt-3">
                            <label>Password</label>
                            <p>Rispettare i seguenti criteri:</p>
                            <ul>
                                <li>Almeno 8 caratteri</li>
                                <li>Almeno una lettera</li>
                                <li>Almeno un numero</li>
                                <li>Almeno un carattere speciale</li>
                            </ul>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                required={true}
                                value={modificaUser.password}
                                onChange={(e) => setModificaUser({
                                    ...modificaUser,
                                    password: e.target.value
                                })}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label>Conferma Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Conferma password"
                                required={true}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div className="d-grid gap-2 mt-3">
                            <Button type="submit" className="btn btn-primary" variant="warning"
                                    onClick={onClickModify}>Modifica</Button>
                        </div>
                        {isLoading && <Spinner animation={'border'}/>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModificaUtente;
