import * as actionTypes from './actionTypes';
import axios from '../../utility/axios';

export const fetchBlogStart = () => {
    return {
        type: actionTypes.FETCH_BLOG_DETAILS_START
    };
};

export const fetchBlogSuccess = ( personaldata ) => {
    return {
        type: actionTypes.FETCH_BLOG_DETAILS_SUCCESS,
        blogdetails: personaldata
    };
};

export const fetchBlogFail = ( error ) => {
    return {
        type: actionTypes.FETCH_BLOG__DETAILS_FAIL,
        error: error
    };
};

export const fetchblogDetails = (orderId) => {
    return dispatch => {
        dispatch(fetchBlogStart());
        axios.get('/getBlogDetails/'+orderId)
            .then( res => {
                dispatch(fetchBlogSuccess(res.data.results));
            } )
            .catch( err => {
                dispatch(fetchBlogFail(err));
            } );
    };
};
