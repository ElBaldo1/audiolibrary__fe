import {render, screen} from '@testing-library/react';
import Login from 'components/login/Login';
import React from 'react';
import {renderWithProviders} from "test/utils";


// questo è il test che per vedere se lo spinner viene caricato al login
describe('Login component', () => {

    test('it show spinner on list loading', () => {
        const initialState={
            auth: {
                loading: true,
                error: false
            }
        };
        render(renderWithProviders(<Login/>,initialState));
        expect(screen.getByTestId('spinnerLogin')).toBeInTheDocument();
        expect(screen.queryByTestId('authForm')).not.toBeInTheDocument();
    });

    test('it show auth form on list loading', () => {
        const initialState={
            auth: {
                loading: false,
                error: false
            }
        };
        render(renderWithProviders(<Login/>,initialState));
        expect(screen.getByTestId('authForm')).toBeInTheDocument();
        expect(screen.queryByTestId('spinnerLogin')).not.toBeInTheDocument();
    });
});
