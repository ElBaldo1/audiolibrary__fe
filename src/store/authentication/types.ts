import {ResponseUtenteLogin} from 'model/responseDTO';

// qui ci sono i tipi di oggetti usati nello store di authentication
export interface AuthState {
    responseUtenteLogin?:ResponseUtenteLogin;
    error: boolean;
    loading: boolean;
}

