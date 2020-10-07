import React from 'react'
import { JournalEntry } from './JournalEntry'

export const JounalEntries = () => {

    const entries = [ 1, 2, 3, 4, 5, 6]

    return (
        <div className="journal__entries">
            
            {
                entries.map(entry => 
                    <JournalEntry key={ entry }/>
                )
            }

        </div>
    )
}
