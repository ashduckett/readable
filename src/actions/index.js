import axios from 'axios'

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_LATEST_POST = 'FETCH_LATEST_POST'
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const POST_TO_SAVE_UPDATED = 'POST_TO_SAVE_UPDATED'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const POST_TO_SAVE_EDITED = 'POST_TO_SAVE_EDITED'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT_INSTIGATED = 'EDIT_COMMENT_INSTIGATED'
export const COMMIT_COMMENT_EDIT = 'COMMIT_COMMENT_EDIT'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER'
export const CHANGE_CATEGORY_FILTER = 'CHANGE_CATEGORY_FILTER'
export const COMMENT_TO_SAVE_UPDATED = 'COMMENT_TO_SAVE_UPDATED'
export const FETCH_POST_BY_ID = 'FETCH_POST_BY_ID'

export function fetchPosts() {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5001/',
        timeout: 1000,
        headers: { 'Authorization': 'whatever-you-want' }
    })

    const request = axiosInstance.get('/posts');
    
    return {
        type: FETCH_POSTS,
        payload: request
    }
}

export function fetchPost(post) {
    return {
        type: FETCH_LATEST_POST,
        payload: post
    }
}

export function fetchPostById(id) {
 
    // GET /posts/:id	

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5001/',
        timeout: 1000,
        headers: { 'Authorization': 'whatever-you-want' }
    })
    // e7d665f0-989b-11e7-b4c0-1f675453603d
    const request = axiosInstance.get('/posts/' + id);
 
    return {
        type: FETCH_POST_BY_ID,
        payload: request
    }
}

export function fetchComments(postId) {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5001/',
        timeout: 1000,
        headers: { 'Authorization': 'whatever-you-want' }
    })

    const request = axiosInstance.get('/posts/' + postId + '/comments');

    return {
        type: FETCH_COMMENTS,
        payload: request
    }
}

export function fetchCategories() {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5001/',
        timeout: 1000,
        headers: { 'Authorization': 'whatever-you-want' }
    })

    const request = axiosInstance.get('/categories');

    return {
        type: FETCH_CATEGORIES,
        payload: request
    }
}

export function addPost(post) {

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5001/',
        timeout: 1000,
        headers: { 'Authorization': 'whatever-you-want' }
    })

    const uuidv1 = require('uuid/v1');
    post.id = uuidv1();

    // API is not as Udacity specified.
    post.author = post.owner
    const request = axiosInstance.post('/posts', {
        id: post.id,
        timestamp: Date.now(),
        title: post.title,
        body: post.body,
        owner: post.owner,
        author: post.author,
        category: post.category
    });

    return {
        type: ADD_POST,
        payload: post,
        request
    }
}

export function deletePost(post) {

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5001/',
        timeout: 1000,
        headers: { 'Authorization': 'whatever-you-want' }
    })

    const request = axiosInstance.delete('/posts/' + post.id);

    return {
        type: DELETE_POST,
        payload: post,
        request
    }
}

// What do we need in order to make the edit? Check out the end point's parameters.
// Apparently we'll need the post id, the new body and the new title.
// The other stuff must remain the same.

// How would you like to call this?

// This function should recieve a post. The old id
// should remain, but the body and title should have been updated.
export function editPost(post, title, body) {

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5001/',
        timeout: 1000,
        headers: { 'Authorization': 'whatever-you-want' }
    })

    
    const request = axiosInstance.put('/posts/' + post.id, {
        body: body,
        title: title
    })

    post.title = title
    post.body = body

    // We return the post so we can update the data.
    return {
        type: UPDATE_POST,
        payload: post,
        request
    }

}

// At this point assume new post
export function updatePostToSave(field, value) {
    return {
        type: POST_TO_SAVE_UPDATED,
        field: field,
        value: value
    }
}

// This one should fire when the edit button is pressed on a post
export function editPostToSave(post) {
    return {
        type: POST_TO_SAVE_EDITED,
        payload: post
    }
}

// Redux way of doing the form.

// You enter data into the form.
// You need that data stored onChange().
// How about an updatePostToSave() method?
// Then, when you hit save, you could call save passing in the connected-to-the-modal post?

export function commentToSaveEdited(fieldName, value, parentId) {

    // In this case there's no request. We're just passing through the comment to
    // the reducers. In the case of our reducer_comment_to_save reducer, we'll
    // return the state so we can have an updated version of the entire
    // comment. Purpose? Validation. Plus we always have one version of the truth for the comment
    // currently being created or edited.
    return {
        type: COMMENT_TO_SAVE_UPDATED,
        fieldName,
        value,
        parentId
    }
}

export function postToSaveEdited(fieldName, fieldValue) {
    return {
        type: POST_TO_SAVE_UPDATED,
        fieldName,
        fieldValue
    }
}

// Assume it's a new comment for now so don't use an id
export function addComment(comment) {

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5001/',
        timeout: 1000,
        headers: { 'Authorization': 'whatever-you-want' }
    })

    const uuidv1 = require('uuid/v1');
    
    let id = uuidv1();

    const request = axiosInstance.post('/comments', {
        id: id,
        timestamp: Date.now(),
        body: comment.body,
        author: comment.author,
        parentId: comment.parentId
    }).then(function(data) {

    });

    return {
        type: ADD_COMMENT,
        payload: comment,
        request
    }
}

export function editCommentInstigated(comment) {
    return {
        type: EDIT_COMMENT_INSTIGATED,
        payload: comment
    }
}

export function editCommentCommitted(comment) {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5001/',
        timeout: 1000,
        headers: { 'Authorization': 'whatever-you-want' }
    })
    
    const request = axiosInstance.put('/comments/' + comment.id, {
        body: comment.body,
        timestamp: Date.now()
    })

    return {
        type: COMMIT_COMMENT_EDIT,
        payload: comment,
    }
}

export function upVotePost(id) {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5001/',
        timeout: 1000,
        headers: { 'Authorization': 'whatever-you-want' }
    })

    const request = axiosInstance.post('/posts/' + id, {
        option: 'upVote'
    });

    return {
        type: UPVOTE_POST,
        payload: id,
        request
    }
}

export function downVotePost(id) {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5001/',
        timeout: 1000,
        headers: { 'Authorization': 'whatever-you-want' }
    })

    const request = axiosInstance.post('/posts/' + id, {
        option: 'downVote'
    });

    return {
        type: DOWNVOTE_POST,
        payload: id,
        request
    }
}

export function changeSortOrder(sortOrder) {
    console.log('changeSortOrder action called')
    return {
        type: CHANGE_SORT_ORDER,
        payload: sortOrder
    }
}

export function changeCategoryFilter(categoryFilter) {
    console.log('cat filter action called')
    return {
        type: CHANGE_CATEGORY_FILTER,
        payload: categoryFilter
    }
}

