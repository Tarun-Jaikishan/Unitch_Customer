import React, { Component } from 'react';
import SpinnerLoading from '../components/Spinner';
import BouquetSelectionListing from '../components/BouquetSelectionListing';
import { Button } from 'react-floating-action-button'
import * as action from '../redux/action/index';
import { connect } from 'react-redux';
import { ArrowRight } from 'react-bootstrap-icons';
import { history } from '../utilits';

class RenewalPage extends Component {

    componentDidMount() {
        console.log("Location state", this.props.location.state);
        if (this.props.location.state.bouquet_ids !== undefined) {
            this.props.fetchBouquets(this.props.location.state.bouquet_ids, this.props.location.state.account_id);
        }
    }

    handleBouquetList = (id, type) => {
        this.props.addSelectedBouquet(id, type);
    }


    render() {
        let content = <SpinnerLoading />;
        console.log("Redus props data", this.props.bouquets, this.props.bouquet_id);

        if (this.props.bouquets) {
            content = (<>
                {this.props.bouquets.base.length > 0 &&
                    <BouquetSelectionListing
                        removeBouquet={this.handleBouquetList}
                        bouquets={this.props.bouquets.base}
                        is_checked={true}
                        disabled={true}
                        title="Base Bouquet"
                    />
                }
                {this.props.bouquets.addon.length > 0 &&
                    <BouquetSelectionListing
                        removeBouquet={this.handleBouquetList}
                        bouquets={this.props.bouquets.addon}
                        is_checked={true}
                        title="Addons Bouquet"
                    />
                }
                {this.props.bouquets.alacarte.length > 0 &&
                    <BouquetSelectionListing
                        removeBouquet={this.handleBouquetList}
                        bouquets={this.props.bouquets.alacarte}
                        is_checked={true}
                        title="Alacarte Bouquet"
                    />
                }
            </>);
        }

        return (
            <div>
                <div className="page-header">
                    <h1 className="page-title">Renew Account</h1>
                </div>
                <div className="row">
                    {content}
                    <div className="floating-btn">
                        <Button variant="primary" onClick={() => history.push({
                            pathname: '/myaccount/period',
                            search: '',
                            state: { bouquet_ids: this.props.bouquet_id, account_id: this.props.account_id, type: "renewal" }
                        })} > Next <ArrowRight /> </Button>
                    </div>
                </div>
            </div >
        );
    }

}

const mapStateToProps = (state) => {
    return {
        bouquets: state.customer.renewal.bouquets,
        bouquet_id: state.customer.renewal.bouquet_id,
        account_id: state.customer.renewal.account_id
    };

}

const mapDispatchToProps = dispatch => {
    return {
        fetchBouquets: (bouquet_ids, account_id) => dispatch(action.fetchBouquets(bouquet_ids, account_id)),
        addSelectedBouquet: (bouque_id, is_add) => dispatch(action.addSelectedBouquet(bouque_id, is_add, true))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RenewalPage)
