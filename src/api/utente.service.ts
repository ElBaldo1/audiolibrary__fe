import axios, {AxiosResponse} from 'axios';
import {
    RequestUtenteLogin,
    RequestUtenteLogout,
    RequestUtenteModifica,
    RequestUtenteRegistrazione
} from 'model/requestDTO';
import {ResponseUtente, ResponseUtenteLogin} from 'model/responseDTO';

// tutte le chiamate al backend per fare operazioni sugli utenti devono essere qui

// questa funzione è chiamata quando si vuole fare il login comunicando con il backend
export const utente_login = (credentials: RequestUtenteLogin) : Promise<AxiosResponse<ResponseUtenteLogin>> => {
    return axios.post<ResponseUtenteLogin>('http://localhost:8080/utente/login', credentials);
};


// questa funzione è chiamata quando si vuole registrarsi comunicando con il backend
export const utente_registrazione = (newUser:RequestUtenteRegistrazione):Promise<AxiosResponse<ResponseUtente>> => {
    return axios.post('http://localhost:8080/utente/registrazione',newUser ,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '
            }
        }
    );
}

// questa funzione è chiamata quando si vuole fare il logout comunicando con il backend
export const utente_logout = (requestUtenteLogout:RequestUtenteLogout) => {
    return axios.post('http://localhost:8080/utente/logout',requestUtenteLogout,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    );
}

// questa funzione è chiamata quando si vogliono modificare i dati dell'utente loggato comunicando con il backend
export const utente_modifica = (requestUtenteModifica:RequestUtenteModifica):Promise<AxiosResponse<ResponseUtente>> => {
    return axios.patch('http://localhost:8080/utente/modifica',requestUtenteModifica,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
}
