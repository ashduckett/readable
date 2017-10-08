import React, { Component } from 'react'

class VoteControl extends Component {
    
    handleUpVote(e) {
        this.props.upVote(this.props.id)
    }

    handleDownVote(e) {
        this.props.downVote(this.props.id)
    }
    
    render() {
        let score = (this.props.score === undefined ? 1 : this.props.score)
        
        return(
            <div className="voteComponent">
                <a title="Vote Up" className="voter" onClick={(e) => this.handleUpVote(e)}><i className="fa fa-thumbs-up" aria-hidden="true"></i></a>
                <p className="score">{score}</p>
                <a className="voter" onClick={(e) => this.handleDownVote(e)}><i className="fa fa-thumbs-down" aria-hidden="true"></i></a>
            </div>
        )
    }
}

export default VoteControl