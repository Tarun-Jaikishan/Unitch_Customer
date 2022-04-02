import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Comp, is_customer, force_reset_password,path, ...rest }) => {
    if (is_customer && force_reset_password && path !== '/changepassword') {
        return <Redirect to="/changepassword" />
    }
    return <Route {...rest} component={(props) => (is_customer ? <Comp {...props} /> : <Redirect to="/" />)} />

}

export default PrivateRoute;