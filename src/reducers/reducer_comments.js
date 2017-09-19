import { FETCH_COMMENTS, ADD_COMMENT, COMMIT_COMMENT_EDIT } from '../actions/types'

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_COMMENTS:

            // We want to return all the comments
            return action.payload.data
            
        case ADD_COMMENT:
            return [...state, action.payload]
        case COMMIT_COMMENT_EDIT:

            return state.map((comment) => {
                if(comment.id === action.payload.id) {
                    return action.payload
                } else {
                    return comment
                }
            })

    }
    return state
}

