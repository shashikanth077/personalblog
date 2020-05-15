import * as actionTypes from './actionTypes';
import axios from '../../utility/axios';

export const fetchcontactStart = () => {
    return {
        type: actionTypes.FETCH_CONTACT_START
    };
};

export const fetchcontactSuccess = ( personaldata ) => {
    return {
        type: actionTypes.FETCH_CONTACT_SUCCESS,
        contact: personaldata
    };
};

export const fetchcontactFail = ( error ) => {
    return {
        type: actionTypes.FETCH_CONTACT_FAIL,
        error: error
    };
};

export const InsertContact = (contactData) => {
    return dispatch => {
        dispatch(fetchcontactStart());
        axios.post( '/insertContact', contactData )
            .then( res => {
                dispatch(fetchcontactSuccess(res.data.results));
            } )
            .catch( err => {
                dispatch(fetchcontactFail(err));
            } );
    };
};
