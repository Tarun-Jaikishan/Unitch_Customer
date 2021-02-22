import React from 'react';
import { NavLink } from 'react-router-dom';
import HomePage from '../HomePage';
import AboutPage from '../AboutPage';
import PlanPage from '../PlanPage';
import ServicePage from '../ServicePage';
import ContactPage from '../ContactPage'

export const MENU_LIST = {
    non_login: [
        { icon: "fe fe-home", label: "Home", url: '/', component: HomePage },
     //   { icon: "fe fe-address-card-o", label: "About Us", url: '/aboutus', component: AboutPage },
        { icon: "fe fe-activity", label: "Plans", url: "/plans", component: PlanPage },
     //   { icon: "fe fe-briefcase", label: "Service", url: "/services", component: ServicePage },
       // { icon: "fe fe-map-pin", label: "Contact Us", url: "/contactus", component: ContactPage },
    ],
};

const Menu = (props) => {
    let showAccount = '';
    if (props.is_customer) {
        showAccount = (
            <li className="nav-item">
                <NavLink to='/myaccount' className="nav-link" exact activeClassName="active">
                    <i className="fe fe-user"></i>My Account
                </NavLink>
            </li>
        );
    }

    return (
        <div className={"header d-lg-flex p-0 " + (props.menuShow ? '' : 'collapse')}>
            <div className="container">
                <div className="row row align-items-center">
                    <div className="col-lg-3 ml-auto"></div>
                    <div className="col col-lg order-lg-first">
                        <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
                            {MENU_LIST.non_login.map((menu, index) => {
                                return (<li key={index} className="nav-item">
                                    <NavLink to={menu.url} className="nav-link" exact activeClassName="active">
                                        <i className={menu.icon}></i>{menu.label}
                                    </NavLink>
                                </li>);
                            })}
                            {showAccount}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Menu;