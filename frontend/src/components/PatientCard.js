import React, { Component } from 'react';

class PatientCard extends Component { 
    render() {
        let state;
        if(parseFloat(this.props.state) > 30 && parseFloat(this.props.state) < 70){
            state = <p style={{ color: '#ffcc00'}} >{this.props.state}</p>
        }
        else if(parseFloat(this.props.state) > 70){
            state = <p style={{ color: '#ff3300' }} >{this.props.state}</p>
        }
        else{
            state = <p style={{ color: "#0a8a0e" }} >{this.props.state}</p>
        }
        return (
            <div>  
                <div className='flex space-x-7'>
                    <p>{this.props.name}</p>
                    <p>{this.props.age}</p> 
                    {state}
                </div>
            </div>
        );
    }
}

export default PatientCard;
