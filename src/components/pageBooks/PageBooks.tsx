import {getToken} from 'api/utils';
import AudiobooksList from 'components/Audiobooks/AudiobooksList';
import {Spinner} from 'components/spinner/spinner';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {audiolibroAction} from 'store/audiolibro/audiolibro.action';
import {authSelector} from 'store/authentication/auth.selector';
import {audiolibroSelector} from 'store/audiolibro/audiolibro.selector';
import {useAppDispatch} from 'store/store.config';


// questo componente serve per capire la lista di audiolibri
function PageBooks () {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useSelector(authSelector.loading);
    const checkAuth=useSelector(authSelector.userLogged);
    const loadindPages=useSelector(audiolibroSelector.loading);
    useEffect(() => {
        if( !checkAuth || getToken()===null){
            navigate('/login');
        } else {
            dispatch(audiolibroAction.getAudiobooksbyUserList());
        }
    }, []);

    return (
        (!checkAuth || loadindPages) ? <></> :
        (loading) ? <Spinner/> :
            <div style={{width: "100%", padding:"0",margin:"0"}}>
                <AudiobooksList />
            </div>
    );
}

export default PageBooks;
