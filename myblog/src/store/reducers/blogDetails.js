import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    blog: [],
    loading: false,
};

const fetchBlogStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchBlogSuccess = ( state, action ) => {
    return updateObject( state, {
        blogdetails: action.blogdetails,
        loading: false
    } );
};

const fetchBlogFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_BLOG_DETAILS_START: return fetchBlogStart( state, action );
        case actionTypes.FETCH_BLOG_DETAILS_SUCCESS: return fetchBlogSuccess( state, action );
        case actionTypes.FETCH_BLOG__DETAILS_FAIL: return fetchBlogFail( state, action );
        default: return state;
    }
};

export default reducer;