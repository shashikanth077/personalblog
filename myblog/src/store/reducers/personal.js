import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    personal: [],
    loading: false,
};

const fetchPersonalStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchPersonalSuccess = ( state, action ) => {
    return updateObject( state, {
        personal: action.personal,
        loading: false
    } );
};

const fetchPersonalFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.PERSONAL_START: return fetchPersonalStart( state, action );
        case actionTypes.PERSONAL_SUCCESS: return fetchPersonalSuccess( state, action );
        case actionTypes.FAILED: return fetchPersonalFail( state, action );
        default: return state;
    }
};

export default reducer;