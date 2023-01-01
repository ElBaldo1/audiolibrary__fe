import {useDispatch} from 'react-redux';
import {authReducer} from 'store/authentication/auth.reducer';
import {audiolibroReducer} from 'store/audiolibro/audiolibro.reducer';
import {configureStore} from '@reduxjs/toolkit';
import {toastReducer} from 'store/toastr/toast.reducer';

// questo file serve per configurare il redux store
const store = configureStore({
  reducer: {
    ...authReducer,
    ...audiolibroReducer,
    ...toastReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
