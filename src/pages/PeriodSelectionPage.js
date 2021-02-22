import React, { Component } from 'react';
import SpinnerLoading from '../components/Spinner';
import { api } from '../axios';
import PriceList from '../components/PriceList';
import { getPaymentUrl, history, isTokenValid } from '../utilits';
import { Alert, Button } from 'react-bootstrap';
import { BACKURL, USER_TOKEN, API_SETTING } from '../env.conf';

class PeriodSelectionPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            period_list: null,
            rperiod_id: null,
            is_error: false,
            error_message: null,
        }
    }

    componentDidMount() {
        console.log("Period location state", this.props.location.state);
        if (this.props.location.state.bouquet_ids !== undefined && this.props.location.state.account_id !== undefined) {
            console.log('Location state', this.props.location.state);
            const url = `recharge-period/${this.props.location.state.bouquet_ids.join("-")}/mview`;
            const reqData = { account_id: this.props.location.state.account_id };
            const token = isTokenValid(USER_TOKEN);
            if (token) {
                const headers = { "Authorization": `Bearer ${token}`, 'authkey': API_SETTING.authkey }
                api.post(url, reqData, { headers })
                    .then(resp => {
                        const d = resp.data.data;
                        if (d[0]) {
                            const data = Object.values(d[0]);
                            console.log("api data", data)
                            this.setState({
                                period_list: [...data]
                            })
                        }
                    }).catch(err => {
                        if (err) {
                            console.log(err);
                            // if(err.response.data.status === 422){
                            //     this.setState({
                            //         is_error: true,
                            //         error_message: err.response.data.data.message
                            //     });
                            // }
                        }
                    });
            }
        } else {
            console.log("wqlkanlkqsanlqsa");
            history.push('/myaccount');
        }
    }

    handleOnChange = (e) => {
        console.log('reacharge period selected', e.target.value);
        this.setState({
            rperiod_id: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.props.location.state.bouquet_ids !== undefined &&
            this.props.location.state.account_id !== undefined &&
            this.state.rperiod_id != null
        ) {
            document.getElementById('checkout').submit();
        }

    }

    render() {
        let hiddenform = "";

        if (this.props.location.state.bouquet_ids !== undefined &&
            this.props.location.state.account_id !== undefined) {
            const rperiod_id = this.state.rperiod_id;
            hiddenform = (
                <form method="post" action={getPaymentUrl()} id="checkout">
                    <input type="hidden" name="rperiod_id" value={rperiod_id} />
                    <input type="hidden" name="account_ids" value={this.props.location.state.account_id} />
                    <input type="hidden" name="remark" value="Renewal from Customer portal" />
                    <input type="hidden" name="type" value={this.props.location.state.type} />
                    <input type="hidden" name="backurl" value={BACKURL} />
                    {this.props.location.state.bouquet_ids.map((b, i) => <input type="hidden" name="bouque_ids[]" value={b} />)}
                </form>
            );
        }

        let content = <SpinnerLoading />

        if (this.state.period_list) {
            content = (
                <div className="card col col-12 col-sm-12 col-lg-12">
                    <div className="card-header">
                        <h3 className="card-title">Period</h3>
                    </div>
                    <div className="card-body">
                        <div className="row row-cards">
                            {
                                this.state.period_list.map((d, index) => <PriceList
                                    id={d.id}
                                    key={index}
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
                                )
                            }
                        </div>
                    </div>
                    <div className="card-footer">
                        <Button variant="secondary" size="lg" disabled={!this.state.rperiod_id} onClick={this.handleSubmit}>Checkout</Button>
                    </div>
                    <div>
                        {hiddenform}
                    </div>
                </div>
            );
        }

        if (this.state.is_error) {
            content = (
                <Alert variant="danger">
                    {this.state.error_message}.
                    <Alert.Link href="#" onClick={() => history.push({
                        pathname: '/myaccount',
                        search: '',
                        state: {}
                    })}>Go to My Account</Alert.Link>.
                </Alert>
            );
        }
        return content;
    }

}

export default PeriodSelectionPage;