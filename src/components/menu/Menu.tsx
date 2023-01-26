import React from 'react';
import Button from 'react-bootstrap/Button';
import {useSelector} from 'react-redux';
import {audiolibroSelector} from 'store/audiolibro/audiolibro.selector';
import {PageType} from 'store/audiolibro/types';
import {useAppDispatch} from 'store/store.config';
import {audiolibroAction} from 'store/audiolibro/audiolibro.action';



function Menu () {
    const dispatch = useAppDispatch();
    const pageType = useSelector(audiolibroSelector.page);

    return (
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Button style={{borderRadius: '5px',marginRight:'5px'}} variant={pageType === PageType.HOMEPAGE ? "secondary" : "warning"} onClick={()=> {
                        dispatch(audiolibroAction.getAudiobooksbyUserList())
                    }}>Home</Button>
                </li>
                <li className="nav-item">
                    <Button style={{borderRadius: '5px',marginRight:'5px'}}  variant={pageType === PageType.FAVOURITEPAGE ? "secondary" : "warning"}    onClick={()=> {
                        dispatch(audiolibroAction.getFavuoritesAudiobookByUserList())
                    }}>Favourite</Button>
                </li>
                <li className="nav-item">
                    <Button style={{borderRadius: '5px'}}  variant={pageType === PageType.NETWORKPAGE ? "secondary" : "warning"} onClick={()=> {
                        dispatch(audiolibroAction.getPublicAudiobookList())
                    }}>Network</Button>
                </li>
            </ul>
        </div>
    );
}

export default Menu;
