import Back from 'components/back/Back';
import {utenteModificaController} from 'components/modificaUtente/ModificaUtente.controller';
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
    const userActual=useSelector(authSelector.userLogged);
    const [modificaUser, setModificaUser] = useState<RequestUtenteModifica>({
        email: '',
        password: '',
        username: ''
    });
    const [confirmPassword, setConfirmPassword] = useState<string>('');
/*    useEffect(() => {

    }, [input]);*/


    const onClickModify = () => {
        if (modificaUser.password === confirmPassword) {
            if (regexEmail(modificaUser.email)) {
                // qui chiamata al controller FE
                if(utenteModificaController(modificaUser)) {
                    dispatch(authAction.modificaUser(modificaUser));
                }
            } else {
                dispatch(toastActions.showToast({message: 'Email non valida', type: ToastType.ERROR}));
            }
        } else {
            dispatch(toastActions.showToast({message: 'Password non corrispondono', type: ToastType.ERROR}));
        }
    };

    return (
        <>
            <div style={{marginLeft:'47%', position:'absolute',marginTop:'8%'}}><Back  onClick={()=>navigate('/home')} /> </div>
            <div data-testid='popupLogout' className="Auth-form-container">
                <div className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Modifica utente</h3>

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
