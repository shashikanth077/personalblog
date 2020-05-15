import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    services: [],
    loading: false,
};

const fetchServicesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchServicesSuccess = ( state, action ) => {
    return updateObject( state, {
        services: action.services,
        loading: false
    } );
};

const fetchServicesFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_SERVICES_START: return fetchServicesStart( state, action );
        case actionTypes.FETCH_SERVICES_SUCCESS: return fetchServicesSuccess( state, action );
        case actionTypes.FETCH_SERVICES_FAIL: return fetchServicesFail( state, action );
        default: return state;
    }
};

export default reducer;