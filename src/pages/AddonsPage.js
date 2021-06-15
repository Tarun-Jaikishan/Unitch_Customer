import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SpinnerLoading from '../components/Spinner';
import BouquetSelectionListing from '../components/BouquetSelectionListing';
import { Button } from 'react-floating-action-button'
import * as action from '../redux/action/index';
import { connect } from 'react-redux';
import { ArrowRight } from 'react-bootstrap-icons';
import { history } from '../utilits';
import Alert from 'react-bootstrap/Alert';
import { matchString } from '../utilits';
import SearchBar from '../components/SearchBar';

class AddonsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchVal: "",
            account_id: null
        }
    }

    componentDidMount() {
        let account_id;

        if (this.props.match !== undefined) {
            if (this.props.match.params.account_id) {
                account_id = this.props.match.params.account_id;
            }

        } else if (this.props.location.state !== undefined) {
            if (this.props.location.state.account_id !== undefined) {
                account_id = this.props.location.state.account_id;
            }
        }

        if (account_id !== undefined) {
            this.setState({ account_id: account_id });
            this.props.fetchAddons(account_id);
        }
    }

    handleBouquetList = (id, type) => {
        this.props.addSelectedBouquet(id, type);
    }

    handleSubmit = () => {
        if (this.props.bouquet_id.length > 0) {
            history.push({
                pathname: `/myaccount/period/${this.state.account_id}/${this.props.bouquet_id}/addon`,
                search: '',
                state: { bouquet_ids: this.props.bouquet_id, account_id: this.state.account_id, type: "addon" }
            })
        }
    }

    handleSearch = (srch) => {
        this.setState({
            searchVal: srch
        });
    }


    render() {
        let content = <SpinnerLoading />;

        if (this.props.bouquets) {

            const addonsList = this.props.bouquets.addon.filter(e => {
                return matchString(e.name, this.state.searchVal);
            });

            const alacarteList = this.props.bouquets.alacarte.filter(e => {
                return matchString(e.name, this.state.searchVal);
            });

            const addonDisplay = (
                this.props.bouquets.addon.length > 0 &&
                <BouquetSelectionListing
                    removeBouquet={this.handleBouquetList}
                    bouquets={addonsList}
                    is_checked={false}
                    title="Addons Bouquet"
                />
            );

            const alacarteDisplay = (
                this.props.bouquets.alacarte.length > 0 &&
                <BouquetSelectionListing
                    removeBouquet={this.handleBouquetList}
                    bouquets={alacarteList}
                    is_checked={false}
                    title="Alacarte Bouquet"
                />
            );

            content = (<>{addonDisplay}{alacarteDisplay} </>)
        }

        return (
            <div>
                <div className="page-header">
                    <Container>
                        <Row>
                            <Col xs={6}>
                                <h1 className="page-title">Addons</h1>
                            </Col>
                            <Col>
                                <SearchBar callback={this.handleSearch} searchVal={this.state.searchVal} />
                            </Col>
                        </Row>
                    </Container>


                </div>
                {this.props.bouquet_id.length === 0 &&
                    (<Alert variant="danger">
                        Please select atleast one bouquet.
                    </Alert>)}

                <div className="row">
                    {content}
                    <div className="floating-btn">
                        <Button variant="primary" onClick={() => this.handleSubmit()} > Next <ArrowRight /> </Button>
                    </div>
                </div>
            </div >
        );
    }

}

const mapStateToProps = (state) => {
    return {
        bouquets: state.customer.addons.bouquets,
        bouquet_id: state.customer.addons.bouquet_id,
        account_id: state.customer.addons.account_id
    };

}

const mapDispatchToProps = dispatch => {
    return {
        fetchAddons: (account_id) => dispatch(action.fetchAddons(account_id)),
        addSelectedBouquet: (bouque_id, is_add) => dispatch(action.addSelectedBouquet(bouque_id, is_add, false))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddonsPage);
