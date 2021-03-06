import { types } from '../../types/types';

describe('Tests in types', () => {

    test('should have the appropriate types ', () => {

        expect( types ).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] logout',

            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',

            uiSartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',

            notesAddNew: '[Notes] New Entry',
            notesUpdate: '[Notes] Update Entry',
            notesDelete: '[Notes] Delete Entry',
            notesActive: '[Notes] Active Entry',
            notesLoad: '[Notes] Load Entries',
            notesFileURL: '[Notes] Update Image URL',
            notesLogoutCleaning: '[Notes] Logout Cleaning'
        })
        
    })
    
})
