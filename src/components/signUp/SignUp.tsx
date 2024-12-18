import {useSignup} from 'components/signUp/SignUp.hook';
import {RequestUtenteRegistrazione} from 'model/requestDTO';
import React, {useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Link, useNavigate} from 'react-router-dom';
import {authAction} from 'store/authentication/auth.action';
import {regexEmail} from 'store/authentication/auth.controller';
import {useAppDispatch} from 'store/store.config';
import {toastActions} from 'store/toastr/toast.action';
import {ToastType} from 'store/toastr/types';

function SignUp () {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [requestUtenteRegistrazione, setRequestUtenteRegistrazione] = useState<RequestUtenteRegistrazione>();
    const [newUser, setNewUser] = useState<RequestUtenteRegistrazione>({
        nome: '',
        cognome: '',
        email: '',
        password: '',
        username: ''
    });
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, data] = useSignup(requestUtenteRegistrazione);

    // qui pulisco il local storage da vecchi token
    useEffect(()    => {
        window.localStorage.clear();
        //elimina utente in store
        dispatch(authAction.clearUserLogged());
    }   , []);


    useEffect(() => {
        if (data) {
            navigate('/login');
        }
    }, [data]);

    const onClickRegister = () => {
        if (newUser.password === confirmPassword) {
            if (regexEmail(newUser.email)) {
                // qui chiamata al controller FE
                if(utenteRegistrazioneControllerDispatch(newUser)) {
                    setRequestUtenteRegistrazione(newUser)
                }
            } else {
                dispatch(toastActions.showToast({message: 'Email non valida', type: ToastType.ERROR}));
            }
        } else {
            dispatch(toastActions.showToast({message: 'Password non corrispondono', type: ToastType.ERROR}));
        }
    };


    const utenteRegistrazioneControllerDispatch=(requestUtenteRegistrazione:RequestUtenteRegistrazione)=>{
        let correct=true;
        if(requestUtenteRegistrazione.email==='' || requestUtenteRegistrazione.nome==='' || requestUtenteRegistrazione.cognome==='' || requestUtenteRegistrazione.username==='' || requestUtenteRegistrazione.password===''){
            correct=false;
            dispatch(toastActions.showToast({message: 'Compila tutti i campi', type: ToastType.ERROR}));
        }
        if(requestUtenteRegistrazione.email==null || requestUtenteRegistrazione.nome==null || requestUtenteRegistrazione.cognome==null || requestUtenteRegistrazione.username==null || requestUtenteRegistrazione.password==null){
            correct=false;
            dispatch(toastActions.showToast({message: 'Compila tutti i campi', type: ToastType.ERROR}));
        }
        if (!regexEmail(requestUtenteRegistrazione.email)){
            correct=false;
            dispatch(toastActions.showToast({message: 'Email non valida', type: ToastType.ERROR}));
        }

        return correct;
    }

    return (
        <div data-testid='popupLogout' className="Auth-form-container">
            <div className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Registrazione</h3>

                    <div className="form-group mt-3">
                        <label>Username</label>
                        <p style={{color:'blue'}}>Il seguente campo sarà immutabile</p>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            required={true}
                            value={newUser.username}
                            onChange={(e) => setNewUser({
                                ...newUser,
                                username: e.target.value
                            })}
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label>Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome"
                            required={true}
                            value={newUser.nome}
                            onChange={(e) => setNewUser({
                                ...newUser,
                                nome: e.target.value
                            })}

                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Cognome</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cognome"
                            required={true}
                            value={newUser.cognome}
                            onChange={(e) => setNewUser({
                                ...newUser,
                                cognome: e.target.value
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
                            value={newUser.email}
                            onChange={(e) => setNewUser({
                                ...newUser,
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
                            value={newUser.password}
                            onChange={(e) => setNewUser({
                                ...newUser,
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
                                onClick={onClickRegister}>Registrati</Button>
                    </div>
                    {isLoading && <Spinner animation={'border'}/>}
                    <p className="forgot-password text-right mt-3">
                        Già registrato?
                        <Link to="/login">Accedi</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
