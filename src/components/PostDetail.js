import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPost } from '../actions/index'
import { deletePost } from '../actions/index'

class PostDetail extends Component {
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }
    
    handleDelete() {
        this.props.deletePost(this.props.latestPost)
    }
    
    render() {
        if(!this.props.latestPost) {
            return(
                <div>Select a post</div>
            )
        }

        return(
            <div>
                <h5>{this.props.latestPost.title}</h5>
                <p>
                    {this.props.latestPost.body}
                </p>
                <button onClick={this.handleDelete}>Delete</button>
                <button onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        latestPost: state.latestPost
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPost, deletePost }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)