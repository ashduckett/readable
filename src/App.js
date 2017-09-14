import React, { Component } from 'react';
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import { bindActionCreators } from 'redux'
import { fetchCategories } from './actions'
import { connect } from 'react-redux'
import './App.css';

let ReactRouter = require('react-router-dom')
let Router = ReactRouter.BrowserRouter
let Route = ReactRouter.Route


class App extends Component {

  // Might as well do this one time and reuse the state across components.
  componentDidMount() {
    this.props.fetchCategories()
  }


// We will render a router.
  render() {
    return (
      <Router>
      <div className="app container">
        <div className="row">
          <div className="col-md-9">
            <Route path='/:category?/:id?' component={PostDetail}  />
          </div>
          <div className="col-md-3">
            <Route path='/:category?/:id?' component={PostList} />
          </div>
        </div>
      </div>
     </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCategories }, dispatch)
}

export default connect(null, mapDispatchToProps)(App);


