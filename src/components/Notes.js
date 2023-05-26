import React from 'react';
import Note from './Note';
const Notes = ({notes}) => {
    if(!notes){
        return null
    }
    return (

        <ul>
            {notes.map(note=><Note key={note.id} note={note}/>)}
        </ul>
            
        );
    }
   


export default Notes;
