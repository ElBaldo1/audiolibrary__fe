import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    aggiungiAudiolibro,
    aggiungiAudiolibroPreferiti,
    audiolibroFineAscolto,
    eliminaAudiolibro,
    listaAudiolibri,
    modificaAudiolibro,
    ricercaAudiolibri,
    rimuoviAudiolibroPreferiti
} from 'api/audiolibro.service';
import {AxiosError} from 'axios';
import {
    RequestAudiolibroAscolta,
    RequestAudiolibroInserisci,
    RequestAudiolibroModifica,
    RequestAudiolibroModificaCampi,
    RequestAudiolibroRicerca
} from 'model/requestDTO';
import {ResponseAudiolibro} from 'model/responseDTO';
import {toastActions} from 'store/toastr/toast.action';
import {ToastType} from 'store/toastr/types';
// a ogni chiamata è specificato il tipo di oggetto che deve ritornare

// qui ci sono le tre azioni con i tre numeri diversi in base ai quali viene gestito il caricamento delle liste di pagine


// queste sono le action dello store utilizzato per tutte le chiamate al back-end riguardanti gli audiolibri

// questa action è chiamata quando l'utente vuole visualizzare la sua home page
const getAudiobooksbyUserList=createAsyncThunk(
    '/getAudiobooksbyUserList',
    async (_,thunkAPI):Promise<ResponseAudiolibro[]>=>{
        try {
            const response = await listaAudiolibri(1);
            return response.data;
        }   catch (e) {
            const error = e as AxiosError;
            thunkAPI.dispatch(toastActions.showToast({message: error.response?.data, type: ToastType.ERROR}));
            throw e;
        }
    }
);

// questa action è chiamata quando l'utente vuole visualizzare la sua network page
const getPublicAudiobookList=createAsyncThunk(
    '/getPublicAudiobookList',
    async (_,thunkAPI):Promise<ResponseAudiolibro[]>=>{
        try {
            const response = await listaAudiolibri(2);
            return response.data;
        }   catch (e) {
            const error = e as AxiosError;
            thunkAPI.dispatch(toastActions.showToast({message: error.response?.data, type: ToastType.ERROR}));
            throw e;
        }
    }

);

// questa action è chiamata quando l'utente vuole visualizzare la sua favourite page
const getFavuoritesAudiobookByUserList=createAsyncThunk(
    '/getFavuoritesAudiobookByUserList',
    async (_,thunkAPI):Promise<ResponseAudiolibro[]>=>{
        try {
            const response = await listaAudiolibri(3);
            return response.data;
        }   catch (e) {
            const error = e as AxiosError;
            thunkAPI.dispatch(toastActions.showToast({message: error.response?.data, type: ToastType.ERROR}));
            throw e;
        }
    }
);

// questa action è chiamata quando l'utente vuole aggiungere un audiolibro
const addNewAudiobook=createAsyncThunk(
    '/addNewAudiobook',
    async (audiobook:RequestAudiolibroInserisci ,thunkAPI):Promise<ResponseAudiolibro>=>{
        try {
            const response = await aggiungiAudiolibro(audiobook);
            thunkAPI.dispatch(toastActions.showToast({message: 'Audiolibro aggiunto con successo', type: ToastType.SUCCESS}));
            return response.data;
        }   catch (e) {
            const error = e as AxiosError;
            thunkAPI.dispatch(toastActions.showToast({message: error.response?.data, type: ToastType.ERROR}));
            throw e;
        }
    }
);

//  questa action è chiamata quando l'utente vuole cercare un audiolibro
const ricercaAudiolibro=createAsyncThunk(
    '/ricercaAudiolibro',
    async (requestAudiolibroRicerca:RequestAudiolibroRicerca | undefined,thunkAPI):Promise<ResponseAudiolibro[]>=>{
        try {
            const response = await ricercaAudiolibri(requestAudiolibroRicerca);
            return response.data;
        }   catch (e) {
            const error = e as AxiosError;
            thunkAPI.dispatch(toastActions.showToast({message: error.response?.data, type: ToastType.ERROR}));
            throw e;
        }
    }
);

// questa action è chiamata quando l'utente vuole eliminare un audiolibro
const eliminazioneAudiolibro=createAsyncThunk(
    '/eliminazioneAudiolibro',
    async (idAudiolibro:RequestAudiolibroModifica,thunkAPI):Promise<ResponseAudiolibro>=>{
        try {
            const response = await eliminaAudiolibro(idAudiolibro);
            thunkAPI.dispatch(toastActions.showToast({message: 'Audiolibro eliminato con successo', type: ToastType.SUCCESS}));
            return response.data;
        }   catch (e) {
            const error = e as AxiosError;
            thunkAPI.dispatch(toastActions.showToast({message: error.response?.data, type: ToastType.ERROR}));
            throw e;
        }
    }
);

const modificaAudiolibroAction=createAsyncThunk(
    '/modificaAudiolibro',
    async (requestAudiolibroModifica:RequestAudiolibroModificaCampi,thunkAPI):Promise<ResponseAudiolibro>=>{
        try {
            const response = await modificaAudiolibro(requestAudiolibroModifica);
            thunkAPI.dispatch(toastActions.showToast({message: 'Audiolibro modificato con successo', type: ToastType.SUCCESS}));
            thunkAPI.dispatch(getAudiobooksbyUserList());
            return response.data;
        }   catch (e) {
            const error = e as AxiosError;
            thunkAPI.dispatch(toastActions.showToast({message: error.response?.data , type: ToastType.ERROR}));
            throw e;
        }
    }
);

// questa action è chiamata quando l'utente vuole aggiungere un audiolibro ai preferiti
const aggiungiAudiolibroPreferito=createAsyncThunk(
    '/aggiungiAudiolibroPreferito',
    async (idAudiolibro:RequestAudiolibroModifica,thunkAPI):Promise<ResponseAudiolibro>=>{
        try {
            const response = await aggiungiAudiolibroPreferiti(idAudiolibro);
            thunkAPI.dispatch(toastActions.showToast({message: 'Audiolibro aggiunto ai preferiti', type: ToastType.SUCCESS}));
            return response.data;
        }   catch (e) {
            const error = e as AxiosError;
            thunkAPI.dispatch(toastActions.showToast({message: error.response?.data, type: ToastType.ERROR}));
            throw e;
        }
    }
);

// questa action è chiamata quando l'utente vuole rimuovere un audiolibro dai preferiti
const rimuoviAudiolibroPreferito=createAsyncThunk(
    '/rimuoviAudiolibroPreferito',
    async (idAudiolibro:RequestAudiolibroModifica,thunkAPI):Promise<ResponseAudiolibro>=>{
        try {
            const response = await rimuoviAudiolibroPreferiti(idAudiolibro);
            thunkAPI.dispatch(toastActions.showToast({message: 'Audiolibro rimosso dai preferiti', type: ToastType.SUCCESS}));
            return response.data;
        }   catch (e) {
            const error = e as AxiosError;
            thunkAPI.dispatch(toastActions.showToast({message: error.response?.data, type: ToastType.ERROR}));
            throw e;
        }
    }
);

// questa action è chiamata quando l'utente vuole salvare i secondi di ascolto di un audiolibro
const fineAscolto = createAsyncThunk(
    '/fineAscolto',
    async (requestAudiolibroAscolta: RequestAudiolibroAscolta, thunkAPI): Promise<ResponseAudiolibro> => {
        try {
            const response =await audiolibroFineAscolto(requestAudiolibroAscolta);
            thunkAPI.dispatch(toastActions.showToast({message: 'Audiolibro salvato con successo', type: ToastType.SUCCESS}));
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            thunkAPI.dispatch(toastActions.showToast({message: error.response?.data, type: ToastType.ERROR}));
            throw e;
        }
    }
)

const changeVisibility=createAsyncThunk(
    '/changeVisibility',
    ({id, visible}: {id: number, visible: boolean}) => {
        return {id, visible};
    }
)

// questo raggruppamento di actions è una scelta personale per organizzare meglio il codice, non è obbligatorio
export const audiolibroAction={
    getAudiobooksbyUserList,
    getPublicAudiobookList,
    getFavuoritesAudiobookByUserList,
    addNewAudiobook,
    eliminazioneAudiolibro,
    ricercaAudiolibro,
    aggiungiAudiolibroPreferito,
    rimuoviAudiolibroPreferito,
    fineAscolto,
    changeVisibility,
    modificaAudiolibroAction
}
