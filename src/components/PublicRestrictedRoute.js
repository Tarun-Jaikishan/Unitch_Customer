import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const PublicRestrictedRoute = ({ component: Comp, is_customer, ...rest }) => {
    return <Route {...rest} component={(props) => (!is_customer ? <Comp {...props} /> : <Redirect to="/myaccount" />)} />

}

export default PublicRestrictedRoute
