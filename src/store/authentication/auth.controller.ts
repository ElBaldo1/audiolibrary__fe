
import {RequestUtenteLogin} from 'model/requestDTO';

// questi sono i controlli usati per gestire i controlli di autenticazione nel FE
export const utenteLoginController=(credentials:RequestUtenteLogin)=>{
    let correct=true;
    if(!credentials.username || !credentials.password){
        correct=false;
    }
    return correct;
}

// questa funzione controlla se l'email inserita è valida
export const regexEmail=(email:string)=>{
    let correct=true;
    if ((email).indexOf('@') === -1) {
        correct=false;
    }

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) {
        correct=false;
    }
    return correct;
}










