import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deletePost, fetchComments, fetchPost, upVotePost, downVotePost } from '../actions/index'
import EditPostControl from './EditPostControl'
import NewCommentControl from './NewCommentControl'
import Comment from './Comment'


class PostDetail extends Component {
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }
    
    handleDelete() {
        this.props.deletePost(this.props.latestPost)
    }

    handleUpVote(id) {
        this.props.upVotePost(id)
    }

    handleDownVote(id) {
        this.props.downVotePost(id)
    }

    renderComments() {
        if(this.props.postComments) {
            let modifier = (this.props.postComments.length === 1) ? 'is' : 'are';
            let commentOrComments = (this.props.postComments.length === 1) ? 'comment' : 'comments';


            return (
                <div>
                    <p>There {modifier} {this.props.postComments.length} {commentOrComments}</p>
                    {
                        this.props.postComments.map((comment) => {
                            return(
                                <Comment key={comment.id} comment={comment} />
                            )
                        })
                    }
                    
                </div>
            )
        }
    }

    render() {
        if(!this.props.latestPost) {
            return(
                <div>Select a post</div>
            )
        }

        // log out the comments here
        console.log('HERE')
        console.log(this.props.latestPost)
        return(
            <div className="post-detail">
                <div className="content">
                    <h3 className="post-title">{this.props.latestPost.title}</h3>
                    <p><em>By {this.props.latestPost.author}</em></p>
                    <p>{this.props.latestPost.body}</p>
                    <p>Vote Score: {this.props.latestPost.voteScore}</p>
                    

                    <a onClick={() => this.handleUpVote(this.props.latestPost.id)}>Up Vote</a>
                    <a onClick={() => this.handleDownVote(this.props.latestPost.id)}>Down Vote</a>
                    {
                        this.renderComments()
                    }
                </div>
            <div className="button-col">
                    <div className="buttons">
                        <a className="action-link" onClick={this.handleDelete}>Delete</a>
                        <EditPostControl postToEdit={this.props.latestPost}/>
                        <NewCommentControl editing={false} />
                    </div>
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
    return bindActionCreators({ fetchPost, deletePost, fetchComments, upVotePost, downVotePost }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)