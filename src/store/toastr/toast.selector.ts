import {RootState} from 'store/store.config';
import {ToastState} from './types';

// selector per il toast message

const getPayload = (state: RootState): ToastState => {
    return state.toast;
}

export const toastSelector = {
    getPayload
}
