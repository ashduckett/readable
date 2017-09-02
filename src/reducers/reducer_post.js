import { FETCH_LATEST_POST } from '../actions/index'

export default function(state = null, action) {
     switch(action.type) {
        case FETCH_LATEST_POST:
            return action.payload

    }
    
    return state
}