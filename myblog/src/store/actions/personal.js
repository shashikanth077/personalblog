import * as actionTypes from './actionTypes';
import axios from '../../utility/axios';

export const fetchPersonalStart = () => {
    return {
        type: actionTypes.PERSONAL_START
    };
};

export const fetchPersonalSuccess = ( personaldata ) => {
    return {
        type: actionTypes.PERSONAL_SUCCESS,
        personal: personaldata
    };
};

export const fetchPersonalFail = ( error ) => {
    return {
        type: actionTypes.FAILED,
        error: error
    };
};

export const fetchPersonal = () => {
    return dispatch => {
        dispatch(fetchPersonalStart());
        axios.get( '/getPersonalData' )
            .then( res => {
                dispatch(fetchPersonalSuccess(res.data.results));
            } )
            .catch( err => {
                dispatch(fetchPersonalFail(err));
            } );
    };
};
