import * as actionTypes from './actionTypes';
import axios from '../../utility/axios';

export const fetchServicesStart = () => {
    return {
        type: actionTypes.FETCH_SERVICES_START
    };
};

export const fetchServicesSuccess = ( personaldata ) => {
    return {
        type: actionTypes.FETCH_SERVICES_SUCCESS,
        services: personaldata
    };
};

export const fetchServicesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_SERVICES_FAIL,
        error: error
    };
};

export const fetchServices = () => {
    return dispatch => {
        dispatch(fetchServicesStart());
        axios.get( '/getServices' )
            .then( res => {
                dispatch(fetchServicesSuccess(res.data.results));
            } )
            .catch( err => {
                dispatch(fetchServicesFail(err));
            } );
    };
};
