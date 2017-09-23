import { FETCH_COMMENTS, ADD_COMMENT, COMMIT_COMMENT_EDIT, COMMENT_DELETED, UPVOTE_COMMENT, DOWNVOTE_COMMENT } from '../actions/types'

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_COMMENTS:
            console.log(action.payload.data)
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
        case COMMENT_DELETED:
            if(action.payload !== undefined) {
                return state.filter((comment) => {
                    return comment.id !== action.payload;
                })
            } else {
                return state
            }
        case UPVOTE_COMMENT:
            return state.map((comment) => {
                if(comment.id === action.payload) {
                    return {
                        ...comment,
                        voteScore: ++comment.voteScore
                    } 
                } else {
                    return comment
                }
                
            })

        case DOWNVOTE_COMMENT:
            return state.map((comment) => {
                if(comment.id === action.payload) {
                    return {
                        ...comment,
                        voteScore: --comment.voteScore
                    } 
                } else {
                    return comment
                }
                
            })


    }
    return state
}

