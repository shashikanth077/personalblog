import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    contact: false,
    loading: false,
};

const fetchContactStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchContactSuccess = ( state, action ) => {
    return updateObject( state, {
        contact: action.contact,
        loading: false
    } );
};

const fetchContactFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_CONTACT_START: return fetchContactStart( state, action );
        case actionTypes.FETCH_CONTACT_SUCCESS: return fetchContactSuccess( state, action );
        case actionTypes.FETCH_CONTACT_FAIL: return fetchContactFail( state, action );
        default: return state;
    }
};

export default reducer;