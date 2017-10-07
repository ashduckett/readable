import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deletePost, fetchComments, fetchPost, upVotePost, downVotePost, fetchPostById } from '../actions/index'
import EditPostControl from './EditPostControl'
import NewCommentControl from './NewCommentControl'
import VoteControl from './VoteControl'
import Comment from './Comment'
import { Button, Modal, FormControl, ControlLabel, FormGroup, MenuItem, DropdownButton } from 'react-bootstrap'
import '../font-awesome/css/font-awesome.min.css'
import { Link } from 'react-router-dom'

class PostDetail extends Component {

    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpVote = this.handleUpVote.bind(this)
        this.handleDownVote = this.handleDownVote.bind(this)
        this.postBasedOnUrl = null
    }

    componentDidMount() {
         if(this.props.postId) {
            this.props.fetchPostById(this.props.postId)
            this.props.fetchComments(this.props.postId)
        }
    }
    
    handleDelete(e) {
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
        
        if(this.props.latestPost) {
        return(
        
        
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="panel-title">{this.props.latestPost.title} by {this.props.latestPost.author}</div>
                </div>
                <div className="panel-body">
                    <div className="post-container">
                        <div className="post">
                            
                            <p>{this.props.latestPost.body}</p>
                            <div className="btn-group" role="group" aria-label="...">
                                <EditPostControl postToEdit={this.props.latestPost} />
                                <Link onClick={(e) => this.handleDelete(e)} to={'/None'} type="button" className="btn btn-default"><i className="fa fa-trash-o" aria-hidden="true"></i></Link>
                                <NewCommentControl editing={false} />
                            </div>
                        </div>
                        <VoteControl upVote={this.handleUpVote} downVote={this.handleDownVote} score={this.props.latestPost.voteScore}  id={this.props.latestPost.id} />
                    </div>
                    
                    {
                        this.renderComments()
                    }
                </div>
            </div>
        )
    } else {
        return(
            <p>no!</p>
        )
    }
    }
}

function mapStateToProps(state) {
    return {
        latestPost: state.latestPost,
        postComments: state.currentComments
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPost, deletePost, fetchComments, upVotePost, downVotePost, fetchPostById }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(PostDetail)