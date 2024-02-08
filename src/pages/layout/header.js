import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../../redux/action/index";
import { SITE_SETTING } from "../../env.conf";

class Header extends Component {
  render() {
    return (
      <div className="header py-4">
        <div className="container">
          <div className="d-flex justify-content-between">
            <Link className="header-brand" to="/">
              <img
                className="header-brand-img"
                src={SITE_SETTING.company_logo}
                alt={SITE_SETTING.company_name}
              />
            </Link>
            <div className="d-flex">
              {!this.props.is_customer && (
                <div className="nav-item d-flex flex-gap">
                  <Link
                    className="btn btn-sm d-lg-none btn-outline-purple"
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-sm d-lg-none btn-outline-purple"
                    to="/register"
                  >
                    Register
                  </Link>

                  {/* Mobile Responsive */}
                  <Link
                    className="btn d-none d-lg-inline-block btn-outline-purple"
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn d-none d-lg-inline-block btn-outline-purple"
                    to="/register"
                  >
                    Register
                  </Link>
                </div>
              )}
              {this.props.is_customer && (
                <div className="nav-item">
                  <button
                    className="btn btn-sm d-lg-none btn-outline-danger"
                    onClick={(e) => {
                      this.props.logout();
                    }}
                  >
                    Logout
                  </button>

                  {/* Responsive */}
                  <button
                    className="btn d-none d-lg-inline-block btn-outline-danger"
                    onClick={(e) => {
                      this.props.logout();
                    }}
                  >
                    Logout
                  </button>

                  <Link
                    className="header-toggler d-lg-none ml-3 ml-lg-0"
                    to="#"
                    onClick={(event) => {
                      event.preventDefault();
                      this.props.showMenu();
                    }}
                  >
                    <span className="header-toggler-icon"></span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(action.logout()),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Header));
