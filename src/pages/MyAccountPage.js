import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../redux/action/index';
import SpinnerLoading from '../components/Spinner';
import AccountPage from './myaccount/AccountPage';
import { api } from '../axios';
import { API_SETTING, USER_TOKEN } from '../env.conf';
import { isTokenValid } from '../utilits';

class MyAccountPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            adv_banner: []
        }
    }


    componentDidMount() {
        this.props.fetchAccount();
        this.advertiseBanner();
    }

    advertiseBanner = () => {
        const token = isTokenValid(USER_TOKEN);
        if (token) {
            const url = `app-advertisement-banner`;
            const headers = { "Authorization": `Bearer ${token}`, 'authkey': API_SETTING.authkey }
            api.get(url,{headers:headers})
                .then(resp => {
                    const d = resp.data.data;
                    const banners = [];
                    for (let b in d) {
                        const banner = d[b];
                        banners.push({
                            title: banner.title,
                            caption: banner.caption,
                            description: banner.description,
                            imageUrl: banner.imageUrl,
                            id: banner.id
                        });
                    }
                    if (banners.length > 0) {
                        this.setState({
                            adv_banner: [...banners]
                        });
                    }
                }).catch(err => {
                    console.log('Banner error', err);
                });
        }
    }

    render() {
        let content = (<SpinnerLoading />);
        if (Object.keys(this.props.profile).length !== 0) {
            content = (<div className="row">
                <div className="col-md-12 mb-12">
                    <AccountPage accounts={this.props.accounts} pygt={this.props.pygt} banners={this.state.adv_banner} />
                </div>
            </div>);
        }

        return content;
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.customer.profile,
        accounts: state.customer.accounts,
        loading: state.customer.loading,
        error: state.customer.error,
        is_customer: state.auth.is_customer,
        pygt:state.auth.pygt
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAccount: () => dispatch(action.fetchAccounts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountPage)
