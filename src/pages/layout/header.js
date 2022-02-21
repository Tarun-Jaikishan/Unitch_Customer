import React,{Component} from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../redux/action/index';
import { SITE_SETTING } from '../../env.conf';

class Header extends Component {

    render() {
        return (
            <div className="header py-4">
                <div className="container">
                    <div className="d-flex">
                        <Link className="header-brand" to="/">
                            <img className="header-brand-img" src={SITE_SETTING.company_logo} alt={SITE_SETTING.company_name} />
                        </Link>
                        <div className="d-flex order-lg-2 ml-auto">
                            {
                                !this.props.is_customer && (
                                    <div className="nav-item">
                                        <Link className="btn btn-sm btn-outline-primary ml-1" to="/login">Login</Link>
                                        <Link className="btn btn-sm btn-outline-primary ml-1" to="/register">Register</Link>
                                    </div>
                                )
                            }
                            {
                                this.props.is_customer && (
                                    <div className="nav-item">
                                        <button className='btn btn-sm btn-outline-primary ml-1' onClick={(e) => { this.props.logout();}}>Logout</button>
                                    </div>
                                )
                            }
                        </div>
                        <Link className="header-toggler d-lg-none ml-3 ml-lg-0" to="#" onClick={(event) => { event.preventDefault(); this.props.showMenu(); }}>
                            <span className="header-toggler-icon"></span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(action.logout())
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Header));
