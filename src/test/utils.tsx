import {RootState} from "../store/store.config";
import {ToastType} from "../store/toastr/types";
import React from "react";
import {Provider} from "react-redux";
import {PageType} from "../store/audiolibro/types";
import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
export const renderWithProviders=(ui:JSX.Element,preloadStore?:Partial<RootState>): JSX.Element => {
    const store = getStoreInitial(preloadStore);
    const initialStore = mockStore(store);
    return <Provider store={initialStore}><BrowserRouter>{ui}</BrowserRouter></Provider>
}

export const getStoreInitial = (fieldsToUpdate?: Partial<RootState>): RootState => {
    return {
        toast: {
            message: '',
            show: false,
            type: ToastType.SUCCESS
        },
        auth: {
            responseUtenteLogin: undefined,
            error: false,
            loading: false
        },
        pages: {
            audioBooks: [],
            loading: false,
            page: PageType.HOMEPAGE
        },
        ...fieldsToUpdate
    };
};
