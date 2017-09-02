import React, { Component } from 'react'

// Functional or Class based?
class SortByDropdown extends Component {
    render() {
        return(
            <div className="form-group">
                <label htmlFor="exampleSelect1">Sort</label>
                <select className="form-control">
                    <option>Vote Score</option>
                    <option>Most Recent</option>
                    <option>Least Recent</option>
                </select>
            </div>
        )
    }
}

export default SortByDropdown