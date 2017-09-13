import { CHANGE_CATEGORY_FILTER } from '../actions/index'

// Sort by Vote Score by default
export default function(state = 'None', action) {
    switch(action.type) {
        case CHANGE_CATEGORY_FILTER:
            return action.payload
        default:
            return state;
    }
}