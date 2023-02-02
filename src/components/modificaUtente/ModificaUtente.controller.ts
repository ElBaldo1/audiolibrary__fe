
import {RequestUtenteModifica} from 'model/requestDTO';
import {regexEmail} from 'store/authentication/auth.controller';
// questi sono i controlli che vengono richiamati quando l'utente modificare i propri dati
export const utenteModificaController=(requestUtenteRegistrazione:RequestUtenteModifica)=>{
    let correct=true;
    if(requestUtenteRegistrazione.email==='' || requestUtenteRegistrazione.username==='' || requestUtenteRegistrazione.password===''){
        correct=false;
        alert('errore,campi vuoti');
    }
    if(requestUtenteRegistrazione.email==null || requestUtenteRegistrazione.username==null || requestUtenteRegistrazione.password==null){
        correct=false;
        alert('errore,campi null');
    }
    if (!regexEmail(requestUtenteRegistrazione.email)){
        correct=false;
        alert('errore, email non valida');
    }
    return correct;
}
