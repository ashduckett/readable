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

class PostDetail extends Component {

    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpVote = this.handleUpVote.bind(this)
        this.handleDownVote = this.handleDownVote.bind(this)
        this.postBasedOnUrl = null
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            // In theory this should render again, and update the latest post rendered...I hope
            this.props.fetchPostById(this.props.match.params.id)
        }
    }
    
    handleDelete(e) {
        e.preventDefault();
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
                                <button type="button" className="btn btn-default" onClick={(e) => this.handleDelete(e)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
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