import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, Modal, FormControl, ControlLabel, FormGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updatePostToSave, editPostToSave, editPost, addPost, postToSaveEdited } from '../actions/index'

class NewPostControl extends Component {

  constructor(props) {

    super(props)

        this.state = {
            showModal: false,
            value: '',
            title: '',
            body: '',
            owner: '',
            category: ''
        }

        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

  // This one should just save your post
  handleSave() {
    if(this.props.editing) {
      this.props.editPost(this.props.latestPost, this.props.postToSave.title, this.props.postToSave.body)  
    } else {
      this.props.addPost(this.props.postToSave)
    }
    this.close()
  }

  handleEdit(fieldName, fieldValue) {
    this.props.postToSaveEdited(fieldName, fieldValue)
  }



  getValidationState() {
    /*const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';*/
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
    // LatestPost is controlled by reducer_post

    // I think you want to pass in the latestpost here
    if(this.props.editing) {
      //
      this.props.editPostToSave(this.props.latestPost)
    } else {
      this.props.editPostToSave({
    category: 'None',
    title: '',
    owner: '',
    body: '',
    id: '',
})
    }
  }

  render() {

    let categories
    
    if(this.props.categories && this.props.categories.length > 0) {
      categories = this.props.categories
    } else {
      categories = []
    }

    if(!this.props.postToSave) {
      return(
        <div></div>
      )
    }

    return (
      <div>
        <a className="action-link" onClick={this.open}>{this.props.editing ? 'Edit Post' : 'New Post'}</a>
     
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Post Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
                <ControlLabel>Author</ControlLabel>
                <FormControl type="text" value={this.props.postToSave.author} placeholder="Author" onChange={(e) => {this.handleEdit('owner', e.target.value) }} />
              </FormGroup>
             <FormGroup controlId="formControlsSelect">
                <ControlLabel>Category</ControlLabel>
                <FormControl value={this.props.postToSave.category} componentClass="select" placeholder="select" onChange={(e) => {this.handleEdit('category', e.target.value) }}>
                  <option value="None">None</option>
                  {this.props.categories.map((category) => {
                    return(
                      <option key={category.name} value={category.name}>{category.name}</option>    
                    )
                  })}
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
                <ControlLabel>Title</ControlLabel>
                <FormControl value={this.props.postToSave.title} type="text" placeholder="Title" onChange={(e) => {this.handleEdit('title', e.target.value)}} />
              </FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Body</ControlLabel>
                <FormControl value={this.props.postToSave.body} onChange={(e) => this.handleEdit('body', e.target.value)} componentClass="textarea" placeholder="Body" />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button onClick={this.handleSave}>Save</Button>
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
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addPost, updatePostToSave, editPostToSave, editPost, postToSaveEdited }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostControl)

ReactDOM.render(<NewPostControl />, document.getElementById('root'));