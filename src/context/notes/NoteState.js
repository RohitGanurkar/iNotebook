// here we are using noteContext

import NoteContext from "./noteContext";
import { useState } from 'react'


const NoteState = (props) => {
    const noteinitial = [
        {
          "_id": "615de73bb083f0c9c3c19e1b",
          "user": "615de6bab083f0c9c3c19ef14",
          "title": "hello im rahul",
          "description": "this is a react application ",
          "tag": "persnol",
          "date": "2021-10-06T18:13:15.370Z",
          "__v": 0
        },
        {
          "_id": "615fe8a69e4a769928dedd2e",
          "user": "615de6bab083f0c9c3c19e14",
          "title": "hello im Rahul",
          "description": "this is my second note ",
          "tag": "persnol",
          "date": "2021-10-08T06:43:50.655Z",
          "__v": 0
        },
        {
          "_id": "615de73bb083f0fc9c3c19e1b",
          "user": "615de6bab083f0c9c3c19e14",
          "title": "hello im rahul",
          "description": "this is a react application ",
          "tag": "persnol",
          "date": "2021-10-06T18:13:15.370Z",
          "__v": 0
        },
        {
          "_id": "615fe8a69e4a769928defdd2e",
          "user": "615de6bab083f0c9c3c19e14",
          "title": "hello im Rahul",
          "description": "this is my second note ",
          "tag": "persnol",
          "date": "2021-10-08T06:43:50.655Z",
          "__v": 0
        },
        {
          "_id": "615de73bb08f3f0c9c3c19fe1b",
          "user": "615de6bab083f0c9c3c19e14",
          "title": "hello im rahul",
          "description": "this is a react application ",
          "tag": "persnol",
          "date": "2021-10-06T18:13:15.370Z",
          "__v": 0
        },
        {
          "_id": "615fe8a69e4a769928dfedd2e",
          "user": "615de6bab083f0c9c3c19e14",
          "title": "hello im Rahul",
          "description": "this is my second note ",
          "tag": "persnol",
          "date": "2021-10-08T06:43:50.655Z",
          "__v": 0
        }
      ]

      const [notes, setnotes] = useState(noteinitial);
      
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
      const deleteNote = (id) =>{
        // id NoteItem se aa rhi hai 
        const filterNotes = notes.filter((items)=>{return items._id !== id});
        setnotes(filterNotes);
      }
    
    return(
        // value me hame jo jo bhejna hai bhej skte hai
        <NoteContext.Provider value={{ notes, addNote ,updateNote ,deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

// ye App.js me use hogi  // sabhi ko <NoteState> rape karenge
export default NoteState ;
