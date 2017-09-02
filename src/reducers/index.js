import { combineReducers } from 'redux'
import PostsReducer from './reducer_posts'
import LatestPostReducer from './reducer_post'
import CategoryReducer from './reducer_categories'
import PostToSaveReducer from './reducer_post_to_save'

const rootReducer = combineReducers({
    posts: PostsReducer,
    latestPost: LatestPostReducer,
    categories: CategoryReducer,
    postToSave: PostToSaveReducer
})

export default rootReducer