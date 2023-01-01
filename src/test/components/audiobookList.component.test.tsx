import {fireEvent, render, screen} from '@testing-library/react';
import AudiobooksList from 'components/Audiobooks/AudiobooksList';
import React from "react";
import { getAuthStateStub, getPagesStub} from 'test/stub';
import {renderWithProviders} from 'test/utils';
import AddAudiobook from "../../components/addAudiobook/AddAudiobook";


describe('AudiobookList Component', () => {
    test('it show spinner on list loading', () => {
        const initialState = {
            pages: getPagesStub({loading: true}),
            auth: getAuthStateStub()
        }
        render(renderWithProviders(<AudiobooksList/>, initialState));
        expect(screen.getByTestId('spinnerLoading')).toBeInTheDocument();
    });

    test('it show the page without nothing if the users is not authenticated', () => {
        const initialState = {
            pages: getPagesStub(),
            auth: getAuthStateStub({responseUtenteLogin: undefined})
        }
        render(renderWithProviders(<AudiobooksList/>, initialState));
        expect(screen.queryByTestId('spinnerLoading')).not.toBeInTheDocument();
        expect(screen.getByTestId('paginaVuota')).toBeInTheDocument();
    });

    test('it show the audiobook list if the users is authenticated', () => {
        const initialState = {
            pages: getPagesStub(),
            auth: getAuthStateStub(),
        }
        render(renderWithProviders(<AudiobooksList/>, initialState));
        expect(screen.queryByTestId('spinnerLoading')).not.toBeInTheDocument();
        expect(screen.queryByTestId('paginaVuota')).not.toBeInTheDocument();
        expect(screen.getByTestId('audiobooksList')).toBeInTheDocument();
    });

    test('it  show the logout popup on click of button ', () => {
        const initialState = {
            pages: getPagesStub(),
            auth: getAuthStateStub(),
        }
        render(renderWithProviders(<AudiobooksList/>, initialState));
        fireEvent.click(screen.getByTestId('buttonLogout'));
        expect(screen.queryByTestId('spinnerLoading')).not.toBeInTheDocument();
        expect(screen.queryByTestId('paginaVuota')).not.toBeInTheDocument();
        expect(screen.getByTestId('popupLogout')).toBeInTheDocument();
    });

    test('it  show the form add audiobooks on click of button ', () => {
        const initialState = {
            pages: getPagesStub(),
            auth: getAuthStateStub(),
        }
        render(renderWithProviders(<AudiobooksList/>, initialState));
        render(renderWithProviders(<AddAudiobook/>, initialState));
        fireEvent.click(screen.getByTestId('buttonAggiuntaAudiobook'));
        expect(screen.queryByTestId('spinnerLoading')).not.toBeInTheDocument();
        expect(screen.queryByTestId('paginaVuota')).not.toBeInTheDocument();
        expect(screen.getByTestId('formAggiuntaAudiolibro')).toBeInTheDocument();
    });




    // click aggiungi audiolibro al clcik del button
    // dettagli audiolibro al click del componente
    // logut popup al click del button
});
