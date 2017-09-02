import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPosts, fetchPost } from '../actions/index'
//import { fetchPost } from '../actions/index'
import { addPost } from '../actions/index'
import NewPostControl from './NewPostControl'



class PostList extends Component {
    componentDidMount() {
        this.props.fetchPosts()
    }
    
    onNewPost() {
        
    }

    render() {
        
        if(!this.props.posts || this.props.posts.length === 0) {
            return(
                <div></div>
            )
        }

        return(
            <div>
                <h4>Posts</h4>
                <NewPostControl onClick={this.props} categories={this.props.categories }/>
                <ul className="post-list">

                    {this.props.posts.map((post) => {
                        return(
                            <li onClick={() => this.props.fetchPost(post)} key={post.id}>{post.title}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPosts, fetchPost, addPost }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)


// Initially, display all of the post titles down the side, filterable
// by category at the top.

// These should be links that give you more detail in the detail view
// to the center.

// Dispose of black top with bleach.

// Clicking on a post title should fire a SELECT_POST action.
// This should change the state of the selected post which will be displayed
// in the detail view.

// Get that working as a first step.


