import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../actions/auth'
import { newNote } from '../../actions/notes'
import { JounalEntries } from './JounalEntries'

export const Sidebar = () => {

    const { displayName } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logoutUser());
    };

    const handleAddNewEntry = () => {
        dispatch(newNote())
    }

    return (
        <aside className="journal__sidebar">

            <div className="journal__sidebar-navbar">

                <h5>

                    <i className="far fa-user"/>
                    <span> { displayName } </span>
                    
                </h5>

                <button 
                    className="btn"
                    onClick={ handleLogOut }
                >
                    Logout
                </button>

            </div>

            <div 
                className="journal__new-entry"
                onClick={ handleAddNewEntry }
            >

                <i className="far fa-calendar-plus fa-5x"/>
                <p className="mt-5">New Entry</p>

            </div>

            <JounalEntries />

        </aside>
    )
}
