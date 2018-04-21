import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import constants from "../constants/constants"

function ProtectedRoute ({component: Component, authenticated, ...rest}:any) {
    return(
      <Route
        {...rest}
        // tslint:disable-next-line:jsx-no-lambda
        render={(props) => authenticated === true
          ? <Component {...props} />
          : <Redirect to={{pathname: constants.ROUTE_SIGN_IN}} />}
      />
    )
  }

  export default ProtectedRoute;