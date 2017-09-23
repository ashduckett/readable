import React, { Component } from 'react'

class VoteControl extends Component {
    // What do we need to function?
    // Score
    // Function to run on upvote
    // Function to run on downvote
    
    // How should the function get hold of the id in question?
    
    // this.props.handleUpVote
    render() {
        return(
            <div className="voteComponent">
                <a href="#" className="voter" onClick={() => this.props.upVote(this.props.id)}><i className="fa fa-thumbs-up" aria-hidden="true"></i></a>
                <p className="score">{this.props.score}</p>
                <a href="#" className="voter" onClick={() => this.props.downVote(this.props.id)}><i className="fa fa-thumbs-down" aria-hidden="true"></i></a>
            </div>
        )
    }
}

export default VoteControl