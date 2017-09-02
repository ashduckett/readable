import axios from 'axios'

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_LATEST_POST = 'FETCH_LATEST_POST'
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const POST_TO_SAVE_UPDATED = 'POST_TO_SAVE_UPDATED'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'

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
    
    axiosInstance.post('/posts', {
        id: post.id,
        timestamp: Date.now(),
        title: post.title,
        body: post.body,
        owner: post.owner,
        category: post.category
    });

    return {
        type: ADD_POST,
        payload: post
    }
}

export function deletePost(post) {

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5001/',
        timeout: 1000,
        headers: { 'Authorization': 'whatever-you-want' }
    })

    axiosInstance.delete('/posts/' + post.id);

    return {
        type: DELETE_POST,
        payload: post
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

// Redux way of doing the form.

// You enter data into the form.
// You need that data stored onChange().
// How about an updatePostToSave() method?
// Then, when you hit save, you could call save passing in the connected-to-the-modal post?