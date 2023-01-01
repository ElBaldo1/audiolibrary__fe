
// // qui vanno tutti i dto usati per ricevere dati al Backend

export interface ResponseUtenteLogin {
    jwtToken : string;
    utente: ResponseUtente;
}

export interface ResponseUtente {
    nome: string;
    cognome: string;
    username: string;
}

export interface ResponseAudiolibro{
    idAudiolibro: number;
    preferito: boolean;
    pubblico: boolean;
    titolo: string;
    descrizione: string;
    copertina: string;
    audio: string;
    dataInserimento: string;
    creatore: ResponseUtente;
    ultimoAscolto : ResponseAscolto;
}


export interface ResponseAscolto{
    data: string;
    secondi: number;
}

