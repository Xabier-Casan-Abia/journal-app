import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../actions/auth'
import { JounalEntries } from './JounalEntries'

export const Sidebar = () => {

    const { displayName } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logoutUser());
    };

    return (
        <aside className="journal__sidebar">

            <div className="journal__sidebar-navbar">

                <h3>

                    <i className="far fa-moon"/>
                    <span> { displayName } </span>
                    
                </h3>

                <button 
                    className="btn"
                    onClick={ handleLogOut }
                >
                    Logout
                </button>

            </div>

            <div className="journal__new-entry">

                <i className="far fa-calendar-plus fa-5x"/>
                <p className="mt-5">New Entry</p>

            </div>

            <JounalEntries />

        </aside>
    )
}
