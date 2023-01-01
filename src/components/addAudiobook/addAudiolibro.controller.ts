//  qui vengono controllati tutti i campi dell'audiolibro da aggiungere
import {RequestAudiolibroInserisci} from 'model/requestDTO';

export const addAudiolibroController=(requestAudiolibro:RequestAudiolibroInserisci)=>{
    let correct=true;
    if(requestAudiolibro.titolo==='' || requestAudiolibro.copertina==='' || requestAudiolibro.audio===''  || requestAudiolibro.descrizione==='' || requestAudiolibro.copertina===''){
        correct=false;
        alert('errore,campi vuoti');
    }
    if(requestAudiolibro.titolo==null || requestAudiolibro.audio==null || requestAudiolibro.descrizione==null || requestAudiolibro.copertina==null){
        correct=false;
        alert('errore,campi null');
    }
    return correct;

}
