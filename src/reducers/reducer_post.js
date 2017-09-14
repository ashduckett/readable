import { FETCH_LATEST_POST, UPDATE_POST, UPVOTE_POST, DOWNVOTE_POST, FETCH_POST_BY_ID } from '../actions/index'

// This one needs to deal with UPDATE_POST
export default function(state = null, action) {
     switch(action.type) {
        case FETCH_LATEST_POST:
            // I think the votescore comes back as 1 by default so we should present that
            return {
                ...action.payload,
                voteScore: action.payload.voteScore ? action.payload.voteScore : 1
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
    }
    return state
}