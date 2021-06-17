import React, { Component } from "react";
import "./input.css";

class Input extends Component {
  render() {
    const { value, onChange, name, type, error, label } = this.props;
    return (
      <React.Fragment>
       
       <label htmlFor={name}>{label}</label>
        <input
          autoFocus
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={label}
          className="form-control"
        />
        {error && <small className="invalidInput">{error}</small>}
        <br></br>
      </React.Fragment>
    );
  }
}

export default Input;
