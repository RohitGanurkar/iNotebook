import React from 'react'
import { useContext, useState } from 'react';
import NoteContext from "../context/notes/noteContext";

export default function AddNote() {
    // FOR use noteContext :- NoteState se sab yha aa jata hai fir use use kar skte hai
    const getContext = useContext(NoteContext);
    const { addNote } = getContext;

    // temprery state for only this Componet
    const [note, setNote] = useState({title:"",description:"",tag:""})

    // when submit btn clicked
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note)
    }

    // to track Input filed
    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value})
    }
    
    return (
        <div>
            <div className="container my-3">
            <h2>Add a Note </h2>
            <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name="title" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" >Descrition</label>
                <input type="text" className="form-control" id="description"  name="description" onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" >Tag</label>
                <input type="text" className="form-control" id="tag"  name="tag" onChange={onChange}/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
            </div>
        </div>
    )
}
