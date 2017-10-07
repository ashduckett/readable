import React, { Component } from 'react'

class VoteControl extends Component {
    
    handleUpVote(e) {

        console.log('id is ' + this.props.id)
        e.preventDefault();
        this.props.upVote(this.props.id)
    }

    handleDownVote(e) {
        e.preventDefault();
        this.props.downVote(this.props.id)
    }
    
    render() {
        let score = (this.props.score ? this.props.score : 0)
        
        
        
        
        return(
            <div className="voteComponent">
                <a href="#" className="voter" onClick={(e) => this.handleUpVote(e)}><i className="fa fa-thumbs-up" aria-hidden="true"></i></a>
                <p className="score">{score}</p>
                <a href="#" className="voter" onClick={(e) => this.handleDownVote(e)}><i className="fa fa-thumbs-down" aria-hidden="true"></i></a>
            </div>
        )
    }
}

export default VoteControl