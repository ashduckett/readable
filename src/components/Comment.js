import React, { Component } from 'react'
import NewCommentControl from './NewCommentControl'

class Comment extends Component {
  
    constructor(props) {
        super(props)
    }
    
    render() {
        return(
            <div className="comment">
                <em>Comment by {this.props.comment.author}</em>
                <p>{this.props.comment.body}</p>
                <NewCommentControl editing={true} comment={this.props.comment ? this.props.comment : null} />
            </div>
        )
    }
}

export default Comment