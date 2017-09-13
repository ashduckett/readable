// This control's not strictly necessary, but I think it makes it clearer to the reader what I'm doing
import React, { Component } from 'react'
import NewPostControl from './NewPostControl'
import { connect } from 'react-redux'

class EditPostControl extends Component {

    render() {



        // At this point we want to get hold of the edited posts details.
        // This should be possible by passing in the latest post into the edit post control.


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
  
/*  function mapDispatchToProps(dispatch) {
      return bindActionCreators({ addPost, updatePostToSave, editPostToSave, editPost }, dispatch)
  }*/
  
  export default connect(mapStateToProps, null)(EditPostControl)

// export default EditPostControl