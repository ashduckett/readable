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
                    <div className="panel-title">{this.props.latestPost.title} by {this.props.latestPost.author}
                        <div className="dropdown">
                            <a className="dropdown-toggle" id="menu1" type="button" data-toggle="dropdown">
                                <span className="caret"></span>
                            </a>
                            <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                                <li role="presentation"><EditPostControl postToEdit={this.props.latestPost} /></li>
                                <li onClick={(e) => this.handleDelete(e)} role="presentation"><a role="menuitem" tabIndex="-1" href="#">Delete</a></li>
                                <li role="presentation"> <NewCommentControl editing={false} /></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="post-container">
                        <div className="post">
                            <p>{this.props.latestPost.body}</p>
                            <div className="post-controls">
                                <a className="post-control" href="#">Test</a>
                                <a className="post-control" href="#">Test</a>
                            </div>
                        </div>
                        <VoteControl upVote={this.handleUpVote} downVote={this.handleDownVote} score={this.props.latestPost.voteScore}  id={this.props.latestPost.id} />
                    </div>
                    
                    {
                        this.renderComments()
                    }
                </div>
            {/* <div className="button-col">
                    <div className="buttons">
                        <a className="action-link" onClick={this.handleDelete}>Delete</a>
                        <EditPostControl postToEdit={this.props.latestPost}/>
                        <NewCommentControl editing={false} />
                    </div>
                </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)