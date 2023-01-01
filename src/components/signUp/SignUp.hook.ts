import {utente_registrazione} from 'api/utente.service';
import {AxiosError} from 'axios';
import {RequestUtenteRegistrazione} from 'model/requestDTO';
import {ResponseUtente} from 'model/responseDTO';
import {useEffect, useState} from 'react';
import {useAppDispatch} from 'store/store.config';
import {toastActions} from 'store/toastr/toast.action';
import {ToastType} from 'store/toastr/types';

// questo hook è stato creato per gestire la logica di registrazione
export const useSignup = (dto?: RequestUtenteRegistrazione) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<ResponseUtente>();


    // quando cambia il dto in ingresso, lui fa la chiamata
    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                if (dto) {
                    const response = await utente_registrazione(dto);
                    const responseDto = response.data;
                    setData(responseDto);
                    dispatch(toastActions.showToast({message: 'Registrazione avvenuta con successo', type: ToastType.SUCCESS}));
                }
            } catch (e) {
                const {response} = e as AxiosError
                if (response && response.data) {
                    const errData = response.data as { message: string }
                   dispatch(toastActions.showToast({message: errData.message, type: ToastType.ERROR}))
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetch();
    }, [dto]);

    return [isLoading, data];
}
