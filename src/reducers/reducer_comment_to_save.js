import { COMMENT_TO_SAVE_UPDATED, EDIT_COMMENT_INSTIGATED } from '../actions/types'

// Default return
const dummyReturn = {
    id: '',
    parentId: '',
    timestamp: '',
    body: '',
    author: '',
    voteScore: '',
    deleted: false,
    parentDeleted: false
}

export default function(state = dummyReturn, action) {
    switch(action.type) {
        // This fires when text is changed on form entry.
        case COMMENT_TO_SAVE_UPDATED:
            return {
                ...state,
                timestamp: Date.now(),
                [action.fieldName]: action.value,
                parentId: action.parentId,
                voteScore: 0
            }

            case EDIT_COMMENT_INSTIGATED:
                return {
                    ...action.payload
                }

            default:
                return state
    }
}

