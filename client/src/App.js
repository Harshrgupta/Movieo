import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import decoder from "jwt-decode";
import Movies from "./components/movies/movies";
import NotFound from "./components/notFound//notFound";
import NavBar from "./components/navBar//navBar";
import LoginForm from "./components/loginForm/loginForm";
import Register from "./components/register/register";
import MoviesForm from "./components/moviesForm/moviesForm";
import Logout from "./components/logout/logout";
import ProtectedRoute from "./components/common/protectedRoute/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

console.log("superman",process.env.REACT_APP_NAME);

class App extends Component {
  state = { user: {} };
  componentDidMount() {
    try {
      const token = localStorage.getItem("token");
      const user = decoder(token);
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    const { user } = this.state;
    return (
      <main className="container">
        <React.Fragment>
          <ToastContainer />
          <NavBar user={user} />
          <Switch>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={LoginForm} user={user}></Route>
            <ProtectedRoute path={"/movies/:id"} component={MoviesForm} user={user}></ProtectedRoute>
            <Route path={"/movies"} render={props=><Movies {...props} user={user} />}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </React.Fragment>
      </main>
    );
  }
}

export default App;
