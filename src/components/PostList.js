import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addPost, changeSortOrder, changeCategoryFilter, fetchComments, fetchPosts, fetchPost } from '../actions/index'
import NewPostControl from './NewPostControl'
import arraySort from 'array-sort'
import CategoryDropdown from './CategoryDropdown'
import SortByDropdown from './SortByDropdown'
import PostItem from './PostItemComponent'
import PostDetail from './PostDetail'

class PostList extends Component {

    componentDidMount() {
        this.props.fetchPosts()
        let cat = this.props.match.params.category ? this.props.match.params.category : 'None'
        this.props.changeCategoryFilter(cat)
    }
    
    render() {
        
        // If an id has not been specified, then we want the whole list for the specified category, or all for the root
        if(!this.props.match.params.id) {

            // Take a copy of the current list so it can be filtered and sorted later if needed
            let posts = this.props.posts

            // First sort
            switch(this.props.sortByValue) {
                case 'Most Recent':
                    arraySort(posts, 'timestamp', {reverse: true})
                    break
                case 'Least Recent':
                    arraySort(posts, 'timestamp')
                    break
                case 'Vote Score':
                default:
                    arraySort(posts, 'voteScore')

            }

            // Now filter
            if(this.props.match.params.category !== 'None' && this.props.match.params.category !== undefined) {
                posts = posts.filter((post) => {
                    return post.category === this.props.match.params.category
                })
            }

            return(
                <div>
                    <div className="col-md-9">
                        <ul className="post-list">
                            {posts.map((post) => {
                                return(
                                    <li key={post.id}><PostItem post={post}/></li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="col-md-3 new-post-control">
                        <NewPostControl categories={this.props.categories} editing={false} />
                        <CategoryDropdown />
                        <SortByDropdown />
                    </div>
                </div>
            )
        } else {
            return (
                
                <div>
                    <PostDetail postId={this.props.match.params.id}/>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        comments: state.currentComments,
        sortByValue: state.sortByValue,
        catFilter: state.catFilter,
        categories: state.categories,
        selectedPost: state.latestPost
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPosts, fetchPost, addPost, fetchComments, changeSortOrder, changeCategoryFilter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)