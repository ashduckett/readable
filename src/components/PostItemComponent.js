import React, { Component } from 'react'
import VoteControl from './VoteControl'
import EditPostControl from './EditPostControl'
import NewCommentControl from './NewCommentControl'
import { bindActionCreators } from 'redux'
import { deletePost, fetchPost, upVotePost, downVotePost, fetchComments } from '../actions/index'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../font-awesome/css/font-awesome.min.css'

class PostItem extends Component {
    constructor(props) {
        super(props)
        this.handleUpVote = this.handleUpVote.bind(this)
        this.handleDownVote = this.handleDownVote.bind(this)
    }

    handleUpVote() {
        this.props.fetchPost(this.props.post.id)
        this.props.upVotePost(this.props.post.id)
    }

    handleDownVote() {
        this.props.fetchPost(this.props.post.id)
        this.props.downVotePost(this.props.post.id)
    }

    handleDelete(post) {
        this.props.deletePost(post)
    }

    render() {
        
        return(
            <div className="post-item">
                <div className="post-item-left">
                    <div>
                        <p>{this.props.post.title} by {this.props.post.author}</p>
                        <p>This post has {this.props.post.commentCount} replies.</p>
                    </div>
                    <VoteControl upVote={this.handleUpVote} downVote={this.handleDownVote} score={this.props.post.voteScore} id={this.props.post.id} />
                </div>
                <div className="post-item-right">
                    <div className="btn-group" role="group" aria-label="...">
                        <EditPostControl postToEdit={this.props.post} />
                        <button title="Delete" type="button" className="btn btn-default" onClick={() => {this.handleDelete(this.props.post)}}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                    </div>
                    <Link to={'/' + this.props.post.category + '/' + this.props.post.id} type="button" className="btn btn-primary" id="view-post-detail-btn">View Post</Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        latestPost: state.latestPost,
        postComments: state.currentComments
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ deletePost, fetchPost, upVotePost, downVotePost, fetchComments }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)
//export default PostItem