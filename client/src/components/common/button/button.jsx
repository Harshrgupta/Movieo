import React, { Component } from 'react';

class Button extends Component {
    render() { 
        const {label,handleClick} = this.props;
        return ( <button onClick={()=>handleClick()} className="btn btn-primary m-2">{label}</button> );
    }
}
 
export default Button;