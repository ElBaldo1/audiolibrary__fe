import {RootState} from 'store/store.config';

// questo sono selector che mi permettono di accedere allo stato dello store di audiolibro
const list = (state: RootState) => state.pages.audioBooks
const loading = (state: RootState) => state.pages.loading
const page = (state: RootState) => state.pages.page

export const audiolibroSelector = {
    list,
    loading,
    page
}
