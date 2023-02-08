import {getToken} from 'api/utils';
import {RequestUtenteLogout} from 'model/requestDTO';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {authAction} from 'store/authentication/auth.action';
import {authSelector} from 'store/authentication/auth.selector';
import {useAppDispatch} from 'store/store.config';


// questo componente è un popup che viene mostrato quando l'utente clicca sul bottone logout
// il logout viene effettuato tramite una chiamata al server e se va a buon fine l'utente viene reindirizzato alla pagina di login
function Popup() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const utente =useSelector(authSelector.userLogged)
    const linkToModificaUtente = () => {
        navigate('/modificaUtente');
    }
    return (
        <>
            <Button style={{marginRight: '10px'}} variant="warning" onClick={linkToModificaUtente}>Utente
            </Button>
            <Button data-testid='buttonLogout' variant="warning" onClick={handleShow}>
                LOGOUT
            </Button>
            <Modal data-testid='popupLogout' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ciao {utente?.username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Sei sicuro di voler effettuare il logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={async () => {
                        handleClose();
                        let tokenUser: string = getToken();
                        const requestUtenteLogout: RequestUtenteLogout = {
                            jwtToken: tokenUser
                        }
                        await dispatch(authAction.logoutUser(requestUtenteLogout));
                        navigate('/login');
                    }}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Popup;
