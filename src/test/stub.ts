import {ResponseUtente} from 'model/responseDTO';
import {PagesState, PageType} from 'store/audiolibro/types';
import {AuthState} from 'store/authentication/types';

export const getUtenteStub = (): ResponseUtente => {
    return {
        nome: 'nome',
        cognome: 'cognome',
        username: 'username'
    }
}

export const getResponseUtenteLoginStub=()=> {
    return {
        jwtToken: 'jwt',
        utente: getUtenteStub()
    }
}

export const getAuthStateStub = (fieldsToUpdate?:Partial<AuthState>) => {
    return {
        responseUtenteLogin: getResponseUtenteLoginStub(),
        error: false,
        loading: false,
        ...fieldsToUpdate
    }
}

export const getPagesStub = (fieldsToUpdate?:Partial<PagesState>):PagesState => {
    return {
        audioBooks: [getAudioBookStub()],
        loading: false,
        page: PageType.HOMEPAGE,
        ...fieldsToUpdate
    }
}

export const getAudioBookStub = () => {
    return {
        idAudiolibro: 1,
        preferito: false,
        pubblico: false,
        titolo: 'titolo',
        descrizione: 'descrizione',
        copertina: 'copertina',
        audio: 'audio',
        dataInserimento: 'dataInserimento',
        creatore: getUtenteStub(),
        ultimoAscolto: getUltimoAscoltoStub()
    }
}

export const getUltimoAscoltoStub = () => {
    return {
        data: 'data',
        secondi: 1
    }
}

