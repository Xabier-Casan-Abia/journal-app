import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

//Sync
export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id, 
        ...note
    }
});

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const refreshNote = (id, note) => ({
    type: types.notesUpdate,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

//Async
export const newNote = () => {
    return async (dispatch, getState) =>  {

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        let docRef

        try {
            docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
        } catch (error) {
            console.log(error);
        }

        dispatch(activeNote(docRef.id, newNote));
        dispatch(addNewNote(docRef.id, newNote));
    }
};

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
};

export const saveNote = (note) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        if(!note.url) {
            delete note.url;
        }

        const newNote = { ...note};
        delete newNote.id;

        try {
            await db.doc(`${uid}/journal/notes/${note.id}`).update(newNote)
        } catch (error) {
            console.log(error);
        }
 
        Swal.fire('Saved', note.title, 'success');
        dispatch(refreshNote(note.id, newNote))
    }
};

export const uploadImage = (file) => {
    return async(dispatch, getState) => {

        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            willOpen: () => {
                Swal.showLoading()
            }
        });

        const fileURL = await fileUpload(file);
        activeNote.url = fileURL;

        // dispatch(saveNote(activeNote))

        Swal.close();
    }
};

export const deleteNoteFirebase = (id ) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth; 

        try {
            await db.doc(`${uid}/journal/notes/${id}`).delete();
        } catch (error) {
            console.log(error);
        }

        dispatch(deleteNote(id));
    }
};