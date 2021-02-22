import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import MainLayout from './pages/layout/main';
import * as action from './redux/action/index';
import { MENU_LIST } from './pages/layout/menu'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/MyAccountPage';
import RenewalPage from './pages/RenewalPage';
import AddonsPage from './pages/AddonsPage';
import LogoutPage from './pages/LogoutPage';
import PeriodSelectionPage from './pages/PeriodSelectionPage';
import { isExtTokenValid } from './utilits';
import PrivateRoute from './components/PrivateRoute';
import PublicRestrictedRoute from './components/PublicRestrictedRoute';

class Routes extends Component {

  componentDidMount() {
    if (!isExtTokenValid()) {
      this.props.auth();
    }
    this.props.autoLogin();
  }

  render() {
    let routerComponent = MENU_LIST.non_login.map(({ url, component }, index) => {
      return <Route exact path={url} component={component} key={index} />
    });


    return (
      <MainLayout is_customer={this.props.is_customer}>
        <Switch>
          <PrivateRoute component={AccountPage} exact path="/myaccount" is_customer={this.props.is_customer} />
          <PrivateRoute component={RenewalPage} exact path="/myaccount/renewal" is_customer={this.props.is_customer} />
          <PrivateRoute component={AddonsPage} exact path="/myaccount/addons" is_customer={this.props.is_customer} />
          <PrivateRoute component={PeriodSelectionPage} exact path="/myaccount/period" is_customer={this.props.is_customer} />
          {routerComponent}
          <PublicRestrictedRoute component={RegisterPage} exact path="/register" is_customer={this.props.is_customer} />
          <PublicRestrictedRoute component={LoginPage} exact path="/login" is_customer={this.props.is_customer} />
          <Route exact path='/logout' component={withRouter(LogoutPage)} />
        </Switch>
      </MainLayout >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    is_customer: state.auth.is_customer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    auth: () => dispatch(action.auth()),
    autoLogin: () => dispatch(action.autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
