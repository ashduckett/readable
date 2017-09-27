import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addPost, changeSortOrder, changeCategoryFilter, fetchComments, fetchPosts, fetchPost } from '../actions/index'
import NewPostControl from './NewPostControl'
import arraySort from 'array-sort'
import CategoryDropdown from './CategoryDropdown'
import SortByDropdown from './SortByDropdown'

class PostList extends Component {
    constructor(props) {
        super(props)
        this.onSelectPost = this.onSelectPost.bind(this)
    }

    componentDidMount() {
        this.props.fetchPosts()
        let cat = this.props.match.params.category ? this.props.match.params.category : 'None'
        this.props.changeCategoryFilter(cat)
    }
    
    onSelectPost(post) {
        // What does this do? It should update
        this.props.fetchPost(post)

        // And this?
        this.props.fetchComments(post.id)
    }

    render() {
        console.log(this.props.match.params)

        if(!this.props.posts || this.props.posts.length === 0) {
            return(
                <div></div>
            )
        }

        // Why take a copy? Without a copy we rip apart the state forming the list when we filter.
        // You'd have to run off and grab a fresh copy with a new api call each time.
        // Or store separate lists...there are other ways of doing this...

        // Take a copy of the current list:
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
        if(this.props.match.params.category !== 'None') {
            posts = posts.filter((post) => {
                return post.category === this.props.match.params.category
            })
        }

        return(

            <div>
                <CategoryDropdown />
                <SortByDropdown />
                <h4>Posts</h4>
                <NewPostControl categories={this.props.categories} editing={false} />
                <ul className="post-list">
                    {posts.map((post) => {
                        return(
                            <li className="post-item" onClick={() => this.onSelectPost(post)} key={post.id}>{post.title}</li>
                        )
                    })}
                </ul>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        comments: state.currentComments,
        sortByValue: state.sortByValue,
        catFilter: state.catFilter,
        categories: state.categories
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPosts, fetchPost, addPost, fetchComments, changeSortOrder, changeCategoryFilter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)