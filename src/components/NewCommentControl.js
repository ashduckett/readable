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
        this.handleSave = this.handleSave.bind(this)
        this.handleEdit = this.handleEdit.bind(this)

    }

  handleSave() {
    if(this.props.editing === false) {
      this.props.addComment(this.props.commentToSave)
    } else {
      this.props.editCommentCommitted(this.props.commentToSave)
    }
    this.close()
  }
  
  handleEdit(fieldName, fieldValue) {
    this.props.commentToSaveEdited(fieldName, fieldValue, this.props.latestPost.id)
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
        
    if(this.props.editing) {
      this.props.editCommentInstigated(this.props.comment)
    } else {
      this.props.editCommentInstigated(null)
    }
  }

  render() {
    return (
      <button title="Reply" type="button" className="btn btn-default" onClick={this.open}>{this.props.editing ? <i className="fa fa-pencil-square-o" aria-hidden="true"></i> : <i className="fa fa-comment-o" aria-hidden="true"></i>}
       <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Comment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
                <ControlLabel>Author</ControlLabel>
                <FormControl type="text" value={this.props.commentToSave ? this.props.commentToSave.author : ''} placeholder="Author" onChange={(event) => this.handleEdit('author', event.target.value)} />
              </FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Body</ControlLabel>
                <FormControl value={this.props.commentToSave ? this.props.commentToSave.body : ''} onChange={(event) => this.handleEdit('body', event.target.value)}componentClass="textarea" placeholder="Body" />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button onClick={() => this.handleSave()}>Save</Button>
          </Modal.Footer>
        </Modal>
      </button>
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