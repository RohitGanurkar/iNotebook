// here we are using noteContext

import NoteContext from "./noteContext";
import { useState } from 'react'


const NoteState = (props) => {
    const noteinitial = []
    const url = "http://localhost:5000" ;

    // State for notes
    const [notes, setnotes] = useState(noteinitial);
      
    const fetchAllNotes = async () => {
      const response = await fetch(`${url}/api/note/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1ZGU2YmFiMDgzZjBjOWMzYzE5ZTE0In0sImlhdCI6MTYzMzU0MzkwMn0.Pdb98-804Qj0hyKSV6MYYQJn9WGu8t1w-viNXE35ilQ"
        }
      });
      const json = await response.json();
      setnotes(json);
    }


      // Add a Note
      const addNote = ({title , description , tag}) =>{
        // TODO : API CALL
        let note = {
          "_id": "615fe8a69e4a769928dfedd2e",
          "user": "615de6bab083f0c9c3c19e14",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2021-10-08T06:43:50.655Z",
          "__v": 0
        }
        setnotes(notes.concat(note))
      }

      // Update a Note
      const updateNote = (id) =>{
        
      }
      
      // Delete a Note
      const deleteNote = async(id) =>{
        // id NoteItem se aa rhi hai 
        console.log(id)
        const response = await fetch(`${url}/api/note/deletenotes/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1ZGU2YmFiMDgzZjBjOWMzYzE5ZTE0In0sImlhdCI6MTYzMzU0MzkwMn0.Pdb98-804Qj0hyKSV6MYYQJn9WGu8t1w-viNXE35ilQ"
          }
        });
        const json = await response.json();
        console.log(json)
      }
    
    return(
        // value me hame jo jo bhejna hai bhej skte hai
        <NoteContext.Provider value={{ notes, fetchAllNotes , addNote ,updateNote ,deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

// ye App.js me use hogi  // sabhi ko <NoteState> rape karenge
export default NoteState ;
