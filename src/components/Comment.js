import React, { Component } from 'react'
import NewCommentControl from './NewCommentControl'
import VoteControl from './VoteControl'
import { deleteComment, upVoteComment, downVoteComment } from '../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Comment extends Component {
  
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpVote = this.handleUpVote.bind(this)
        this.handleDownVote = this.handleDownVote.bind(this)
    }

    handleDelete(id) {
        this.props.deleteComment(id)
    }

    handleUpVote(id) {
        this.props.upVoteComment(id)
    }

    handleDownVote(id) {
        this.props.downVoteComment(id)
    }
    
    render() {

        return(
            <div className="comment-container">
                <div className="comment">
                    <div>
                        <em>Comment by {this.props.comment.author}</em>
                        <p>{this.props.comment.body}</p>
                    </div>
                    <div className="comment-controls">
                        <NewCommentControl editing={true} comment={this.props.comment ? this.props.comment : null} />
                        <a onClick={() => {this.handleDelete(this.props.comment.id)}} href="#">Delete Comment</a>
                    </div>
                </div>
                <VoteControl upVote={this.handleUpVote} downVote={this.handleDownVote} score={this.props.comment.voteScore} id={this.props.comment.id} />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ deleteComment, upVoteComment, downVoteComment }, dispatch)
}

export default connect(null, mapDispatchToProps)(Comment)




