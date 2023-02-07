import {unwrapResult} from '@reduxjs/toolkit';
import {Spinner} from 'components/spinner/spinner';
import {RequestUtenteLogin} from 'model/requestDTO';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {authAction} from 'store/authentication/auth.action';
import {authSelector} from 'store/authentication/auth.selector';
import {useAppDispatch} from 'store/store.config';


// questo componente serve per effettuare il login

function Login () {

    // qui pulisco il local storage da vecchi token
    useEffect(()    => {
        window.localStorage.clear();
    }   , []);

    const dispatch = useAppDispatch();
    // questi sono gli stati che mi servono per gestire il login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();

    // qui prendo lo stato di loading dallo store di redux per gestire lo spinner
    const loading= useSelector(authSelector.loading);

    return (
        <> {loading ? <div data-testid="spinnerLogin"> <Spinner/> </div> : (
        <div className="Auth-form-container"  style={{ flexDirection: "column" }} >
            <Image src={'https://i.ibb.co/XbL3PNj/Audio-library.png'} className="Auth-image" style={{
                width: "15%",
                height: "25%",
                borderRadius: "50%",
                marginBottom: "20px"
            }} />

            <div className="Auth-form"  data-testid="authForm">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Login</h3>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Inserire Username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required={true}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Inserire password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required={true}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <Button type="submit" className="btn btn-primary" variant="warning"  onClick={async()=>{
                            const credentials: RequestUtenteLogin = {
                                username,
                                password
                            }
                            try {
                                const result=await dispatch(authAction.loginUser(credentials));
                                unwrapResult(result);
                                navigate('/home');

                            }catch (e){
                                console.log('error',e)
                            }

                        }}>
                            Login
                        </Button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Non hai account?<Link to="/signUp" >Registrati</Link>
                    </p>
                </div>
            </div>
        </div>
            )}
        </>
    );
}

export default Login;
