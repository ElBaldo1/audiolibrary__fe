import {RequestAudiolibroModificaCampi} from 'model/requestDTO';


export const modificaAudiolibroController=(requestAudiolibro:RequestAudiolibroModificaCampi)=>{
    let correct=true;
    if(requestAudiolibro.titolo==='' || requestAudiolibro.copertina===''   || requestAudiolibro.descrizione==='' || requestAudiolibro.copertina===''){
        correct=false;
        alert('errore,campi vuoti');
    }
    if(requestAudiolibro.titolo==null  || requestAudiolibro.descrizione==null || requestAudiolibro.copertina==null){
        correct=false;
        alert('errore,campi null');
    }
    return correct;

}
