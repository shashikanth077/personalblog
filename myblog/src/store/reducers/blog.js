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
        blog: action.blog,
        loading: false
    } );
};

const fetchBlogFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_BLOG_START: return fetchBlogStart( state, action );
        case actionTypes.FETCH_BLOG_SUCCESS: return fetchBlogSuccess( state, action );
        case actionTypes.FETCH_BLOG_FAIL: return fetchBlogFail( state, action );
        default: return state;
    }
};

export default reducer;