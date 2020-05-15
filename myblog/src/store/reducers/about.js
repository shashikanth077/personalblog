import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    about: [],
    loading: false,
};

const fetchAboutStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchAboutSuccess = ( state, action ) => {
    return updateObject( state, {
        about: action.about,
        loading: false
    } );
};

const fetchAboutFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_ABOUT_START: return fetchAboutStart( state, action );
        case actionTypes.FETCH_ABOUT_SUCCESS: return fetchAboutSuccess( state, action );
        case actionTypes.FETCH_ABOUT_FAIL: return fetchAboutFail( state, action );
        default: return state;
    }
};

export default reducer;