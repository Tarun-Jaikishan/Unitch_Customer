import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Comp, is_customer, ...rest }) => {
    return <Route {...rest} component={(props) => (is_customer ? <Comp {...props} /> : <Redirect to="/" />)} />

}

export default PrivateRoute;