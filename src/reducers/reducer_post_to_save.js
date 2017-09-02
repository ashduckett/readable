import { POST_TO_SAVE_UPDATED } from '../actions/index'

// Default return
const dummyReturn = {
    category: 'None',
    title: '',
    owner: '',
    body: '',
    id: '',
}


export default function(state = dummyReturn, action) {
    switch(action.type) {
        case POST_TO_SAVE_UPDATED:
            //let id = state.id ? state.id : 

            return {
                ...state,
                [action.field]: action.value
            }
    }
    
    return state
}