import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

export default function Alert(props) {
    // FOR use noteContext :- NoteState se sab yha aa jata hai fir use use kar skte hai
    const getContext = useContext(NoteContext);
    const { alert } = getContext;

    return (
        <div style={{height: "40px"}}>
            {alert && <div className={`alert alert-${alert.type}`} role="alert" >
            {alert.massage}
            </div>}
        </div>
    )
}
