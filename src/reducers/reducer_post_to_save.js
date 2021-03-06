import { POST_TO_SAVE_UPDATED, POST_TO_SAVE_EDITED } from '../actions/types'

// Default return
const dummyReturn = {
    category: 'None',
    title: '',
    owner: '',
    body: '',
    id: '',
}

// Reducer for postToSave
export default function(state = dummyReturn, action) {
    switch(action.type) {
        // This fires when text is changed on form entry.
        case POST_TO_SAVE_UPDATED:
            return {
                ...state,
                [action.fieldName]: action.fieldValue
            }

        case POST_TO_SAVE_EDITED:

            return {
                ...state,
                title: action.payload.title,
                body: action.payload.body,
                author: action.payload.author,
                id: action.payload.id,
                category: action.payload.category
            }
        default:
            return state
    }
}