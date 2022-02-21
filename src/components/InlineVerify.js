import React, { Component } from 'react';
import OtpValidation from './inlineverify/OtpValidation';
import InputData from './inlineverify/inputData';
import { Toast } from 'react-bootstrap';

class InlineVerfiy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            enable_verify: false,
            contact_detail: props.field_value,
            otp: '',
            is_otp_form_validated: false,
            show_otp_send_toast: false,
            message: ""
        }
    }

    handleOnChange = (e) => {
        this.setState({
            contact_detail: e.target.value
        });
    }

    handleOnChangeOtp = (e) => {
        this.setState({
            show_otp_send_toast: false,
            otp: e.target.value
        });
    }

    initiateOtpVerification = (e) => {
        this.setState({
            enable_verify: true
        });
    }

    handleOtpSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return false;
        }
        console.log("validating success");
        const response = await this.props.callback(this.state.contact_detail);
        console.log("responee from sent otp", response);
        if (response) {
            this.setState({
                is_otp_form_validated: true,
                show_otp_send_toast: true,
                message: response.message
            });
        }
    }

    verifyOtpSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return false;
        }

        const response = await this.props.updateCallback(this.state.contact_detail, this.state.otp);
        console.log("Update ajax",response);
        if (response) {
            if (response.status) {
                this.setState({
                    enable_verify: false,
                    show_otp_send_toast: true,
                    message: response.message
                });
            }
        }
        return true;
    }

    render() {

        // basic display
        let content = (
            <div>
                <span className="text-secondary">{this.props.field_value}</span>
                {this.props.is_verified ?
                    <span className='text-success'>
                        <i className='fe fe-user-check'></i>
                    </span>
                    :
                    <button className='btn btn-outline-danger' id={this.props.field_name}
                        onClick={(e) => this.initiateOtpVerification(e)}>
                        <i className='fe fe-user-check'></i>
                    </button>
                }
            </div>
        );

        if (this.state.enable_verify) {
            content = (
                <div>
                    <InputData field_name={this.props.field_name}
                        field_value={this.state.contact_detail}
                        handleOnChange={this.handleOnChange}
                        handleOtpSubmit={this.handleOtpSubmit}
                        is_otp_form_validated={this.state.is_otp_form_validated}
                        max_length={this.props.max_length}
                    />
                    {this.state.is_otp_form_validated && <OtpValidation
                        verifyOtpSubmit={this.verifyOtpSubmit}
                        handleOnChangeOtp={this.handleOnChangeOtp}
                        otp={this.state.otp}
                    />}
                    <Toast show={this.state.show_otp_send_toast} onClose={() => this.setState({ show_otp_send_toast: false })}>
                        <Toast.Header></Toast.Header>
                        <Toast.Body>{this.state.message}</Toast.Body>
                    </Toast>
                </div>
            )
        }

        return content;
    }


}

export default InlineVerfiy;