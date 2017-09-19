import { CHANGE_SORT_ORDER } from '../actions/types'

// Sort by Vote Score by default
export default function(state = 'Vote Score', action) {
    switch(action.type) {
        case CHANGE_SORT_ORDER:
            return action.payload
        default:
            return state;
    }
}