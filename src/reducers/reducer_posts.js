import { FETCH_POSTS, ADD_POST, DELETE_POST, UPDATE_POST } from '../actions/index'

// We will want to read this data instead of a static object
// but this reducer should be the full list of posts
export default function(state = [], action) {
    switch(action.type) {
        case FETCH_POSTS:
            let onlynondeleted = action.payload.data.filter((post) => post.deleted === false )
            return onlynondeleted
        case ADD_POST:
            return [...state, action.payload]
        case DELETE_POST:
            return state.filter((post) => post.id !== action.payload.id)
        case UPDATE_POST:
            let something = state.map((post) => {
                if(post.id === action.payload.id) {
                    return {
                        ...post,
                        title: action.payload.title,
                        body: action.payload.body
                    }
                } else {
                    return post
                }
            })

            return something
    }
    
    return state
}

