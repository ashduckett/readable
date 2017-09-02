import React, { Component } from 'react'

// Functional or Class based? Can this component be reused in the form and the filter thing on the main page?
class CategoryDropdown extends Component {
    render() {
        return(
            <div className="form-group">
                <label htmlFor="exampleSelect1">Category</label>
                <select className="form-control">
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

export default CategoryDropdown