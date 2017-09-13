// This control's not strictly necessary, but I think it makes it clearer to the reader what I'm doing
import React, { Component } from 'react'
import NewPostControl from './NewPostControl'
import { connect } from 'react-redux'

class EditPostControl extends Component {

    render() {
        return(
            <NewPostControl postToEdit={this.props.postToSave} editing={true}/>
        )
    }
}



function mapStateToProps(state) {
    return {
        latestPost: state.latestPost,
        postToSave: state.postToSave
    }
  }
  export default connect(mapStateToProps, null)(EditPostControl)

