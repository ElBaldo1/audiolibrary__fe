import React from 'react';

import './Datepicker.css';
import {Form} from 'react-bootstrap';

// questa interfaccia è usata per definire i tipi di metodi che il componente riceve
export interface DatePickerProps {
    onChangeDate: (date: string) => void;
}

// questo componente riceve una funzione onChangeDate che viene invocata quando viene selezionata una data
function DatePicker (props: DatePickerProps) {
    const [date, setDate] = React.useState('');
    const {onChangeDate}=props;

    const onChange = (evt: { target: { value: string; }; }) => {
        const s = evt.target.value.trim();
        setDate(s);
        onChangeDate(s);
    }

    return (
        <div className="row">
            <Form.Group>
                <Form.Control onChange={onChange} value={date} type="date" name="dob" placeholder="Date of Birth"/>
            </Form.Group>
        </div>
    );
}

export default DatePicker;

