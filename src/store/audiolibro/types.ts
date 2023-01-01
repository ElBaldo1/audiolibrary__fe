import {ResponseAudiolibro} from 'model/responseDTO';

// questi sono i tipi di oggetti utilizzati nello store di audiolibro

export interface PagesState {
    audioBooks: ResponseAudiolibro[];
    loading: boolean;
    page: PageType;
}

export enum PageType {
    HOMEPAGE = 1,
    FAVOURITEPAGE = 2,
    NETWORKPAGE = 3,
    SEARCHPAGE = 4,
}
