import React from "react";
import Form from "../common/form/form";
import Joi from "joi-browser";
import { login } from "../../services/authService";
import "./loginForm.css";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  // username = React.createRef();
  // password = React.createRef();
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().min(4).max(50).required(),
    password: Joi.string().required(),
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      const { data: jwt } = await login(username, password);
      localStorage.setItem("token", jwt);
      window.location ="/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const token = localStorage.getItem("token");
    if(token) return <Redirect to="/"></Redirect>
    
    return (
      <form onSubmit={this.handleSubmit} className="body">
        <h1>Login Form</h1>
        {this.renderInput("username", "Username", "text")}
        {this.renderInput("password", "Password", "password")}
        {this.renderButton("Login")}
      </form>
    );
  }
}

export default LoginForm;
