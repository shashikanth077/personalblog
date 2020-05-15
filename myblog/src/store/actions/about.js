import * as actionTypes from './actionTypes';
import axios from '../../utility/axios';

export const fetchAboutStart = () => {
    return {
        type: actionTypes.FETCH_ABOUT_START
    };
};

export const fetchAboutSuccess = ( personaldata ) => {
    return {
        type: actionTypes.FETCH_ABOUT_SUCCESS,
        about: personaldata
    };
};

export const fetchAboutFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ABOUT_FAIL,
        error: error
    };
};

export const fetchabout = () => {
    return dispatch => {
        dispatch(fetchAboutStart());
        axios.get( '/getSkills' )
            .then( res => {
                dispatch(fetchAboutSuccess(res.data.results));
            } )
            .catch( err => {
                dispatch(fetchAboutFail(err));
            } );
    };
};
