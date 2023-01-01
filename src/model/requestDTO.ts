
// qui vanno tutti i dto usati per mandare dati al Backend

export interface RequestUtenteLogin {
    username: string;
    password: string;
}


export interface RequestUtenteRegistrazione {
    nome: string;
    cognome: string;
    username: string;
    password: string;
    email: string;
}

export interface RequestUtenteLogout{
    jwtToken:string;
}


//request DTO audiolibro

export interface RequestAudiolibroInserisci{
    titolo: string;
    descrizione: string;
    copertina: string;
    audio: string;
}

export interface RequestUtenteIdentificativo{
    username: string;
}


export interface RequestAudiolibroRicerca{
    titolo?: string;
    dataInserimento?: string;
    tipo: number;
}

export interface RequestAudiolibroModifica{
    idAudiolibro: number;
}

export interface RequestAudiolibroCondivisione{
    idAudiolibro: number;
    utenti: RequestUtenteIdentificativo[];
}

export interface RequestAudiolibroAscolta{
    idAudiolibro: number;
    secondi: number;
}
