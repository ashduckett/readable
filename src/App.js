import React, { Component } from 'react';
import CategoryDropdown from './components/CategoryDropdown'
import SortByDropdown from './components/SortByDropdown'
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
//import promiseMiddleware from 'redux-promise';
import { bindActionCreators } from 'redux'
import { fetchCategories } from './actions'
import { connect } from 'react-redux'
import './App.css';

class App extends Component {

  // This can be moved once everything is more encapsulated?
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    let categories
    if(this.props.categories && this.props.categories.length > 0) {
      categories = this.props.categories
    } else {
      return(
        <div></div>
      )
    }
    return (
      <div className="app container">
        <div className="row">
          <div className="col-md-9">
            <PostDetail />
          </div>
          <div className="col-md-3">
            <CategoryDropdown categories={categories}/>
            <SortByDropdown />
            <PostList categories={categories} />
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCategories }, dispatch)
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


