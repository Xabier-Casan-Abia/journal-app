import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { activeNote, deleteNoteFirebase } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const { active: note } = useSelector( state => state.notes );
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title, id } = formValues;

    const activeID = useRef(note.id);
    const dispatch = useDispatch();

    //Handle note change
    useEffect(() => {
        
        if ( note.id !== activeID.current ) {
            reset( note );
            activeID.current = note.id
        }

    }, [note, reset])

    //Change state of the active note
    useEffect(() => {
        
        dispatch(activeNote(formValues.id, { ...formValues}))

    }, [formValues, dispatch])

    const handleDelete = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          })
          .then((result) => {

            if (result.isConfirmed) {
                dispatch(deleteNoteFirebase(id));
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    };

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    autoFocus
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                />

                {
                    note.url &&
                    <div className="notes__image">
                        <img 
                           src={ note.url }
                           alt="imagen"
                        />
                    </div>
                }     

            </div>

            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>    

        </div>
    )
}
