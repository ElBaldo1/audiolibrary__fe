import React from 'react';
import Button from 'react-bootstrap/Button';
import {useAppDispatch} from 'store/store.config';
import {audiolibroAction} from 'store/audiolibro/audiolibro.action';

function Menu () {
    const dispatch = useAppDispatch();

    //questo comando serve per fare il dispatch di una action diversa in base alla pagina che si richiede (home/favourties/network)
    return (
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Button style={{borderRadius: '5px',marginRight:'5px'}} variant="warning" onClick={()=>dispatch(audiolibroAction.getAudiobooksbyUserList())}>Home</Button>
                </li>
                <li className="nav-item">
                    <Button style={{borderRadius: '5px',marginRight:'5px'}}  variant="warning" onClick={()=>dispatch(audiolibroAction.getFavuoritesAudiobookByUserList())}>Favourite</Button>
                </li>
                <li className="nav-item">
                    <Button style={{borderRadius: '5px'}}  variant="warning" onClick={()=>dispatch(audiolibroAction.getPublicAudiobookList())}>Network</Button>
                </li>
            </ul>
        </div>
    );
}

export default Menu;
