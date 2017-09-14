import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { changeCategoryFilter } from '../actions/index'
import { connect } from 'react-redux'

// Functional or Class based? Can this component be reused in the form and the filter thing on the main page?
class CategoryDropdown extends Component {
    handleChange(e) {
        this.props.changeCategoryFilter(e.target.value)
    }

    render() {
        return(
            <div className="form-group">
                <label htmlFor="exampleSelect1">Category</label>
                <select value={this.props.catFilter ? this.props.catFilter : 'None'} className="form-control" onChange={(e) => {this.handleChange(e)}}>
                    <option>None</option>
                    {this.props.categories.map((category) => {
                        return(
                            <option key={category.name}>{category.name}</option>
                        )
                    })}            

                </select>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        catFilter: state.catFilter,
        categories: state.categories
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ changeCategoryFilter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDropdown)