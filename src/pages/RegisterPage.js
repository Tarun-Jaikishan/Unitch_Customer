import React, { Component } from 'react';
import { extApi } from '../axios';
import { FormErrorDisplay, history, isTokenValid } from '../utilits';
import { Button, Alert } from 'react-bootstrap';
import { USER_AUTH_TOKEN, API_SETTING } from '../env.conf';

class RegisterPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            form: {
                customer_id: {
                    value: "",
                    error: "",
                    is_valid: false
                },
                box_no: {
                    value: "",
                    error: "",
                    is_valid: false
                },
                password: {
                    value: "",
                    error: "",
                    is_valid: false
                },
                confirm_password: {
                    value: "",
                    error: "",
                    is_valid: false
                },
                otp: {
                    value: "",
                    error: "",
                    is_valid: false
                }
            },
            otp_text: "Send OTP",
            msg: null,
            msg_type: null
        };

    }

    sendOtp = () => {
        if (this.state.form.customer_id.value && this.state.form.box_no.value) {
            const url = "/webcustomer/send-otp";
            const request = { "customer_detail": this.state.form.customer_id.value, "account_detail": this.state.form.box_no.value };
            const token = isTokenValid(USER_AUTH_TOKEN);
            if (token) {
                const headers = { "Authorization": `Bearer ${token}`, 'authkey': API_SETTING.authkey };
                extApi.post(url, request, { headers: headers })
                    .then(response => {
                        let data = response.data.data;
                        if (data.success) {
                            this.setState({
                                ...this.state,
                                otp_text: "Re-Send OTP",
                                msg_type: "success",
                                msg: data.message
                            });
                        } else {
                            this.setState({
                                ...this.state,
                                otp_text: "Re-Send OTP",
                                msg_type: "danger",
                                msg: data.message
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }

    handleChanges = (e) => {
        let form = { ...this.state.form };

        form[e.target.name].value = e.target.value;
        this.setState({
            form: { ...form }
        });
    }


    validate = () => {
        const form = Object.assign(this.state.form);
        let is_valid = true;

        if (!form.customer_id.value) {
            form.customer_id.is_valid = false;
            form.customer_id.error = "Customer Id/Mobile No cannot be empty.";
            is_valid = is_valid && false;
        }

        if (!form.box_no.value) {
            form.box_no.is_valid = false;
            form.box_no.error = "Customer Smartcard No./STB No. No cannot be empty.";
            is_valid = is_valid && false;
        }

        if (!form.otp.value) {
            form.otp.is_valid = false;
            form.otp.error = "OTP No cannot be empty.";
            is_valid = is_valid && false;
        }

        if (!form.password.value) {
            form.password.is_valid = false;
            form.password.error = "Password No cannot be empty.";
            is_valid = is_valid && false;
        }

        if (!form.confirm_password.value) {
            form.confirm_password.is_valid = false;
            form.confirm_password.error = "Confirm Password cannot be empty.";
            is_valid = is_valid && false;
        }

        if (form.password.value && form.confirm_password.value) {
            if (form.password.value !== form.confirm_password.value) {
                form.confirm_password.is_valid = false;
                form.customer_id.error = "Password and confirm password must be same.";
                is_valid = is_valid && false;
            }
        }

        if (!is_valid) {
            this.setState({
                ...this.state,
                form: { ...form }
            });
        }
        return is_valid;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            const url = "/webcustomer/signup";
            const request = {
                customer_detail: this.state.form.customer_id.value,
                account_detail: this.state.form.box_no.value,
                password: this.state.form.password.value,
                otp: this.state.form.otp.value
            }
            const token = isTokenValid(USER_AUTH_TOKEN);
            if (token) {
                const headers = { "Authorization": `Bearer ${token}`, 'authkey': API_SETTING.authkey };
                extApi.post(url, request, { headers: headers })
                    .then(response => {
                        let data = response.data.data;
                        if (data.success) {
                            history.push({
                                pathname: '/login',
                                search: '?is_suc=1',
                                state: { is_suc: 1 }
                            });
                        } else {
                            history.push({
                                pathname: '/login',
                                search: '?is_suc=2',
                                state: { is_suc: 2 }
                            })
                        }
                    })
                    .catch(err => {
                        if (err.response) {
                            let error = err.response.data.data.message;
                            console.log(error);
                            let message = "";
                            for (const property in error) {
                                message = `${message}. ${property}: ${error[property].join(' ')}`;
                            }
                            this.setState({
                                ...this.state,
                                msg_type: "danger",
                                msg: message
                            });
                        }
                    });
            }

        }
    }

    render() {
        return (
            <div className="row mb-9">
                <div className="col col-login mx-auto">
                    {this.state.msg && <Alert variant={this.state.msg_type} >{this.state.msg}</Alert>}
                    <form className="card" autoComplete="false">
                        <div className="card-body p-6">
                            <div className="card-title">Register Account</div>
                            <div className="form-group">
                                <label className="form-label">Customer Id/Mobile No.</label>
                                <input type="text" className="form-control" name="customer_id" id="customer_id" onChange={this.handleChanges} value={this.state.form.customer_id.value} />
                                {!this.state.form.customer_id.is_valid && <FormErrorDisplay error={this.state.form.customer_id.error} />}
                            </div>
                            <div className="form-group">
                                <label className="form-label">Smartcard No./STB No.</label>
                                <input type="text" className="form-control" name="box_no" id="box_no" onChange={this.handleChanges} value={this.state.form.box_no.value} />
                                {!this.state.form.box_no.is_valid && <FormErrorDisplay error={this.state.form.box_no.error} />}
                            </div>
                            <div className="form-group">
                                <label className="form-label">Enter OTP</label>
                                <div className="row">
                                    <div className="col-md-3 col-lg-6 col-xs-3">
                                        <input type="text" className="form-control" name="otp" id="otp" onChange={this.handleChanges} value={this.state.form.otp.value} />
                                    </div>
                                    <div className="col-md-3 col-lg-6 col-xs-3">
                                        <Button className="btn btn-default" onClick={this.sendOtp}>{this.state.otp_text}</Button>
                                    </div>
                                </div>
                                {!this.state.form.otp.is_valid && <FormErrorDisplay error={this.state.form.otp.error} />}
                            </div>
                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" name="password" id="password" onChange={this.handleChanges} value={this.state.form.password.value} />
                                {!this.state.form.password.is_valid && <FormErrorDisplay error={this.state.form.password.error} />}
                            </div>
                            <div className="form-group">
                                <label className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" name="confirm_password" id="confirm_password" onChange={this.handleChanges} value={this.state.form.confirm_password.value} />
                                {!this.state.form.confirm_password.is_valid && <FormErrorDisplay error={this.state.form.confirm_password.error} />}
                            </div>
                            <div className="form-footer">
                                <Button className="btn btn-block btn-primary" onClick={this.handleSubmit}>Login</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterPage;