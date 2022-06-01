import React, { Component } from 'react';

class PatientCard extends Component {
    render() {
        let state;
            state = <p style={{ color: this.props.state > 70 ? "#ff3300" : this.props.state > 30 ? '#ffcc00' : "#0a8a0e"}} className="p-1">{this.props.state.toFixed(2)}</p>
        return (
            <div>
                <div className={`${this.props.name == "Colton" ? "bg-red-100" : ""} grid grid-cols-3 p-1`}>
                    <p className='font-bold'>{this.props.name}</p>
                    <p>{this.props.age}</p>
                    {state}
                </div>
            </div>
        );
    }
}

export default PatientCard;
