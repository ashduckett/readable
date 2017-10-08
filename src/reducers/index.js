import { combineReducers } from 'redux'
import PostsReducer from './reducer_posts'
import LatestPostReducer from './reducer_post'
import CategoryReducer from './reducer_categories'
import PostToSaveReducer from './reducer_post_to_save'
import CommentsReducer from './reducer_comments'
import CommentToSaveReducer from './reducer_comment_to_save'
import SortByFilterReducer from './reducer_sort_by_value'
import CategoryFilterReducer from './reducer_category_filter'

const rootReducer = combineReducers({
    posts: PostsReducer,
    latestPost: LatestPostReducer,
    categories: CategoryReducer,
    postToSave: PostToSaveReducer,
    commentToSave: CommentToSaveReducer,
    currentComments: CommentsReducer,
    sortByValue: SortByFilterReducer,
    catFilter: CategoryFilterReducer,
})

export default rootReducer