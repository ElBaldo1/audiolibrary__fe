import {ResponseUtente} from 'model/responseDTO';

// qui ci sono funzioni utili in tutti il programma

// questa funzione rimuove l'utente e il token dal local storage
export const deleteToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

//questa funzione prende il token dell'utente dal local storage
export const getToken = (): string => {
    const token=localStorage.getItem("token");
    return token ? token : "null";
    ;
}

// questa funzione prende l'utente dal local storage
export const getUser = (): ResponseUtente => {
    const json = JSON.stringify(localStorage.getItem("user"));
    const userString = JSON.parse(json);
    const user = JSON.parse(userString);
    return user;
}
