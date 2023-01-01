
import {RequestUtenteRegistrazione} from 'model/requestDTO';
import {regexEmail} from 'store/authentication/auth.controller';
// questi sono i controlli che vengono richiamati quando l'utente si registra
export const utenteRegistrazioneController=(requestUtenteRegistrazione:RequestUtenteRegistrazione)=>{
    let correct=true;
    if(requestUtenteRegistrazione.email==='' || requestUtenteRegistrazione.nome==='' || requestUtenteRegistrazione.cognome==='' || requestUtenteRegistrazione.username==='' || requestUtenteRegistrazione.password===''){
        correct=false;
        alert('errore,campi vuoti');
    }
    if(requestUtenteRegistrazione.email==null || requestUtenteRegistrazione.nome==null || requestUtenteRegistrazione.cognome==null || requestUtenteRegistrazione.username==null || requestUtenteRegistrazione.password==null){
        correct=false;
        alert('errore,campi null');
    }
    if (!regexEmail(requestUtenteRegistrazione.email)){
        correct=false;
        alert('errore, email non valida');
    }
    //todo regex
/*    if (requestUtenteRegistrazione.password.length<8){
        correct=false;
        alert('errore,password troppo corta');
    }*/
    return correct;
}
