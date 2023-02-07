// questi sono i test del reducer di audiolibro


import {RequestAudiolibroModifica} from 'model/requestDTO';
import {ResponseAscolto, ResponseAudiolibro, ResponseUtente} from 'model/responseDTO';
import {audiolibroAction} from 'store/audiolibro/audiolibro.action';
import {audiolibroReducer} from 'store/audiolibro/audiolibro.reducer';
import {PagesState, PageType} from 'store/audiolibro/types';

describe('AudiolibroReducer', () => {

    test('audiolibroReducer  initial state', () => {
        const initialState: PagesState = {
            audioBooks: [],
            loading: false,
            page: PageType.HOMEPAGE
        }
        expect(audiolibroReducer.pages(initialState, {} as any)).toEqual(initialState);
    });

    // test •	getAudiobooksbyUserList
    // this test will return state with loading true
    test('it should return state with loading true when an user required the home page list', () => {
        const initialState: PagesState = {
            audioBooks: [],
            loading: false,
            page: PageType.HOMEPAGE
        }
        const expectedState: PagesState = {
            ...initialState,
            loading: true
        }
        expect(audiolibroReducer.pages(initialState, {type: audiolibroAction.getAudiobooksbyUserList.pending.type})).toEqual(expectedState);
    });

    // this test will return a list of audiobooks when the user required the home page list
    test('it should return a list of audiobooks when an user required the home page list', () => {
        const initialState: PagesState = {
            audioBooks: [],
            loading: false,
            page: PageType.HOMEPAGE
        }

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooks: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: true,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]

        const expectedAudiobooks = audioBooks.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })

        const expectedState: PagesState = {
            ...initialState,
            audioBooks: expectedAudiobooks,
            loading: false,
            page: PageType.HOMEPAGE,

        }
        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.getAudiobooksbyUserList.fulfilled.type,
            payload: audioBooks
        })).toEqual(expectedState);
    });

// •	getFavuoritesAudiobookByUserList
    //pending
    test('it should return state with loading true when an user required the favourite page list', () => {
        const initialState: PagesState = {
            audioBooks: [],
            loading: false,
            page: PageType.FAVOURITEPAGE
        }
        const expectedState: PagesState = {
            ...initialState,
            loading: true
        }
        expect(audiolibroReducer.pages(initialState, {type: audiolibroAction.getFavuoritesAudiobookByUserList.pending.type})).toEqual(expectedState);
    });

    //fullfilled
    test('it should return a list of audiobooks when an user required the favourite page list', () => {
        const initialState: PagesState = {
            audioBooks: [],
            loading: false,
            page: PageType.FAVOURITEPAGE
        }

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooks: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: true,
                pubblico: true,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]

        const expectedAudiobooks = audioBooks.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })

        const expectedState: PagesState = {
            ...initialState,
            audioBooks: expectedAudiobooks,
            loading: false,
            page: PageType.FAVOURITEPAGE,

        }
        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.getFavuoritesAudiobookByUserList.fulfilled.type,
            payload: audioBooks
        })).toEqual(expectedState);
    });

// •	getPublicAudiobookList
    //pending
    test('it should return state with loading true when an user required the public page list', () => {
        const initialState: PagesState = {
            audioBooks: [],
            loading: false,
            page: PageType.NETWORKPAGE
        }
        const expectedState: PagesState = {
            ...initialState,
            loading: true
        }
        expect(audiolibroReducer.pages(initialState, {type: audiolibroAction.getPublicAudiobookList.pending.type})).toEqual(expectedState);
    });
    //fullfilled
    test('it should return a list of audiobooks when an user required the public page list', () => {
        const initialState: PagesState = {
            audioBooks: [],
            loading: false,
            page: PageType.NETWORKPAGE
        }

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooks: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: true,
                pubblico: true,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]

        const expectedAudiobooks = audioBooks.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })

        const expectedState: PagesState = {
            ...initialState,
            audioBooks: expectedAudiobooks,
            loading: false,
            page: PageType.NETWORKPAGE,

        }
        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.getPublicAudiobookList.fulfilled.type,
            payload: audioBooks
        })).toEqual(expectedState);
    });
// •	addNewAudiobook
    //pending
    test('it should return state with loading true when an user add a new audiobook', () => {
        const initialState: PagesState = {
            audioBooks: [],
            loading: false,
            page: PageType.HOMEPAGE
        }
        const expectedState: PagesState = {
            ...initialState,
            loading: true
        }
        expect(audiolibroReducer.pages(initialState, {type: audiolibroAction.addNewAudiobook.pending.type})).toEqual(expectedState);
    });
    //fullfilled
    test('it should return a list of audiobooks when an user add a new audiobook', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })

        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.HOMEPAGE
        }

        const newAudiobook: ResponseAudiolibro = {
            idAudiolibro: 2,
            preferito: false,
            pubblico: false,
            titolo: 'titolo',
            descrizione: 'descrizione',
            copertina: 'copertina',
            audio: 'audio',
            dataInserimento: 'dataInserimento',
            creatore: creatore,
            ultimoAscolto: ultimoAscolto,
        }


        const expectedAudiobooks = [...audioBooksInitial, newAudiobook].map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })

        const expectedState: PagesState = {
            ...initialState,
            audioBooks: [...expectedAudiobooks],
            loading: false,
            page: PageType.HOMEPAGE,
        }
        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.addNewAudiobook.fulfilled.type,
            payload: newAudiobook
        })).toEqual(expectedState);
    });


// •	ricercaAudiolibro
    //pending
    test('it should return state with loading true when an user search an audiobook', () => {
        const initialState: PagesState = {
            audioBooks: [],
            loading: false,
            page: PageType.SEARCHPAGE
        }
        const expectedState: PagesState = {
            ...initialState,
            loading: true
        }
        expect(audiolibroReducer.pages(initialState, {type: audiolibroAction.ricercaAudiolibro.pending.type})).toEqual(expectedState);
    });
    // fullfilled
    //home page
    // research with result
    //research by title

    test('it should return audiobooks when an user search an audiobook with title in homepage', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            },
            {
                idAudiolibro: 2,
                preferito: false,
                pubblico: false,
                titolo: 'secondotit',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento2',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.HOMEPAGE
        }
        const parameter = {
            titolo: 'titolo'
        }

        const expectedAudiobooks = audioBooksPreloaded.filter((item) => {
            return item.titolo.includes(parameter.titolo)
        })

        const expectedState: PagesState = {
            ...initialState,
            audioBooks: expectedAudiobooks,
            page: PageType.SEARCHPAGE
        }
        const payload = [audioBooksInitial[0]]
        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.ricercaAudiolibro.fulfilled.type,
            payload: payload
        })).toEqual(expectedState);

    });

    //research by date
    test('it should return audiobooks when an user search an audiobook with date in homepage', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            },
            {
                idAudiolibro: 2,
                preferito: false,
                pubblico: true,
                titolo: 'secondotit',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento2',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.HOMEPAGE
        }
        const parameter = {
            dataInserimento: 'dataInserimento'
        }

        const expectedAudiobooks = audioBooksPreloaded.filter((item) => {
            return item.dataInserimento === parameter.dataInserimento
        })

        const expectedState: PagesState = {
            ...initialState,
            audioBooks: expectedAudiobooks,
            page: PageType.SEARCHPAGE
        }
        const payload = [audioBooksInitial[0]]


        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.ricercaAudiolibro.fulfilled.type,
            payload: payload
        })).toEqual(expectedState);
    });

    //research by title and date
    test('it should return audiobooks when an user search an audiobook with title and date in homepage', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            },
            {
                idAudiolibro: 2,
                preferito: false,
                pubblico: true,
                titolo: 'secondotit',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento2',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.HOMEPAGE
        }
        const parameter = {
            titolo: 'titolo',
            dataInserimento: 'dataInserimento'
        }

        const expectedAudiobooks = audioBooksPreloaded.filter((item) => {
            return item.titolo.includes(parameter.titolo) && item.dataInserimento === parameter.dataInserimento
        })

        const expectedState: PagesState = {
            ...initialState,
            audioBooks: expectedAudiobooks,
            page: PageType.SEARCHPAGE
        }
        const payload = [audioBooksInitial[0]]
        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.ricercaAudiolibro.fulfilled.type,
            payload: payload
        })).toEqual(expectedState);

    });
    //research without results
    test('it should return audiobooks when an user search an audiobook without results in homepage', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            },
            {
                idAudiolibro: 2,
                preferito: false,
                pubblico: true,
                titolo: 'secondotit',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento2',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.HOMEPAGE
        }
        const parameter = {
            titolo: 'hobbit',
            dataInserimento: 'nonSo'
        }

        const expectedAudiobooks = audioBooksPreloaded.filter((item) => {
            return item.titolo.includes(parameter.titolo) && item.dataInserimento === parameter.dataInserimento
        })

        const expectedState: PagesState = {
            ...initialState,
            audioBooks: expectedAudiobooks,
            page: PageType.SEARCHPAGE
        }
        const payload: ResponseAudiolibro[] = []

        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.ricercaAudiolibro.fulfilled.type,
            payload: payload
        })).toEqual(expectedState);
    });


    // favourite page
    // research with result
    //research by title

    test('it should return audiobooks when an user search an audiobook with title in favourite page', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            },
            {
                idAudiolibro: 2,
                preferito: false,
                pubblico: true,
                titolo: 'secondotit',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento2',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.FAVOURITEPAGE
        }
        const parameter = {
            titolo: 'titolo'
        }

        const expectedAudiobooks = audioBooksPreloaded.filter((item) => {
            return item.titolo.includes(parameter.titolo)
        })

        const expectedState: PagesState = {
            ...initialState,
            audioBooks: expectedAudiobooks,
            page: PageType.SEARCHPAGE
        }
        const payload = [audioBooksInitial[0]]
        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.ricercaAudiolibro.fulfilled.type,
            payload: payload
        })).toEqual(expectedState);

    });

    //research by date
    test('it should return audiobooks when an user search an audiobook with date in favourite page', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            },
            {
                idAudiolibro: 2,
                preferito: false,
                pubblico: true,
                titolo: 'secondotit',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento2',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.FAVOURITEPAGE
        }
        const parameter = {
            dataInserimento: 'dataInserimento'
        }

        const expectedAudiobooks = audioBooksPreloaded.filter((item) => {
            return item.dataInserimento === parameter.dataInserimento
        })

        const expectedState: PagesState = {
            ...initialState,
            audioBooks: expectedAudiobooks,
            page: PageType.SEARCHPAGE
        }
        const payload = [audioBooksInitial[0]]


        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.ricercaAudiolibro.fulfilled.type,
            payload: payload
        })).toEqual(expectedState);
    });

    //research by title and date
    test('it should return audiobooks when an user search an audiobook with title and date in favourite page', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            },
            {
                idAudiolibro: 2,
                preferito: false,
                pubblico: true,
                titolo: 'secondotit',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento2',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.FAVOURITEPAGE
        }
        const parameter = {
            titolo: 'titolo',
            dataInserimento: 'dataInserimento'
        }

        const expectedAudiobooks = audioBooksPreloaded.filter((item) => {
            return item.titolo.includes(parameter.titolo) && item.dataInserimento === parameter.dataInserimento
        })

        const expectedState: PagesState = {
            ...initialState,
            audioBooks: expectedAudiobooks,
            page: PageType.SEARCHPAGE
        }
        const payload = [audioBooksInitial[0]]
        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.ricercaAudiolibro.fulfilled.type,
            payload: payload
        })).toEqual(expectedState);

    });
    //research without results
    test('it should return audiobooks when an user search an audiobook without results in favourite page', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            },
            {
                idAudiolibro: 2,
                preferito: false,
                pubblico: true,
                titolo: 'secondotit',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento2',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.FAVOURITEPAGE
        }
        const parameter = {
            titolo: 'hobbit',
            dataInserimento: 'nonSo'
        }

        const expectedAudiobooks = audioBooksPreloaded.filter((item) => {
            return item.titolo.includes(parameter.titolo) && item.dataInserimento === parameter.dataInserimento
        })

        const expectedState: PagesState = {
            ...initialState,
            audioBooks: expectedAudiobooks,
            page: PageType.SEARCHPAGE
        }
        const payload: ResponseAudiolibro[] = []

        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.ricercaAudiolibro.fulfilled.type,
            payload: payload
        })).toEqual(expectedState);
    });

    //network page
    // research with result
    //research by title

    test('it should return audiobooks when an user search an audiobook with title in network page', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            },
            {
                idAudiolibro: 2,
                preferito: false,
                pubblico: true,
                titolo: 'secondotit',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento2',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.NETWORKPAGE
        }
        const parameter = {
            titolo: 'titolo'
        }

        const expectedAudiobooks = audioBooksPreloaded.filter((item) => {
            return item.titolo.includes(parameter.titolo)
        })

        const expectedState: PagesState = {
            ...initialState,
            audioBooks: expectedAudiobooks,
            page: PageType.SEARCHPAGE
        }
        const payload = [audioBooksInitial[0]]
        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.ricercaAudiolibro.fulfilled.type,
            payload: payload
        })).toEqual(expectedState);

    });

    //research by date
    test('it should return audiobooks when an user search an audiobook with date in network page', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            },
            {
                idAudiolibro: 2,
                preferito: false,
                pubblico: true,
                titolo: 'secondotit',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento2',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.NETWORKPAGE
        }
        const parameter = {
            dataInserimento: 'dataInserimento'
        }

        const expectedAudiobooks = audioBooksPreloaded.filter((item) => {
            return item.dataInserimento === parameter.dataInserimento
        })

        const expectedState: PagesState = {
            ...initialState,
            audioBooks: expectedAudiobooks,
            page: PageType.SEARCHPAGE
        }
        const payload = [audioBooksInitial[0]]


        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.ricercaAudiolibro.fulfilled.type,
            payload: payload
        })).toEqual(expectedState);
    });

    //research by title and date
    test('it should return audiobooks when an user search an audiobook with title and date in network page', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            },
            {
                idAudiolibro: 2,
                preferito: false,
                pubblico: true,
                titolo: 'secondotit',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento2',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.NETWORKPAGE
        }
        const parameter = {
            titolo: 'titolo',
            dataInserimento: 'dataInserimento'
        }

        const expectedAudiobooks = audioBooksPreloaded.filter((item) => {
            return item.titolo.includes(parameter.titolo) && item.dataInserimento === parameter.dataInserimento
        })

        const expectedState: PagesState = {
            ...initialState,
            audioBooks: expectedAudiobooks,
            page: PageType.SEARCHPAGE
        }
        const payload = [audioBooksInitial[0]]
        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.ricercaAudiolibro.fulfilled.type,
            payload: payload
        })).toEqual(expectedState);

    });
    //research without results
    test('it should return audiobooks when an user search an audiobook without results in network page', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            },
            {
                idAudiolibro: 2,
                preferito: false,
                pubblico: true,
                titolo: 'secondotit',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento2',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.NETWORKPAGE
        }
        const parameter = {
            titolo: 'hobbit',
            dataInserimento: 'nonSo'
        }

        const expectedAudiobooks = audioBooksPreloaded.filter((item) => {
            return item.titolo.includes(parameter.titolo) && item.dataInserimento === parameter.dataInserimento
        })

        const expectedState: PagesState = {
            ...initialState,
            audioBooks: expectedAudiobooks,
            page: PageType.SEARCHPAGE
        }
        const payload: ResponseAudiolibro[] = []

        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.ricercaAudiolibro.fulfilled.type,
            payload: payload
        })).toEqual(expectedState);
    });

// •	eliminazioneAudiolibro
    //pending
    test('it should return state with loading true when an user delete an audiobook', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.HOMEPAGE
        }
        const expectedState: PagesState = {
            ...initialState,
            loading: true
        }
        expect(audiolibroReducer.pages(initialState, {type: audiolibroAction.eliminazioneAudiolibro.pending.type})).toEqual(expectedState);
    });
    //fullfilled
    test('it should return a list of audiobooks withoout one audiobooks when an user delete an audiobook', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.HOMEPAGE
        }
        const expectedState: PagesState = {
            ...initialState,
            audioBooks: [],
        }
        const payload: RequestAudiolibroModifica = {
            idAudiolibro: 1,
        }
        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.eliminazioneAudiolibro.fulfilled.type,
            payload: payload
        })).toEqual(expectedState);
    });

// •	aggiungiAudiolibroPreferito
    //pending
    test('it should return state with loading true when an user add an audiobook to his favorites', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.HOMEPAGE
        }
        const expectedState: PagesState = {
            ...initialState,
            loading: true
        }
        expect(audiolibroReducer.pages(initialState, {type: audiolibroAction.aggiungiAudiolibroPreferito.pending.type})).toEqual(expectedState);
    });
    //fullfilled
    test('it should return a list of audiobooks with one audiobook added to his favorites when an user add an audiobook to his favorites', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: false,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.HOMEPAGE
        }
        const expectedState: PagesState = {
            ...initialState,
            audioBooks: [{
                ...audioBooksPreloaded[0],
                preferito: true
            }]
        }
        const payload: RequestAudiolibroModifica = {
            idAudiolibro: 1,
        }
        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.aggiungiAudiolibroPreferito.fulfilled.type,
            payload: payload
        })).toEqual(expectedState);
    });
// •	rimuoviAudiolibroPreferito
    //pending
    test('it should return state with loading true when an user remove an audiobook from his favorites', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: true,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.HOMEPAGE
        }
        const expectedState: PagesState = {
            ...initialState,
            loading: true
        }
        expect(audiolibroReducer.pages(initialState, {type: audiolibroAction.rimuoviAudiolibroPreferito.pending.type})).toEqual(expectedState);
    });
    //fullfilled
    test('it should return a list of audiobooks with one audiobook removed from his favorites when an user remove an audiobook from his favorites', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: true,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.HOMEPAGE
        }
        const expectedState: PagesState = {
            ...initialState,
            audioBooks: [{
                ...audioBooksPreloaded[0],
                preferito: false
            }]
        }
        const payload: RequestAudiolibroModifica = {
            idAudiolibro: 1,
        }
        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.rimuoviAudiolibroPreferito.fulfilled.type,
            payload: payload
        })).toEqual(expectedState);
    })
// •	fineAscolto
    //pending
    test('it should return state with loading true when an user finish to listen an audiobook', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: true,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.HOMEPAGE
        }
        const expectedState: PagesState = {
            ...initialState,
            loading: true
        }
        expect(audiolibroReducer.pages(initialState, {type: audiolibroAction.fineAscolto.pending.type})).toEqual(expectedState);
    });
    //fullfilled
    test('it should return a list of audiobooks with one audiobook updated when an user finish to listen an audiobook', () => {

        const ultimoAscolto: ResponseAscolto = {
            data: '2021-05-05',
            secondi: 100,
        }

        const creatore: ResponseUtente = {
            nome: 'nome',
            cognome: 'cognome',
            username: 'username',
        }

        const audioBooksInitial: ResponseAudiolibro[] = [
            {
                idAudiolibro: 1,
                preferito: true,
                pubblico: false,
                titolo: 'titolo',
                descrizione: 'descrizione',
                copertina: 'copertina',
                audio: 'audio',
                dataInserimento: 'dataInserimento',
                creatore: creatore,
                ultimoAscolto: ultimoAscolto,
            }
        ]
        const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
            return {
                ...item,
                copertina: 'data:image/png;base64,' + item.copertina,
                audio: 'data:audio/mp3;base64,' + item.audio
            }
        })
        const initialState: PagesState = {
            audioBooks: audioBooksPreloaded,
            loading: false,
            page: PageType.HOMEPAGE
        }
        const newAudiolibro: ResponseAudiolibro = {
            ...audioBooksPreloaded[0],
            ultimoAscolto: {
                data: '2021-05-05',
                secondi: 100
            }
        }


        const expectedState: PagesState = {
            ...initialState,
            audioBooks: [newAudiolibro]
        }

        expect(audiolibroReducer.pages(initialState, {
            type: audiolibroAction.fineAscolto.fulfilled.type,
            payload: newAudiolibro
        })).toEqual(expectedState);
    });

    //test modificaAudiolibro
    //pending
    test('it should return state with loading true when an user modify an audiobook', () => {

            const ultimoAscolto: ResponseAscolto = {
                data: '2021-05-05',
                secondi: 100,
            }

            const creatore: ResponseUtente = {
                nome: 'nome',
                cognome: 'cognome',
                username: 'username',
            }

            const audioBooksInitial: ResponseAudiolibro[] = [
                {
                    idAudiolibro: 1,
                    preferito: true,
                    pubblico: false,
                    titolo: 'titolo',
                    descrizione: 'descrizione',
                    copertina: 'copertina',
                    audio: 'audio',
                    dataInserimento: 'dataInserimento',
                    creatore: creatore,
                    ultimoAscolto: ultimoAscolto,
                }
            ]
            const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
                return {
                    ...item,
                    copertina: 'data:image/png;base64,' + item.copertina,
                    audio: 'data:audio/mp3;base64,' + item.audio
                }
            })
            const initialState: PagesState = {
                audioBooks: audioBooksPreloaded,
                loading: false,
                page: PageType.HOMEPAGE
            }
            const expectedState: PagesState = {
                ...initialState,
                loading: true
            }
            expect(audiolibroReducer.pages(initialState, {type: audiolibroAction.modificaAudiolibroAction.pending.type})).toEqual(expectedState);
    })
    //fullfilled
    test('it should return a list of audiobooks with one audiobook updated when an user modify an audiobook', () => {

            const ultimoAscolto: ResponseAscolto = {
                data: '2021-05-05',
                secondi: 100,
            }

            const creatore: ResponseUtente = {
                nome: 'nome',
                cognome: 'cognome',
                username: 'username',
            }

            const audioBooksInitial: ResponseAudiolibro[] = [
                {
                    idAudiolibro: 1,
                    preferito: true,
                    pubblico: false,
                    titolo: 'titolo',
                    descrizione: 'descrizione',
                    copertina: 'copertina',
                    audio: 'audio',
                    dataInserimento: 'dataInserimento',
                    creatore: creatore,
                    ultimoAscolto: ultimoAscolto,
                }
            ]
            const audioBooksPreloaded: ResponseAudiolibro[] = audioBooksInitial.map((item) => {
                return {
                    ...item,
                    copertina: 'data:image/png;base64,' + item.copertina,
                    audio: 'data:audio/mp3;base64,' + item.audio
                }
            })
            const initialState: PagesState = {
                audioBooks: audioBooksPreloaded,
                loading: false,
                page: PageType.HOMEPAGE
            }
            const newAudiolibro: ResponseAudiolibro = {
                ...audioBooksPreloaded[0],
                titolo: 'titolo2',
                descrizione: 'descrizione2',
            }

            const expectedState: PagesState = {
                ...initialState,
                audioBooks: [newAudiolibro]
            }

            expect(audiolibroReducer.pages(initialState, {
                type: audiolibroAction.modificaAudiolibroAction.fulfilled.type,
                payload: newAudiolibro
            })).toEqual(expectedState);
    })
})

