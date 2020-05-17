import * as actionTypes from './actionTypes';
import axios from '../../utility/axios';

export const fetchBlogStart = () => {
    return {
        type: actionTypes.FETCH_BLOG_START
    };
};

export const fetchBlogSuccess = ( personaldata ) => {
    return {
        type: actionTypes.FETCH_BLOG_SUCCESS,
        blog: personaldata
    };
};

export const fetchBlogFail = ( error ) => {
    return {
        type: actionTypes.FETCH_BLOG_FAIL,
        error: error
    };
};

export const fetchblogs = () => {
    return dispatch => {
        dispatch(fetchBlogStart());
        axios.get( '/getBlogs' )
            .then( res => {
                dispatch(fetchBlogSuccess(res.data.results));
            } )
            .catch( err => {
                dispatch(fetchBlogFail(err));
            } );
    };
};
