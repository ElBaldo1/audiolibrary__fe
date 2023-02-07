import {createReducer} from '@reduxjs/toolkit';
import {audiolibroAction} from 'store/audiolibro/audiolibro.action';
import {PagesState, PageType} from './types';

// stato iniziale del reducer della pagina di audiolibri
const initialState: PagesState = {
    audioBooks: [],
    loading: false,
    page: PageType.HOMEPAGE
}
export const audiolibroReducer = {
    pages: createReducer(initialState, (builder) => {
        builder
            .addCase(audiolibroAction.getAudiobooksbyUserList.pending, (state) => {
                return {
                    ...state,
                    loading: true
                }
            })
            .addCase(audiolibroAction.getAudiobooksbyUserList.fulfilled, (state, action) => {
                const audioBooks = action.payload.map((item) => {
                    return {
                        ...item,
                        copertina: 'data:image/png;base64,' + item.copertina,
                        audio: 'data:audio/mp3;base64,' + item.audio
                    }
                })

                return {
                    ...state,
                    audioBooks,
                    loading: false,
                    page: PageType.HOMEPAGE
                }
            })
            .addCase(audiolibroAction.getAudiobooksbyUserList.rejected, (state) => {
                return {
                    ...state,
                    loading: false
                }
            })
            .addCase(audiolibroAction.getFavuoritesAudiobookByUserList.fulfilled, (state, action) => {
                const audioBooks = action.payload.map((item) => {
                    return {
                        ...item,
                        copertina: 'data:image/png;base64,' + item.copertina,
                        audio: 'data:audio/mp3;base64,' + item.audio
                    }
                })
                return {
                    ...state,
                    audioBooks,
                    loading: false,
                    page: PageType.FAVOURITEPAGE
                }
            })
            .addCase(audiolibroAction.getFavuoritesAudiobookByUserList.rejected, (state) => {
                return {
                    ...state,
                    loading: false
                }
            })
            .addCase(audiolibroAction.getFavuoritesAudiobookByUserList.pending, (state) => {
                return {
                    ...state,
                    loading: true
                }
            })
            .addCase(audiolibroAction.getPublicAudiobookList.rejected, (state) => {
                return {
                    ...state,
                    loading: false
                }
            })
            .addCase(audiolibroAction.getPublicAudiobookList.pending, (state) => {
                return {
                    ...state,
                    loading: true
                }
            })
            .addCase(audiolibroAction.getPublicAudiobookList.fulfilled, (state, action) => {
                const audioBooks = action.payload.map((item) => {
                    return {
                        ...item,
                        copertina: 'data:image/png;base64,' + item.copertina,
                        audio: 'data:audio/mp3;base64,' + item.audio
                    }
                })
                return {
                    ...state,
                    audioBooks,
                    loading: false,
                    page: PageType.NETWORKPAGE
                }
            })
            .addCase(audiolibroAction.addNewAudiobook.pending, (state) => {
                return {
                    ...state,
                    loading: true
                }
            })
            .addCase(audiolibroAction.addNewAudiobook.fulfilled, (state, action) => {
                const newAudioBook = {
                    ...action.payload,
                    copertina: 'data:image/png;base64,' + action.payload.copertina,
                    audio: 'data:audio/mp3;base64,' + action.payload.audio
                }
                return {
                    ...state,
                    loading: false,
                    audioBooks: [...state.audioBooks, newAudioBook]
                }
            })
            .addCase(audiolibroAction.addNewAudiobook.rejected, (state) => {
                return {
                    ...state,
                    loading: false
                }
            })
            .addCase(audiolibroAction.ricercaAudiolibro.fulfilled, (state, action) => {
                if(action.payload.length > 0){
                    const audioBooks = action.payload.map((item) => {
                        return {
                            ...item,
                            copertina: 'data:image/png;base64,' + item.copertina,
                            audio: 'data:audio/mp3;base64,' + item.audio
                        }
                    })
                    return {
                        ...state,
                        loading: false,
                        audioBooks,
                        page: PageType.SEARCHPAGE
                    }
                } else {
                    return {
                        ...state,
                        loading: false,
                        audioBooks: [],
                        page: PageType.SEARCHPAGE
                    }
                }
            })
            .addCase(audiolibroAction.ricercaAudiolibro.pending, (state, ) => {
                return {
                    ...state,
                    loading: true,
                }
            })
    .addCase(audiolibroAction.eliminazioneAudiolibro.pending, (state, ) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(audiolibroAction.eliminazioneAudiolibro.rejected, (state, ) => {
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(audiolibroAction.eliminazioneAudiolibro.fulfilled, (state, action) => {
                const audioBooks = state.audioBooks.filter((item) => item.idAudiolibro !== action.payload.idAudiolibro)
                return {
                    ...state,
                    loading: false,
                    audioBooks
                }
            })
            .addCase(audiolibroAction.aggiungiAudiolibroPreferito.pending, (state, ) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(audiolibroAction.aggiungiAudiolibroPreferito.rejected, (state, ) => {
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(audiolibroAction.aggiungiAudiolibroPreferito.fulfilled, (state, action) => {
                // todo cosa dei preferiti
                const audioBooks = state.audioBooks.map((item) => {
                    if(item.idAudiolibro === action.payload.idAudiolibro){
                        return {
                            ...item,
                            preferito: true
                        }
                    }
                    return item
                })
                return {
                    ...state,
                    loading: false,
                    audioBooks
                }
            })
            .addCase(audiolibroAction.rimuoviAudiolibroPreferito.pending, (state, ) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(audiolibroAction.rimuoviAudiolibroPreferito.rejected, (state, ) => {
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(audiolibroAction.rimuoviAudiolibroPreferito.fulfilled, (state, action) => {
                const audioBooks = state.audioBooks.map((item) => {
                    if(item.idAudiolibro === action.payload.idAudiolibro){
                        return {
                            ...item,
                            preferito: false
                        }
                    }
                    return item
                })
                return {
                    ...state,
                    loading: false,
                    audioBooks
                }
            })
            .addCase(audiolibroAction.fineAscolto.rejected, (state, ) => {
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(audiolibroAction.fineAscolto.pending, (state, ) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(audiolibroAction.fineAscolto.fulfilled, (state, action) => {
                const audioBooks = state.audioBooks.map((item) => {
                    if(item.idAudiolibro === action.payload.idAudiolibro){
                        return {
                            ...item,
                            ultimoAscolto: action.payload.ultimoAscolto
                        }
                    }
                    return item
                })
                return {
                    ...state,
                    loading: false,
                    audioBooks
                }
            })

            .addCase(audiolibroAction.changeVisibility.fulfilled, (state, action) => {
                const audioBook = state.audioBooks.find((item) => item.idAudiolibro === action.payload.id);
                if (!audioBook) {
                    return state;
                }

                const audioBooks = state.audioBooks.map((item) => {
                    if(item.idAudiolibro === action.payload.id){
                        return {
                            ...item,
                            pubblico: action.payload.visible
                        }
                    }
                    return item
                });

                return {
                    ...state,
                    audioBooks
                }
            })
            .addCase(audiolibroAction.modificaAudiolibroAction.fulfilled, (state, action) => {
                const audioBooks = state.audioBooks.map((item) => {
                    if(item.idAudiolibro === action.payload.idAudiolibro){
                        const c= action.payload.copertina.includes('data:image/png;base64,') ? action.payload.copertina : 'data:image/png;base64,' + action.payload.copertina;
                        return {
                            ...item,
                            titolo: action.payload.titolo,
                            descrizione: action.payload.descrizione,
                            copertina: c,
                        }
                    }
                    return item
                })
                return {
                    ...state,
                    loading: false,
                    audioBooks
                }
            })
            .addCase(audiolibroAction.modificaAudiolibroAction.pending, (state, ) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(audiolibroAction.modificaAudiolibroAction.rejected, (state, ) => {
                return {
                    ...state,
                    loading: false,
                }
            })
    })
}
