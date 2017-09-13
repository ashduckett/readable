import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, Modal, FormControl, ControlLabel, FormGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addPost } from '../actions/index'
import { bindActionCreators } from 'redux'
import { updatePostToSave, editPostToSave, editPost, commentToSaveEdited, addComment, editCommentInstigated, editCommentCommitted } from '../actions/index'

class NewCommentControl extends Component {

  constructor(props) {
    super(props)

        this.state = {
            showModal: false,
            body: '',
            owner: ''
        }

        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
        this.handleAuthorChange = this.handleAuthorChange.bind(this)
        this.handleBodyChange = this.handleBodyChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

  handleAuthorChange(e) {
    this.props.updatePostToSave('owner', e.target.value)
  }

  handleBodyChange(e) {
    this.props.updatePostToSave('body', e.target.value)
  }

  handleSave() {

    // When this fires for saving an existing comment, you're going to need an id.
    // Let's imagine we're only adding a new one in this case

    if(this.props.editing === false) {
      this.props.addComment(this.props.commentToSave)
    } else {
      this.props.editCommentCommitted(this.props.commentToSave)
    }
    this.close()
  }

  

  handleEdit(fieldName, event) {

    // Get an id on the thing
    const uuidv1 = require('uuid/v1');
    let id = uuidv1();

    
    this.props.commentToSaveEdited('parentId', this.props.latestPost.id)
    this.props.commentToSaveEdited('timestamp', Date.now())
    this.props.commentToSaveEdited('voteScore', 0)
    
    // Whenever the comment is edited, it will generate a new id.
    // Move this into the action.
    // this.props.commentToSaveEdited('id', uuidv1());

    // Update the category
    this.props.commentToSaveEdited(fieldName, event.target.value)

    // Also add the parentId, a timestamp and a default vote score
    // These three things could be done in the handleSave method rather than every key press.
    // Also, there must be a way to assign these values without having to call this method.
    

    
  }

  

   getValidationState() {
//     const length = this.state.value.length;
//     if (length > 10) return 'success';
//     else if (length > 5) return 'warning';
//     else if (length > 0) return 'error';
   }

  close() {
    this.setState({ showModal: false });
  }

    open() {
        this.setState({ showModal: true });


        //if(this.props && this.props.editCommentInstigated) {
          
        if(this.props.editing) {
          this.props.editCommentInstigated(this.props.comment)
        } else {
          this.props.editCommentInstigated(null)
        }
        //}

        // I think you want to pass in the latestpost here
        // if(this.props.editing) {
        //     this.props.editPostToSave(this.props.latestPost)
        // } else {
        //     this.props.editPostToSave({
        //         owner: '',
        //         body: '',
        //         id: ''
        //     })
        // }
    }

  render() {
    return (
      // I want to update the fields if we're editing.
      // It's possible that in order to do this, all we need to do is to update the postToSave prop.
      // This control is different. Can you reuse it?

      // When you change something that's a part of the comment, update commentToSave.
      // Then when you want to save, pass the commentToSave comment to an action.
      // If you hit the edit button, when it pops up, you want it populated with the latest comment.
      // What is the latest comment?
      // The modal is populated with comment to save.
      // So we'll want to change the comment to save.
      
      // It's about setting this.props.comment to save before this renders.
      <div>
     
        <a className="action-link" onClick={this.open}>{this.props.editing ? 'Edit Comment' : 'New Comment'}</a>
     
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Comment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
                <ControlLabel>Author</ControlLabel>
                <FormControl type="text" value={this.props.commentToSave ? this.props.commentToSave.author : ''} placeholder="Author" onChange={(event) => this.handleEdit('author', event)} />
              </FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Body</ControlLabel>
                <FormControl value={this.props.commentToSave ? this.props.commentToSave.body : ''} onChange={(event) => this.handleEdit('body', event)}componentClass="textarea" placeholder="Body" />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button onClick={() => this.handleSave()}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    categories: state.categories,
    postToSave: state.postToSave,
    latestPost: state.latestPost,
    commentToSave: state.commentToSave
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addPost, updatePostToSave, editPostToSave, editPost, commentToSaveEdited, addComment, editCommentInstigated, editCommentCommitted }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentControl)

ReactDOM.render(<NewCommentControl />, document.getElementById('root'));