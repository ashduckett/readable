import { FETCH_POSTS } from '../actions/index'
import { ADD_POST } from '../actions/index'
import { DELETE_POST } from '../actions/index'
// We will want to read this data instead of a static object
// but this reducer should be the full list of posts
export default function(state = [], action) {
    switch(action.type) {
        case FETCH_POSTS:
            let onlynondeleted = action.payload.data.filter((post) => post.deleted === false )
            return onlynondeleted
        case ADD_POST:
            console.log('returning')
            console.log([...state, action.payload])
            return [...state, action.payload]
        case DELETE_POST:
            return state.filter((post) => post.id !== action.payload.id)
    }
    
    return state
}

