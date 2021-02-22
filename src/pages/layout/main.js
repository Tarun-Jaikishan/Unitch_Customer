import React, { Component } from 'react';

import Header from './header';
import Footer from './footer';
import Menu from './menu';

class MainLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuShow: false
        };
    }

    showMenu = () => {
        this.setState((state) => ({
            menuShow: !this.state.menuShow
        }));
    }

    render() {
        return (
            <div className="page" >
                <div className="page-main">
                    <Header showMenu={this.showMenu} is_customer={this.props.is_customer}/>
                    <Menu menuShow={this.state.menuShow} is_customer={this.props.is_customer}/>
                    <div className="page-content">
                        <div className="container mb-9">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

}

export default MainLayout;