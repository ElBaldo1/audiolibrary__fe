import {ToastPosition} from 'react-toastify';

// tipi per la configurazione di toastr
export interface ToastState {
    show: boolean;
    message: string;
    type: ToastType;
    options?: ToastOptions;
}

export const enum ToastType {
    SUCCESS = 'success',
    BACKEND_ERROR = 'backend-error',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning'
}

export interface ToastOptions {
    position?: ToastPosition,
    autoClose?: number,
    hideProgressBar?: boolean,
    newestOnTop?: boolean,
    rtl?: boolean
}
