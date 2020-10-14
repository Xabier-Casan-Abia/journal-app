import { db } from "../firebase/firebaseConfig"

export const loadNotes = async (uid) => {

    const notesSnap = await db.collection(`${uid}/journal/notes`).orderBy("date", "desc").get();
    
    let notes = []

    notesSnap.forEach(snap => {
        notes.push({
            id: snap.id,
            ...snap.data()
        })
    });

    return notes
};