import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { changeSortOrder } from '../actions/index'
import { connect } from 'react-redux'

// Functional or Class based?
class SortByDropdown extends Component {
    handleChange(e) {
        this.props.changeSortOrder(e.target.value)
    }
    
    render() {
        return(
            <div className="form-group">
                <label htmlFor="exampleSelect1">Sort</label>
                <select className="form-control" onChange={(e) => {this.handleChange(e)}}>
                    <option>Vote Score</option>
                    <option>Most Recent</option>
                    <option>Least Recent</option>
                </select>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        sortByValue: state.sortByValue
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ changeSortOrder }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SortByDropdown)