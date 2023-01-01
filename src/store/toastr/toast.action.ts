import {createAction} from '@reduxjs/toolkit';

// action usate per visualizzare e nascondere un toast
export const enum TOAST_ACTION {
    SHOW = 'SHOW',
    HIDE = 'HIDE'
}

const showToast = createAction(TOAST_ACTION.SHOW, (payload) => {
    return {
        payload: {
            type: payload.type,
            message: payload.message,
            options: payload.options
        }
    }
})

const hideToast = createAction(TOAST_ACTION.HIDE, () => {
    return {
        payload: {}
    }
})

export const toastActions = {
    showToast,
    hideToast
}
