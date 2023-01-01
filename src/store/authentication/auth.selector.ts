import {RootState} from 'store/store.config';

// questi sono i selettori dello store di authentication che poi andranno a essere utilizzati nei componenti
const userLogged = (state: RootState) => state.auth.responseUtenteLogin?.utente;
const userToken = (state: RootState) => state.auth.responseUtenteLogin?.jwtToken;
const loading = (state: RootState) => state.auth.loading;
const error = (state: RootState) => state.auth.error;

export const authSelector = {
    userLogged,
    userToken,
    loading,
    error
}
