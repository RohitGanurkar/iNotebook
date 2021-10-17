// here we are using noteContext

import NoteContext from "./noteContext";
import { useState } from 'react'


const NoteState = (props) => {
    const noteinitial = []
    const url = "http://localhost:5000" ;

    // State for notes
    const [notes, setnotes] = useState(noteinitial);
      
    // Fetch all Notes
    const fetchAllNotes = async () => {
      const response = await fetch(`${url}/api/note/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setnotes(json);
    }


      // Add a Note
      const addNote = async ({title , description , tag}) =>{
        // AddNote component using this addNote function
        const responses = await fetch(`${url}/api/note/addnotes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,tag})
        });
        const json = await responses.json();
        setnotes(notes.concat(json))
      }

      // Update a Note
      const updateNote = async(id, title , description , tag) =>{
        const responses = await fetch(`${url}/api/note/updatenotes/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,tag})
        });
        const json = await responses.json();
        console.log(json)
      }
      
      // Delete a Note
      const deleteNote = async(id) =>{
        // id NoteItem se aa rhi hai 
        const response = await fetch(`${url}/api/note/deletenotes/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json();
        console.log(json)
      }

      const [alert, setAlert] = useState(null)
      const showAlert = (massage, type)=>{
        setAlert({
          massage, type
        })
        setTimeout(() => {
          setAlert(null)
        }, 2000);
      }
    
    return(
        // value me hame jo jo bhejna hai bhej skte hai
        <NoteContext.Provider value={{ notes, fetchAllNotes , addNote ,updateNote ,deleteNote , alert , showAlert}}>
            {props.children}
        </NoteContext.Provider>
    )
}

// ye App.js me use hogi  // sabhi ko <NoteState> rape karenge
export default NoteState ;
