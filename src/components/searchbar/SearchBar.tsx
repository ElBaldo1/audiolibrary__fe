import DatePicker from 'components/datePicker/DatePicker';
import {RequestAudiolibroRicerca} from 'model/requestDTO';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {audiolibroAction} from 'store/audiolibro/audiolibro.action';
import {audiolibroSelector} from 'store/audiolibro/audiolibro.selector';
import {PageType} from 'store/audiolibro/types';
import {useAppDispatch} from 'store/store.config';
import {toastActions} from 'store/toastr/toast.action';
import {ToastType} from 'store/toastr/types';

// questo componente è stato creato per la ricerca




function SearchBar () {
    const dispatch = useAppDispatch();
    const pageType = useSelector(audiolibroSelector.page);

    // in base alla pagina in cui l'utente si trova, viene settato il tipo di ricerca
    const typePageFunction = ():number => {
        if(pageType===PageType.FAVOURITEPAGE)
            return 2;
        else if(pageType===PageType.NETWORKPAGE)
            return 3;
        else
            return 1;
    }
    // questi state sono stati creati per la gestione della ricerca
    const [campoTitolo, setCampoTitolo] = useState('');
    const [campiRicerca, setCampiRicerca] = useState<RequestAudiolibroRicerca>({
        tipo: typePageFunction(),
    });

    // serve per inizialized i campi di ricerca
    useEffect(() => {
            setCampiRicerca({
                ...campiRicerca,
                tipo: typePageFunction()
            })
        }
        , []);

    useEffect(() => {
        setCampiRicerca({
            ...campiRicerca,
            tipo: typePageFunction()
        })
    }, [pageType]);

    useEffect(() => {
        debugger;
        console.log('<<c',campoTitolo);
    }, [campoTitolo]);





    // serve per far partire la ricerca
    const onclickSearch = () => {
        debugger;
        if (!campiRicerca.titolo && !campiRicerca.dataInserimento) {
            dispatch(toastActions.showToast({
                message: 'Inserire almeno un campo di ricerca',
                type: ToastType.ERROR
            }));
            return;
        }
        dispatch(audiolibroAction.ricercaAudiolibro(campiRicerca));
        console.log('<<',campiRicerca);
    }

    // serve per salvare la data di creazione che seleziona l'utente
    const onSearchDateChange = (search: string) => {
        setCampiRicerca({
            ...campiRicerca,
            dataInserimento: search ? search : undefined
        })
    }
// serve per salvare il titolo da ricercare che inserisce l'utente
    const onSearchTitoloChange = (search: string) => {
        setCampiRicerca({
            ...campiRicerca,
            titolo: search ? search : undefined
        })
    }

    // serve per mantenere il valore del titolo inserito dall'utente
    const manageSearch = (evt: { target: { value: string; }; }) => {
        const s = evt.target.value;
        setCampoTitolo(s);
        onSearchTitoloChange(s);
    }

    return (
        <div className="d-flex">
            <input className="form-control me-2"
                   name="search" value={campoTitolo} onChange={manageSearch}
                   type="search" placeholder="Ricerca (min 3 caratteri)" aria-label="Search"/>
            <DatePicker onChangeDate={onSearchDateChange}/>
            <button onClick={onclickSearch} className="btn btn-outline-info" type="submit">Ricerca</button>
            <button onClick={() => {
                setCampiRicerca({
                    tipo: pageType
                })
                setCampoTitolo('');
                dispatch(audiolibroAction.getAudiobooksbyUserList())
            }
            } className="btn btn-outline-info" type="reset">Reset
            </button>
        </div>);
}

export default SearchBar;
