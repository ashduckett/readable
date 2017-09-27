import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { changeCategoryFilter } from '../actions/index'
import { connect } from 'react-redux'
import { Link, Router } from 'react-router-dom'


// Functional or Class based? Can this component be reused in the form and the filter thing on the main page?
class CategoryDropdown extends Component {
    handleChange(e) {
        this.props.changeCategoryFilter(e.target.value)
    }

    render() {
        return(
             <div className="form-group">
                <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Filter by Category           
                    <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                        <li><Link key={"None"} to={"/" + 'None'}>None</Link></li>
                        {
                            this.props.categories.map((category) => {
                                return (
                                    <li key={category.name}><Link to={"/" + category.name}>{category.name}</Link></li>
                                )
                            })
                        }   
                    </ul>
                </div>
                
                
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