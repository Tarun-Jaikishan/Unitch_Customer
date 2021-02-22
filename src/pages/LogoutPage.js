import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as action from '../redux/action/index';


class LogoutPage extends Component {


    logot = () => {
        this.props.logout();
        this.props.history.push('/');
    }

    render() {
        return (<div className="nav-item">
            <Link className="btn btn-sm btn-outline-primary ml-1" onClick={this.logot}>Logout</Link>
        </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(action.logout())
    }
}

export default connect(null, mapDispatchToProps)(withRouter(LogoutPage));