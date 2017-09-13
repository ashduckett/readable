import { FETCH_LATEST_POST, UPDATE_POST, UPVOTE_POST, DOWNVOTE_POST } from '../actions/index'

// This one needs to deal with UPDATE_POST
export default function(state = null, action) {
     switch(action.type) {
        case FETCH_LATEST_POST:
        console.log('fetch latest post called!')
        console.log(action.payload)
        // Update this to use the old state combined with the new state...
            // do I have to? The new state is totally different?
            return action.payload
        case UPDATE_POST:
            console.log('update post called!')
            return {
                ...state,
                title: action.payload.title,
                body: action.payload.body,
            }
        case UPVOTE_POST:
            console.log('upvoting post')

            return {
                ...state,
                voteScore: state.voteScore + 1
            }

        case DOWNVOTE_POST:
        return {
            ...state,
            voteScore: state.voteScore - 1
        }

    }
    
    return state
}