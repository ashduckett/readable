import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPosts, fetchPost } from '../actions/index'
import { fetchComments } from '../actions/index'
import { addPost, changeSortOrder } from '../actions/index'
import NewPostControl from './NewPostControl'
import arraySort from 'array-sort'

class PostList extends Component {
    constructor(props) {
        super(props)
        this.onSelectPost = this.onSelectPost.bind(this)
    }

    componentDidMount() {
        this.props.fetchPosts()
    }
    
    onSelectPost(post) {
        // What does this do? It should update
        this.props.fetchPost(post)

        // And this?
        this.props.fetchComments(post.id)
    }

    render() {
        
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
            case 'Vote Score':
                arraySort(posts, 'voteScore')
                break
            case 'Most Recent':
                arraySort(posts, 'timestamp')
                break
            case 'Least Recent':
                arraySort(posts, 'timestamp', {reverse: true})
                break
        }

        // Now filter
        if(this.props.catFilter !== 'None') {
            posts = posts.filter((post) => {
                return post.category === this.props.catFilter
            })
        }

        return(
            <div>
                <h4>Posts</h4>
                <NewPostControl categories={this.props.categories} editing={false} />
               
                <ul className="post-list">

                    {posts.map((post) => {
                        return(
                            <li onClick={() => this.onSelectPost(post)} key={post.id}>{post.title}</li>
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
        catFilter: state.catFilter
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPosts, fetchPost, addPost, fetchComments, changeSortOrder }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)