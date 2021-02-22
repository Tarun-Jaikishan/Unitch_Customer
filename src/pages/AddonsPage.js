import React, { Component } from 'react';
import SpinnerLoading from '../components/Spinner';
import BouquetSelectionListing from '../components/BouquetSelectionListing';
import { Button } from 'react-floating-action-button'
import * as action from '../redux/action/index';
import { connect } from 'react-redux';
import { ArrowRight } from 'react-bootstrap-icons';
import { history } from '../utilits';

class AddonsPage extends Component {

    componentDidMount() {
        console.log("Location state", this.props.location.state);
        if (this.props.location.state.account_id !== undefined) {
            this.props.fetchAddons(this.props.location.state.account_id);
        }
    }

    handleBouquetList = (id, type) => {
        this.props.addSelectedBouquet(id, type);
    }

    render() {
        let content = <SpinnerLoading />;

        if (this.props.bouquets) {
            content = (<>
                {this.props.bouquets.addon.length > 0 &&
                    <BouquetSelectionListing
                        removeBouquet={this.handleBouquetList}
                        bouquets={this.props.bouquets.addon}
                        is_checked={false}
                        title="Addons Bouquet"
                    />
                }
                {this.props.bouquets.alacarte.length > 0 &&
                    <BouquetSelectionListing
                        removeBouquet={this.handleBouquetList}
                        bouquets={this.props.bouquets.alacarte}
                        is_checked={false}
                        title="Alacarte Bouquet"
                    />
                }
            </>)
        }

        return (
            <div>
                <div className="page-header">
                    <h1 className="page-title">Addons</h1>
                </div>
                <div className="row">
                    {content}
                    <div className="floating-btn">
                        <Button variant="primary" onClick={() => history.push({
                            pathname: '/myaccount/period',
                            search: '',
                            state: { bouquet_ids: this.props.bouquet_id, account_id: this.props.account_id, type: "addon" }
                        })} > Next <ArrowRight /> </Button>
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
