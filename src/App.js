import React, { Component } from 'react';
import CategoryDropdown from './components/CategoryDropdown'
import SortByDropdown from './components/SortByDropdown'
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import { bindActionCreators } from 'redux'
import { fetchCategories } from './actions'
import { connect } from 'react-redux'
import './App.css';

class App extends Component {

  // Might as well do this one time and reuse the state across components.
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <div className="app container">
        <div className="row">
          <div className="col-md-9">
            <PostDetail />
          </div>
          <div className="col-md-3">
            <CategoryDropdown />
            <SortByDropdown />
            <PostList />
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCategories }, dispatch)
}

export default connect(null, mapDispatchToProps)(App);


