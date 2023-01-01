import React, {useEffect} from 'react';
import {toast, ToastContainer, ToastPosition} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from 'react-redux';
import {toastActions} from 'store/toastr/toast.action';
import {toastSelector} from 'store/toastr/toast.selector';
import {ToastOptions, ToastType} from 'store/toastr/types';

//
interface ToastrProps{
    position?: ToastPosition
    autoClose?: number
    hideProgressBar?: boolean
    newestOnTop?: boolean
    rtl?: boolean
}
const componentClassName = 'toastr';


// questo componente serve per mostrare i toast(messaggi di errore o di successo)
export const Toastr = (props: ToastrProps) => {
    const dispatch = useDispatch();
    const payload = useSelector(toastSelector.getPayload);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | undefined;
        if (payload.show) {
            createToast(payload.message, payload.type, payload.options);
            timeoutId = setTimeout(() => {
                dispatch(toastActions.hideToast());
            }, payload.options?.autoClose || 5000);
        }

        return () => {
            clearTimeout(timeoutId);
        }
    }, [payload.show]);

// questa funzione crea il toast
    const createToast = (message: string, type: ToastType, options?: ToastOptions) => {
        const toastOptions = {
            position: options?.position || "top-right",
            autoClose: options?.autoClose || 5000,
            hideProgressBar: options?.hideProgressBar || false,
            closeOnClick:  true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }

        // questo switch serve per gestire il tipo di toast che vogliamo mostrare
        switch (type) {
            case ToastType.SUCCESS:
                toast.success(message, toastOptions);
                break;

            case ToastType.ERROR:
                toast.error(message, toastOptions);
                break;
        }
    }

    return (
        <div className={`${componentClassName}`}>
            <ToastContainer
                position={props.position}
                autoClose={props.autoClose}
                hideProgressBar={props.hideProgressBar}
                newestOnTop={props.newestOnTop}
                closeOnClick
                rtl={props.rtl}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
};
