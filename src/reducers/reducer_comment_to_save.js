// This represents a comment in construction via the form on the modal used to create or edit a comment

import { COMMENT_TO_SAVE_UPDATED } from '../actions/index'
import { EDIT_COMMENT_INSTIGATED } from '../actions/index'


/*
What does a category look like? This will form the dummy data.

*/


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
            console.log('comment to save updated called')
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
    }
    
    return state
}

