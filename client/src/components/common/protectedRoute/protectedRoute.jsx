import React from "react";
import { Route,Redirect } from "react-router-dom";

const ProtectedRoute = ({path,component:Component,render,user,...rest}) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!user.name) return <Redirect to="/login"></Redirect>;
        return Component?<Component {...props} />:render(props);
      }}
    ></Route>
  );
};

export default ProtectedRoute;
