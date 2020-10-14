import React from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { saveNote, uploadImage } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active:note } = useSelector( state => state.notes );
    const newDate = moment(new Date().getTime());
    
    const handleSave = () => {
        dispatch(saveNote(note))
    };

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            dispatch(uploadImage(file))
        }
    };

    return (
        <div className="notes__appbar">
            <span>{ newDate.format('D MMMM YYYY') }</span>

            <input
                id='fileSelector'
                type='file'
                name='file'
                style={{display: 'none'}}
                onChange={ handlePictureChange }
            />

            <div>
                <button
                    className="btn"
                    onClick={ handlePictureClick }
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
