import { FETCH_COMMENTS, PUSH_COMMENTS, ADD_COMMENT, COMMIT_COMMENT_EDIT, COMMENT_DELETED, UPVOTE_COMMENT, DOWNVOTE_COMMENT } from '../actions/types'


// The state here will be an big array of comments

export default function(state = [], action) {
    switch(action.type) {
        case ADD_COMMENT:
            return [...state, action.payload]
       
        default:
            return state
    }
}
