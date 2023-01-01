import React from 'react';
import Button from 'react-bootstrap/Button';


// questa interfaccia è usata per definire i tipi di metodi che il componente riceve
export interface BackProps{
    onClick: ()=>void;
}


// questo è il componente che viene utlizzato per tornare indietro
function Back (props:BackProps) {
    const {onClick}=props;

    return (
        <Button variant="secondary" size="lg" onClick={onClick} >
            Back
        </Button>
    );
}

export default Back;
