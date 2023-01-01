import {renderWithProviders} from "../utils";
import SignUp from "../../components/signUp/SignUp";
import React from "react";
import {render, screen} from '@testing-library/react';


// qui viene testato il componente signup che non ha dipendenze con altri componenti e viene caricato immediatamente sempre
describe('Signup component', () => {

    test('should render the signup component', () => {
        render(renderWithProviders(<SignUp/>));
        expect(screen.queryByTestId('spinnerLoading')).not.toBeInTheDocument();
        expect(screen.queryByTestId('paginaVuota')).not.toBeInTheDocument();
        expect(screen.getByTestId('formSignup')).toBeInTheDocument();
    });

});
