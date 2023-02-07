import {createAsyncThunk} from '@reduxjs/toolkit';
import {utente_login, utente_logout, utente_modifica} from 'api/utente.service';
import {deleteToken} from 'api/utils';
import {AxiosError} from 'axios';
import {RequestUtenteLogin, RequestUtenteLogout, RequestUtenteModifica,} from 'model/requestDTO';
import {ResponseUtente, ResponseUtenteLogin} from 'model/responseDTO';
import {utenteLoginController} from 'store/authentication/auth.controller';
import {toastActions} from 'store/toastr/toast.action';
import {ToastType} from 'store/toastr/types';

// queste sono action usate dallo store di authentication
// questa funzione è chiamata quando si vuole fare il login e richiama il servizio di login del be
const loginUser = createAsyncThunk(
    '/login',
    async (requestUtenteLogin: RequestUtenteLogin, thunkAPI): Promise<ResponseUtenteLogin | undefined> => {
        if (!utenteLoginController(requestUtenteLogin)) {
            thunkAPI.dispatch(toastActions.showToast({message: 'Username o password mancanti', type: ToastType.ERROR}));
            return;
        }
        try {
            const response = await utente_login(requestUtenteLogin);
            localStorage.setItem('token', response.data.jwtToken);
            localStorage.setItem('user', JSON.stringify(response.data.utente));
            return response.data;

        } catch (e) {
            const error = e as AxiosError;
            thunkAPI.dispatch(toastActions.showToast({message: error.response?.data, type: ToastType.ERROR}));
            throw e;
        }
    }
)



// questa action è chiamata quando si vuole fare il logout e richiama il servizio di logout del be
const logoutUser = createAsyncThunk(
    '/logout',
    async (requestUtenteLogout: RequestUtenteLogout, thunkAPI): Promise<void> => {
        try {
            await utente_logout(requestUtenteLogout);
            deleteToken();
        } catch (e) {
            const error = e as AxiosError;
            thunkAPI.dispatch(toastActions.showToast({message: error.response?.data, type: ToastType.ERROR}));
            throw e;
        }
    }
)

const modificaUser= createAsyncThunk(
    '/modifica',
    async (requestUtenteModifica: RequestUtenteModifica, thunkAPI): Promise<ResponseUtente> => {
        try {
            const response = await utente_modifica(requestUtenteModifica);
            localStorage.setItem('user', JSON.stringify(response.data));
            thunkAPI.dispatch(toastActions.showToast({message: "Modifica effettuata con successo", type: ToastType.SUCCESS}));
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            thunkAPI.dispatch(toastActions.showToast({message: error.response?.data, type: ToastType.ERROR}));
            throw e;
        }
    }
)



export const authAction = {
    loginUser,
    logoutUser,
    modificaUser
}
