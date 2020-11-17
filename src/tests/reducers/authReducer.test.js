import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';


describe('Tests in authReducer', () => {
    
    test('should login', () => {

        const initState = {};

        const action = {
            type: types.login,
            payload: {
                uid: '000',
                displayName: 'Xabi'
            }
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual({
            uid: '000',
            displayName: 'Xabi'
        })

        
    })

    test('should logout', () => {

        const initState = {
            uid: 'jagdfjahdsf127362718',
            name: 'Xabi'
        };

        const action = {
            type: types.logout,
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual({});
 
    })

    test('should not make any changes', () => {

        const initState = {
            uid: 'jagdfjahdsf127362718',
            name: 'Xabi'
        };

        const action = {
            type: 'Unvalid type',
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual( initState );
 
    })
    

})
