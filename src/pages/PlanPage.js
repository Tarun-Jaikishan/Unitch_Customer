import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav'
import NavLink from 'react-bootstrap/NavLink';
import TabContainer from 'react-bootstrap/TabContainer'
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane'
import Spinner from '../components/Spinner';
import * as action from '../redux/action/index';
import PlanList from '../components/PlanList';
import { NavItem } from 'react-bootstrap';
import PlanDetails from '../components/PlanDetails';


class PlanPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            modalShow: false,
            bouquet_id: null
        }
    }


    componentDidMount() {
        if (Object.keys(this.props.bouquet).length <= 0) {
            this.props.fetchPlans();
        }
    }

    openChannelList = (id) => {
        this.setState({
            bouquet_id: id,
            modalShow: true
        });

        console.log('openchannel list',this.state);
    };

    setModalShow = () => {
        this.setState({
            modalShow: !this.state.modalShow
        });
    }


    render() {
        let contents = <Spinner />;

        if (Object.keys(this.props.bouquet).length > 0) {
            contents = (
                <div className="card">
                    <TabContainer id="left-tabs-example" defaultActiveKey="first" variant="pills">
                        <div className="card-header">
                            <Nav variant="pills" className="flex-row nav nav-tabs Tab_header_tabs">
                                <NavItem className="nav-item">
                                    <NavLink className="nav-link" eventKey="first">Base</NavLink>
                                </NavItem>
                                <NavItem className="nav-item">
                                    <NavLink className="nav-link" eventKey="second">Addon</NavLink>
                                </NavItem>
                                <NavItem className="nav-item">
                                    <NavLink className="nav-link" eventKey="third">Alacarte</NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                        <div className="card-body">
                            <TabContent>
                                <TabPane eventKey="first">
                                    <PlanList bouquets={this.props.bouquet.base} callback={this.openChannelList} />
                                </TabPane>
                                <TabPane eventKey="second">
                                    <PlanList bouquets={this.props.bouquet.addon} callback={this.openChannelList} />
                                </TabPane>
                                <TabPane eventKey="third">
                                    <PlanList bouquets={this.props.bouquet.alacarte} callback={this.openChannelList} />
                                </TabPane>
                            </TabContent>
                        </div>
                    </TabContainer>

                    {this.state.bouquet_id && <PlanDetails id={this.state.bouquet_id} modalShow={this.state.modalShow} setModalShow={this.setModalShow} />}
                </div>
            );
        }

        return (
            <div>
                <div className="page-header">
                    <h1 className="page-title">Plan List</h1>
                </div>
                <div className="row">
                    {contents}
                </div>
            </div >
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        bouquet: state.plan.bouquet
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPlans: () => dispatch(action.bouquet())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlanPage)