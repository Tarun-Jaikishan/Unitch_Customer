import React, { Component } from "react";
import SpinnerLoading from "../components/Spinner";
import BouquetSelectionListing from "../components/BouquetSelectionListing";
import * as action from "../redux/action/index";
import { connect } from "react-redux";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { history } from "../utilits";
import Alert from "react-bootstrap/Alert";

class RenewalPage extends Component {
  componentDidMount() {
    let account_id;
    let bouquet_ids;

    if (this.props.match !== undefined) {
      if (this.props.match.params.account_id) {
        account_id = this.props.match.params.account_id;
      }

      if (this.props.match.params.bouque_ids) {
        bouquet_ids = this.props.match.params.bouque_ids.split(",");
      }
    } else if (this.props.location.state !== undefined) {
      if (this.props.location.state.bouquet_ids !== undefined) {
        bouquet_ids = this.props.location.state.bouquet_ids.split(",");
      }
      if (this.props.location.state.account_id !== undefined) {
        account_id = this.props.location.state.account_id;
      }
    }

    if (account_id && bouquet_ids) {
      this.props.fetchBouquets(bouquet_ids, account_id);
    }
  }

  handleBouquetList = (id, type) => {
    this.props.addSelectedBouquet(id, type);
  };

  handleSubmit = () => {
    if (this.props.bouquet_id.length > 0) {
      history.push({
        pathname: `/myaccount/period/${this.props.account_id}/${this.props.bouquet_id}/renewal`,
        hash: "#",
        search: "",
        state: {
          bouquet_ids: this.props.bouquet_id,
          account_id: this.props.account_id,
          type: "renewal",
        },
      });
    }
  };

  render() {
    let content = <SpinnerLoading />;
    if (this.props.bouquets) {
      content = (
        <>
          {this.props.bouquets.base.length > 0 && (
            <BouquetSelectionListing
              removeBouquet={this.handleBouquetList}
              bouquets={this.props.bouquets.base}
              is_checked={true}
              disabled={true}
              title="Base Bouquet"
            />
          )}
          {this.props.bouquets.addon.length > 0 && (
            <BouquetSelectionListing
              removeBouquet={this.handleBouquetList}
              bouquets={this.props.bouquets.addon}
              is_checked={true}
              title="Addons Bouquet"
            />
          )}
          {this.props.bouquets.alacarte.length > 0 && (
            <BouquetSelectionListing
              removeBouquet={this.handleBouquetList}
              bouquets={this.props.bouquets.alacarte}
              is_checked={true}
              title="Alacarte Bouquet"
            />
          )}
        </>
      );
    }

    return (
      <div>
        <div className="text-xl d-flex align-items-center flex-gap mb-3">
          <Link
            to="/myaccount"
            type="button"
            className="btn bg-purple text-white rounded-lg py-1 px-2 text-lg btn-sm"
          >
            <ArrowLeft />
          </Link>
          Renew Account
        </div>
        {this.props.bouquet_id.length === 0 && (
          <Alert variant="danger">
            Please select atleast one bouquet to renew.
          </Alert>
        )}
        <div>
          {content}
          <div className="w-full d-flex justify-content-end">
            <button
              className="btn btn-purple px-5"
              onClick={() => this.handleSubmit()}
            >
              Next <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bouquets: state.customer.renewal.bouquets,
    bouquet_id: state.customer.renewal.bouquet_id,
    account_id: state.customer.renewal.account_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBouquets: (bouquet_ids, account_id) =>
      dispatch(action.fetchBouquets(bouquet_ids, account_id)),
    addSelectedBouquet: (bouque_id, is_add) =>
      dispatch(action.addSelectedBouquet(bouque_id, is_add, true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenewalPage);
