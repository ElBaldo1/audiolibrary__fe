import {ResponseUtenteLogin} from 'model/responseDTO';
import {authAction} from 'store/authentication/auth.action';
import {authReducer} from 'store/authentication/auth.reducer';
import {AuthState} from 'store/authentication/types';

// questi sono i test del reducer che gestisce l'autenticazione

describe('Authentication Reducer', () => {
test('should return initial state', () => {
        const initialState: AuthState = {
            responseUtenteLogin: undefined,
            loading: false,
            error: false
        }
        expect(authReducer.auth(initialState, {type: ''})).toEqual(initialState)
    })
    //loginUser
        //pending
        test('should call login method and return state with loading true', () => {
            const initialState: AuthState = {
                responseUtenteLogin: undefined,
                loading: false,
                error: false
            }
            const expectedState: AuthState = {
                ...initialState,
                loading: true,
                error: false
            }
            expect(authReducer.auth(initialState, {type: authAction.loginUser.pending.type})).toEqual(expectedState)
        }   )
        //rejected
        test('should call login method and return state with error true', () => {
            const initialState: AuthState = {
                responseUtenteLogin: undefined,
                loading: false,
                error: false
            }
            const expectedState: AuthState = {
                ...initialState,
                error: true,
                loading: false
            }
            expect(authReducer.auth(initialState, {type: authAction.loginUser.rejected.type})).toEqual(expectedState)
        })
        //fulfilled
        test('should call login method and return state with responseUtenteLogin', () => {
            const initialState: AuthState = {
                responseUtenteLogin: undefined,
                loading: false,
                error: false
            }

            const responseUtenteLogin:ResponseUtenteLogin = {
                jwtToken: 'token',
                utente: {
                    nome: 'nome',
                    cognome: 'cognome',
                    username: 'username',
                }
            }
            const expectedState: AuthState = {
                ...initialState,
                responseUtenteLogin: responseUtenteLogin,
            }


            expect(authReducer.auth(initialState, {type: authAction.loginUser.fulfilled.type, payload:responseUtenteLogin })).toEqual(expectedState)

        })
    //logoutUser
        //pending
        test('should call logout method and return state with loading true', () => {
            const initialState: AuthState = {
                responseUtenteLogin: undefined,
                loading: false,
                error: false
            }
            const expectedState: AuthState = {
                ...initialState,
                loading: true,
                error: false
            }
            expect(authReducer.auth(initialState, {type: authAction.logoutUser.pending.type})).toEqual(expectedState)
        }   )
        //rejected
        test('should call logout method and return state with error true', () => {
            const initialState: AuthState = {
                responseUtenteLogin: undefined,
                loading: false,
                error: false
            }
            const expectedState: AuthState = {
                ...initialState,
                error: true,
                loading: false
            }
            expect(authReducer.auth(initialState, {type: authAction.logoutUser.rejected.type})).toEqual(expectedState)
        }   )
        //fulfilled
        test('should call logout method and return state with responseUtenteLogin undefined', () => {
            const initialState: AuthState = {
                responseUtenteLogin: {
                    jwtToken: 'token',
                    utente: {
                        nome: 'nome',
                        cognome: 'cognome',
                        username: 'username',
                    }
                },
                loading: false,
                error: false
            }
            const expectedState: AuthState = {
                ...initialState,
                responseUtenteLogin: undefined,
            }
            expect(authReducer.auth(initialState, {type: authAction.logoutUser.fulfilled.type})).toEqual(expectedState)
        }   )

})
