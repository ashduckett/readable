import { FETCH_LATEST_POST, UPDATE_POST, UPVOTE_POST, DOWNVOTE_POST, FETCH_POST_BY_ID } from '../actions/types'

// This one needs to deal with UPDATE_POST
export default function(state = null, action) {
    switch(action.type) {
        
        case FETCH_LATEST_POST:
            return {
                ...action.payload,
                voteScore: action.payload.voteScore === undefined ? 1 : action.payload.voteScore
            }
        case UPDATE_POST:
            return {
                ...state,
                title: action.payload.title,
                body: action.payload.body,
            }
        case UPVOTE_POST:
            return {
                ...state,
                voteScore: state.voteScore + 1
            }

        case DOWNVOTE_POST:
            return {
                ...state,
                voteScore: state.voteScore - 1
            }
        case FETCH_POST_BY_ID:
            return {
                ...action.payload.data
            }
        default:
            return state
    }
}