import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// useAppDispatch restituisce un riferimento alla funzione di dispatch dal negozio Redux
export const useAppDispatch = () => useDispatch<AppDispatch>();

// useAppSelector è un tipo di useSelector globale che è stato personalizzato per utilizzare il tipo RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
