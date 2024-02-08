import React, { Component } from "react";
import SpinnerLoading from "../components/Spinner";
import { api } from "../axios";
import PriceList from "../components/PriceList";
import { getPaymentUrl, history, isTokenValid } from "../utilits";
import { Alert } from "react-bootstrap";
import { BACKURL, USER_TOKEN, API_SETTING } from "../env.conf";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

class PeriodSelectionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      period_list: null,
      rperiod_id: null,
      is_error: false,
      error_message: null,
      account_id: null,
      bouquet_ids: null,
      type: null,
    };
  }

  componentDidMount() {
    let bouquet_ids;
    let account_id;
    let type;
    //this.props.location.state.bouquet_ids !== undefined && this.props.location.state.account_id !== undefined

    if (this.props.match !== undefined) {
      if (this.props.match.params.account_id) {
        account_id = this.props.match.params.account_id;
      }

      if (this.props.match.params.bouque_ids) {
        bouquet_ids = this.props.match.params.bouque_ids.split(",");
      }

      if (this.props.match.params.type) {
        type = this.props.match.params.type;
      }
    } else if (this.props.location.state !== undefined) {
      if (this.props.location.state.bouquet_ids !== undefined) {
        bouquet_ids = this.props.location.state.bouquet_ids.split(",");
      }
      if (this.props.location.state.account_id !== undefined) {
        account_id = this.props.location.state.account_id;
      }
      if (this.props.location.state.type !== undefined) {
        type = this.props.location.state.type;
      }
    }

    if (account_id && bouquet_ids) {
      const url = `recharge-period/${bouquet_ids.join("-")}/mview`;
      const reqData = { account_id: account_id };
      const token = isTokenValid(USER_TOKEN);
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          authkey: API_SETTING.authkey,
        };
        api
          .post(url, reqData, { headers })
          .then((resp) => {
            const d = resp.data.data;
            if (d[0]) {
              const data = Object.values(d[0]);
              this.setState({
                period_list: [...data],
                account_id: account_id,
                bouquet_ids: bouquet_ids,
                type: type,
              });
            }
          })
          .catch((err) => {
            if (err) {
              if (err.response.status === 422) {
                this.setState({
                  is_error: true,
                  error_message: err.response.data.data.message,
                });
              }
            }
          });
      }
    } else {
      history.push({
        pathname: "/myaccount",
        hash: "#",
        search: "",
        state: {},
      });
    }
  }

  handleOnChange = (e) => {
    this.setState({
      rperiod_id: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.bouquet_ids !== null &&
      this.state.account_id !== null &&
      this.state.rperiod_id !== null
    ) {
      document.getElementById("checkout").submit();
    }
  };

  render() {
    let hiddenform = "";

    if (this.state.bouquet_ids !== null && this.state.account_id !== null) {
      const rperiod_id = this.state.rperiod_id;
      hiddenform = (
        <form method="post" action={getPaymentUrl()} id="checkout">
          <input type="hidden" name="rperiod_id" value={rperiod_id} />
          <input
            type="hidden"
            name="account_ids"
            value={this.state.account_id}
          />
          <input
            type="hidden"
            name="remark"
            value="Renewal from Customer portal"
          />
          <input type="hidden" name="type" value={this.state.type} />
          <input type="hidden" name="backurl" value={BACKURL} />
          {this.state.bouquet_ids.map((b, i) => (
            <input type="hidden" name="bouque_ids[]" value={b} />
          ))}
        </form>
      );
    }

    let content = <SpinnerLoading />;

    if (this.state.period_list) {
      content = (
        <div className="card">
          <div className="p-5">
            <div className="d-flex justify-content-center w-full">
              <div className="d-flex flex-gap flex-wrap">
                {this.state.period_list.map((d, index) => (
                  <PriceList
                    id={d.id}
                    key={d.id}
                    ncf_mrp_price={d.NcfMrpPrice}
                    ncf_mrp_tax={d.NcfMrpTax}
                    ncf_mrp_total={d.NcfMrpTotal}
                    mrp_amount={d.mrpAmount}
                    mrp_price={d.mrpPrice}
                    mrp_tax={d.mrpTax}
                    mrp_total={d.mrpTotal}
                    name={d.name}
                    ncf_sd_channel_count={d.ncf_sd_channel_count}
                    ncf_sd_channels={d.ncf_sd_channels}
                    nonncf_channel_count={d.nonncf_channel_count}
                    handleOnChange={this.handleOnChange}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="d-flex w-full justify-content-center pb-5">
            <button
              className="btn btn-purple px-5"
              disabled={!this.state.rperiod_id}
              onClick={this.handleSubmit}
            >
              Checkout
            </button>
          </div>
          <div>{hiddenform}</div>
        </div>
      );
    }

    if (this.state.is_error) {
      content = (
        <Alert variant="danger">
          {this.state.error_message}.
          <Alert.Link
            href="#"
            onClick={() =>
              history.push({
                pathname: "/myaccount",
                hash: "#",
                search: "",
                state: {},
              })
            }
          >
            Go to My Account
          </Alert.Link>
          .
        </Alert>
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
          Period
        </div>
        <div>{content}</div>
      </div>
    );
  }
}

export default PeriodSelectionPage;
