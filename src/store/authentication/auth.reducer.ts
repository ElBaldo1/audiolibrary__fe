import {createReducer} from '@reduxjs/toolkit';
import {authAction} from 'store/authentication/auth.action';
import {AuthState} from 'store/authentication/types';

// questo è lo stato iniziale dello store di authentication
const initialState: AuthState = {
    responseUtenteLogin: undefined,
    error: false,
    loading: false
};

// questo è il reducer che gestisce lo store di authentication
export const authReducer = {
    auth: createReducer(initialState, (builder) => {
            builder
                .addCase(authAction.loginUser.pending, (state) => {
                        return {
                            ...state,
                            loading: true,
                            error: false
                        }
                    }
                )
                .addCase(authAction.loginUser.rejected, (state) => {
                        return {
                            ...state,
                            error: true,
                            loading: false
                        }
                    }
                )
                .addCase(authAction.loginUser.fulfilled, (state, action) => {

                        return {
                            ...state,
                            responseUtenteLogin: action.payload,
                            loading: false,
                            error: false
                        }
                    }
                )
                .addCase(authAction.logoutUser.rejected, (state) => {
                        return {
                            ...state,
                            error: true,
                            loading: false
                        }
                    }
                )
                .addCase(authAction.logoutUser.pending, (state) => {
                        return {
                            ...state,
                            loading: true,
                            error: false
                        }
                    }
                )
                .addCase(authAction.logoutUser.fulfilled, (state) => {
                    return {
                        ...state,
                        responseUtenteLogin: undefined,
                        loading: false,
                        error: false
                    }
                })
                .addCase(authAction.modificaUser.rejected, (state) => {
                        return {
                            ...state,
                            error: true,
                            loading: false
                        }
                    }
                )
                .addCase(authAction.modificaUser.pending, (state) => {
                        return {
                            ...state,
                            loading: true,
                            error: false
                        }
                    }
                )
                .addCase(authAction.modificaUser.fulfilled, (state) => {
                        return {
                            ...state,
                            loading: false,
                            error: false
                        }
                    }
                )
                .addCase(authAction.clearUserLogged.rejected, (state) => {
                    return {
                        ...state,
                        error: true,
                        loading: false
                    }
                })
                .addCase(authAction.clearUserLogged.pending, (state) => {
                    return {
                        ...state,
                        loading: true,
                        error: false
                    }
                })
                .addCase(authAction.clearUserLogged.fulfilled, (state) => {
                    return {
                        ...state,
                        responseUtenteLogin: undefined,
                        loading: false,
                        error: false
                    }
                })
        }
    )
}

