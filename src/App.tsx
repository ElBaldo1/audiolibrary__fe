import AddAudiobook from 'components/addAudiobook/AddAudiobook';
import Login from 'components/login/Login';
import ModificaUtente from 'components/modificaUtente/ModificaUtente';
import PageBooks from 'components/pageBooks/PageBooks';
import SignUp from 'components/signUp/SignUp';
import React from 'react';
import { Route,Routes} from 'react-router-dom';
import './App.css';

function App() {

    // qui viene gestito il routing dell'applicazione
    return (
        <>
            <Routes>
                <Route path="/" element={ <AddAudiobook/> } />
                <Route path="*" element={ <Login/> } />
                <Route path="login" element={ <Login/> } />
                <Route path="signUp" element={ <SignUp/> } />
                <Route path="home" element={<PageBooks/> }/>
                <Route path="addAudiobook" element={<AddAudiobook/> }/>
                <Route path="modificaUtente" element={<ModificaUtente/> }/>
            </Routes>
        </>
    );
}

export default App;
