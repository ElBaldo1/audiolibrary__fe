import Back from 'components/back/Back';
import {RequestUtenteModifica} from 'model/requestDTO';
import React, {useState} from 'react';
import {Spinner} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {authAction} from 'store/authentication/auth.action';
import {regexEmail} from 'store/authentication/auth.controller';
import {authSelector} from 'store/authentication/auth.selector';
import {useAppDispatch} from 'store/store.config';
import {toastActions} from 'store/toastr/toast.action';
import {ToastType} from 'store/toastr/types';

function ModificaUtente () {
    const dispatch = useAppDispatch();
    const isLoading=useSelector(authSelector.loading);
    const navigate=useNavigate();
    const [modificaUser, setModificaUser] = useState<RequestUtenteModifica>({
        email: '',
        password: '',
        username: ''
    });
    const [confirmPassword, setConfirmPassword] = useState<string>('');


    const onClickModify = () => {
        if (modificaUser.password!=="" && modificaUser.password !== confirmPassword) {
            dispatch(toastActions.showToast({message: 'Password non corrispondono', type: ToastType.ERROR}));
            return;
        }
        if(modificaUser.email!=="" && !regexEmail(modificaUser.email)){
            dispatch(toastActions.showToast({message: 'Email non valida', type: ToastType.ERROR}));
            return;
        }
        if (modificaUser.password === confirmPassword && regexEmail(modificaUser.email)) {
            dispatch(authAction.modificaUser(modificaUser));
            return;
        }

        if (modificaUser.password==="" && modificaUser.email==="" && modificaUser.username!==""){
            dispatch(authAction.modificaUser(modificaUser));
            return;
        }
        if (modificaUser.password==="" && modificaUser.email==="" && modificaUser.username===""){
            dispatch(toastActions.showToast({message: 'Inserire almeno un campo', type: ToastType.ERROR}));
            return;
        }
    };

    return (
        <>
            <div style={{marginLeft:'47%', position:'absolute',marginTop:'7%'}}><Back  onClick={()=>navigate('/home')} /> </div>
            <div data-testid='popupLogout' className="Auth-form-container">
                <div className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Modifica utente</h3>
                        <h5>Inserire solo i dati da modificare</h5>
                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                required={true}
                                value={modificaUser.username}
                                onChange={(e) => setModificaUser({
                                    ...modificaUser,
                                    username: e.target.value
                                })}
                            />
                        </div>

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