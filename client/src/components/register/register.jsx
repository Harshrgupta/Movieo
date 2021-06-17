import React from "react";
import Form from "./../common/form/form";
import Joi from "joi-browser";
import { saveUser } from "../../services/registerUser";
import { toast } from "react-toastify";

class Register extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    name: Joi.string().min(3).max(50).required(),
  };

  doSubmit = async () => {
    try {
      const data = await saveUser(this.state.data);
      toast.info(`Successfully Register `);
      localStorage.setItem("token", data.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error("User Already Exists");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="body">
        <h1>Register</h1>
        {this.renderInput("email", "Email", "email")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name", "text")}
        {this.renderButton("Register")}
      </form>
    );
  }
}

export default Register;
