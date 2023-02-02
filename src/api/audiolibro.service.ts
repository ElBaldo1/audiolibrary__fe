import axios, {AxiosResponse} from 'axios';
import {
    RequestAudiolibroAscolta,
    RequestAudiolibroCondivisione,
    RequestAudiolibroInserisci,
    RequestAudiolibroModifica, RequestAudiolibroModificaCampi,
    RequestAudiolibroRicerca
} from 'model/requestDTO';
import {ResponseAudiolibro} from 'model/responseDTO';

// tutte le chiamate al backend per fare operazioni sugli audiolibri devono essere qui

// questa funzione è chiamata quando si vuole inserire un nuovo audiolibro comunicando con il backend
export const aggiungiAudiolibro = (requestAudiolibroInserisci: RequestAudiolibroInserisci): Promise<AxiosResponse<ResponseAudiolibro>> => {
    return axios.post<ResponseAudiolibro>('http://localhost:8080/audiolibro/inserisci', requestAudiolibroInserisci,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
}

// questa funzione ritorna una lista di audiolibri in base alla pagina in cui ci si trova comunicando con il backend
export const listaAudiolibri = (tipo: number): Promise<AxiosResponse<ResponseAudiolibro[]>> => {
    return axios.post<ResponseAudiolibro[]>('http://localhost:8080/audiolibro/lista', {tipo},
        // negli header della richiesta http viene aggiunto il token
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
};

// questa funzione ritorna una lista di audiolibri in base alla ricerca comunicando con il backend
export const ricercaAudiolibri = (requestAudiolibroRicerca:RequestAudiolibroRicerca | undefined): Promise<AxiosResponse<ResponseAudiolibro[]>> => {
    return axios.post<ResponseAudiolibro[]>('http://localhost:8080/audiolibro/ricerca', requestAudiolibroRicerca,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
}

// questa funzione aggiunge un audiobook alla lista dei preferiti comunicando con il backend
export const aggiungiAudiolibroPreferiti = (idAudiolibro: RequestAudiolibroModifica): Promise<AxiosResponse<ResponseAudiolibro>> => {
    return axios.patch<ResponseAudiolibro>('http://localhost:8080/audiolibro/aggiungiAiPreferiti', idAudiolibro,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
}

// questa funzione rimuove un audiobook dalla lista dei preferiti comunicando con il backend
export const rimuoviAudiolibroPreferiti = (idAudiolibro: RequestAudiolibroModifica): Promise<AxiosResponse<ResponseAudiolibro>> => {
return axios.patch<ResponseAudiolibro>('http://localhost:8080/audiolibro/rimuoviDaiPreferiti', idAudiolibro,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
}

// questa funzione elimina un audiobook comunicando con il backend
export const eliminaAudiolibro = (idAudiolibro: RequestAudiolibroModifica): Promise<AxiosResponse<ResponseAudiolibro>> => {
    return axios.post<ResponseAudiolibro>('http://localhost:8080/audiolibro/rimuovi', idAudiolibro,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
}

// questa funzione modifica i dati di un audiobook comunicando con il backend
export const modificaAudiolibro = (requestAudiolibroModifica: RequestAudiolibroModificaCampi): Promise<AxiosResponse<ResponseAudiolibro>> => {
    return axios.patch<ResponseAudiolibro>('http://localhost:8080/audiolibro/modifica', requestAudiolibroModifica,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
}


// questa funzione modifica la visibilità di un audiobook e lo rende pubblico comunicando con il backend
export const rendiAudiolibroPubblico = (idAudiolibro: RequestAudiolibroModifica): Promise<AxiosResponse<ResponseAudiolibro>> => {
    return axios.patch<ResponseAudiolibro>('http://localhost:8080/audiolibro/rendiPubblico', idAudiolibro,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
}

// questa funzione modifica la visibilità di un audiobook e lo rende non pubblico comunicando con il backend
export const rendiAudioLibroNonPubblico = (idAudiolibro: RequestAudiolibroModifica): Promise<AxiosResponse<ResponseAudiolibro>> => {
    return axios.patch<ResponseAudiolibro>('http://localhost:8080/audiolibro/rendiNonPubblico', idAudiolibro,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
}

// questa funzione modifica la visibilità di un audiobook e lo rende condiviso con una cerchia di utenti comunicando con il backend
export const aggiungiCondivisioniAudiolibro = (requestAudiolibroCondivisione: RequestAudiolibroCondivisione): Promise<AxiosResponse<ResponseAudiolibro>> => {
    return axios.post<ResponseAudiolibro>('http://localhost:8080/audiolibro/condividi', requestAudiolibroCondivisione,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
}

export const rimuoviCondivisioniAudiolibro= (requestAudiolibroCondivisione: RequestAudiolibroCondivisione): Promise<AxiosResponse<ResponseAudiolibro>> => {
    return axios.post<ResponseAudiolibro>('http://localhost:8080/audiolibro/rimuoviCondivisioni', requestAudiolibroCondivisione,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
}


// questa funzione salva i secondi ascoltati di un audiobook comunicando con il backend
export const audiolibroFineAscolto=(requestAudiolibroAscolta:RequestAudiolibroAscolta):Promise<AxiosResponse<ResponseAudiolibro>> =>{
    return axios.post<ResponseAudiolibro>('http://localhost:8080/audiolibro/ascolta',requestAudiolibroAscolta,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
}
