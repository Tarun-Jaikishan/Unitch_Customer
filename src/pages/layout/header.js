import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../resouces/images/logo/logo.png'
import { SITE_SETTING } from '../../env.conf';
import LogoutPage from '../LogoutPage';

const Header = (props) => (
    <div className="header py-4">
        <div className="container">
            <div className="d-flex">
                <Link className="header-brand" to="/">
                    <img className="header-brand-img" src={Logo} alt={SITE_SETTING.company_name} />
                </Link>
                <div className="d-flex order-lg-2 ml-auto">
                    {
                        !props.is_customer && (
                            <div className="nav-item">
                                <Link className="btn btn-sm btn-outline-primary ml-1" to="/login">Login</Link>
                                <Link className="btn btn-sm btn-outline-primary ml-1" to="/register">Register</Link>
                            </div>
                        )
                    }
                    {
                        props.is_customer && (
                            <LogoutPage />
                        )
                    }
                </div>
                <Link className="header-toggler d-lg-none ml-3 ml-lg-0" to="#" onClick={(event) => { event.preventDefault(); props.showMenu(); }}>
                    <span className="header-toggler-icon"></span>
                </Link>
            </div>
        </div>
    </div>
);

export default Header;
