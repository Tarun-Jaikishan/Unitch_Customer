import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../redux/action/index";
import { Alert } from "react-bootstrap";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        username: {
          is_valid: true,
          value: "",
          errorMsg: null,
        },
        password: {
          is_valid: true,
          value: "",
          errorMsg: null,
        },
      },
    };
  }

  handleChange = (e) => {
    let form = { ...this.state.form };

    form[e.target.name].value = e.target.value;
    this.setState({
      form: { ...form },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state.form;
    if (username.value && password.value) {
      this.props.auth(username.value, password.value, true);
    }
  };

  render() {
    let mg = "";
    if (this.props.location.state !== undefined) {
      let m = "";
      if (this.props.location.state.is_suc === 1) {
        m = "Registered successfully. Please login.";
      } else if (this.props.location.state.is_suc === 2) {
        m = "Already registered. Please login.";
      }
      mg = <Alert variant="success">{m}</Alert>;
    }
    if (this.props.error) {
      mg = <Alert variant="danger">{this.props.error}</Alert>;
    }

    return (
      <div className="center-div">
        <div className="row">
          <div className="col col-login mx-auto">
            {mg}
            <form className="card">
              <div className="card-body p-6">
                <div className="card-title text-center font-weight-bold">
                  Login to your Account
                </div>
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input
                    className="form-control"
                    name="username"
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    value={this.state.form.username.value}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={this.state.form.password.value}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-footer">
                  <button
                    className="btn btn-block btn-purple"
                    onClick={this.handleSubmit}
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (username, password, isUserSignin) =>
      dispatch(action.auth(username, password, isUserSignin)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage));
