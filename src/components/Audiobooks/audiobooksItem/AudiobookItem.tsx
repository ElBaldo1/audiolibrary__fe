
import {getToken} from 'api/utils';
import {ResponseAudiolibro} from 'model/responseDTO';
import React, {useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import './AudiobooksItem.css'
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {authSelector} from 'store/authentication/auth.selector';

// questa interfaccia serve per specificare il tipo di oggetti che accetta il componente
export interface AudiobookItemProps {
    audiobooks: ResponseAudiolibro;
    onSelectAudiobook: (audiobook: ResponseAudiolibro) => void;
}

// questo componente mostra un singolo audiobook
function AudiobookItem (props: AudiobookItemProps) {
    const navigate=useNavigate();
    const checkAuth=useSelector(authSelector.userLogged);

    // controllo se l'utente è loggato e se non lo è lo reindirizzo alla pagina di login
    useEffect(() => {
        if( !checkAuth || getToken()===null){
            navigate('/login');
        }
    }, [])

const {audiobooks,onSelectAudiobook} = props;
return (
    <Card className={"carte"}  onClick={()=> {
        onSelectAudiobook(audiobooks);
    }}>
        <Card.Img className={"carteIMG"}  src={audiobooks.copertina} alt={audiobooks.titolo}
                  style={{borderRadius: '30px', marginTop: '10px'}}/>
        <Card.Body>
            <Card.Title>{audiobooks.titolo}</Card.Title>
            <Card.Text>
                Autore: {audiobooks.creatore.username}
            </Card.Text>
        </Card.Body>
    </Card>
);
}

export default AudiobookItem;
