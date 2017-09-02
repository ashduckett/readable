import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, Modal, FormControl, ControlLabel, FormGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addPost } from '../actions/index'
import { bindActionCreators } from 'redux'
import { updatePostToSave } from '../actions/index'

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
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleAuthorChange = this.handleAuthorChange.bind(this)
        this.handleBodyChange = this.handleBodyChange.bind(this)
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

  handleTitleChange(e) {
    this.props.updatePostToSave('title', e.target.value)
  }

  handleCategoryChange(e) {
    this.props.updatePostToSave('category', e.target.value)
  }

  handleAuthorChange(e) {
    this.props.updatePostToSave('owner', e.target.value)
  }

  handleBodyChange(e) {
    this.props.updatePostToSave('body', e.target.value)
  }

  handleSave() {
    this.props.addPost(this.props.postToSave)
    this.close()
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
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
        <Button bsStyle="primary" bsSize="large" onClick={this.open}>New Post</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Post Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
                <ControlLabel>Author</ControlLabel>
                <FormControl type="text" value={this.props.postToSave.owner} placeholder="Author" onChange={this.handleAuthorChange} />
              </FormGroup>
             <FormGroup controlId="formControlsSelect">
                <ControlLabel>Category</ControlLabel>
                <FormControl value={this.props.postToSave.category} componentClass="select" placeholder="select" onChange={this.handleCategoryChange}>
                  <option value="None">None</option>
                  {categories.map((category) => {
                    return(
                      <option key={category.name} value={category.name}>{category.name}</option>    
                    )
                  })}
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
                <ControlLabel>Title</ControlLabel>
                <FormControl value={this.props.postToSave.title} type="text" placeholder="Title" onChange={this.handleTitleChange} />
              </FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Body</ControlLabel>
                <FormControl value={this.props.postToSave.body} onChange={this.handleBodyChange}componentClass="textarea" placeholder="Body" />
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
    postToSave: state.postToSave
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addPost, updatePostToSave }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostControl)

ReactDOM.render(<NewPostControl />, document.getElementById('root'));