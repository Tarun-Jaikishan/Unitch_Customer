import React, { Component } from 'react';
import { Modal, Button, Form, Container, Alert, Col, Row } from 'react-bootstrap';
import { isNumeric, isTokenValid, history } from '../utilits';
import { API_SETTING, USER_TOKEN, SITE_SETTING } from '../env.conf';
import { api } from '../axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../redux/action/index';

class OtpVerificationModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                email_otp: {
                    required: SITE_SETTING.settings.enable_email_verification,
                    value: "",
                    validation: isNumeric,
                    errorMsg: null
                },
                mobile_otp: {
                    required: true,
                    value: "",
                    validation: isNumeric,
                    errorMsg: null
                },
            },
            message: "",
            modal_show: false,
            savingdata: false
        }
    }

    handleChange = (e) => {
        let form = { ...this.state.form };
        form[e.target.name].value = e.target.value;
        this.setState({
            form: { ...form }
        });
    }

    isFormValid = () => {
        let isvalid = true;
        const forms = { ...this.state.form };
        for (var field in forms) {
            if (forms[field].required && forms[field].value.length === 0) {
                forms[field].errorMsg = "Field required,cannot be empty.";
                isvalid = isvalid && false;
                console.log(field, isvalid, 'required');
            }
            if (typeof forms[field].validation === 'function' && forms[field].value !== null && forms[field].value.length > 0) {
                forms[field].errorMsg = !forms[field].validation(forms[field].value) ? " Invalid data." : "";
                isvalid = isvalid && forms[field].validation(forms[field].value);
                console.log(field, isvalid, 'function');
            }
        }

        if (!isvalid) {
            this.setState({
                form: {
                    ...forms
                }
            });
        }
        console.log("is form valid", isvalid);
        return isvalid;
    }

    handleClose = () => {
        this.setState({ savingdata: false });
        this.props.handleClose();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ savingdata: true });

        if (this.isFormValid()) {
            const form = {
                subscriber_id: this.props.subscriber_id
            };
            const frm = { ...this.state.form };
            for (var field in frm) {
                form[field] = frm[field].value;
            }
            const formData = {
                ...this.props.formdata,
                ...form
            }
            this.verifyOtp(formData);
        } else {
            this.setState({ savingdata: false });
        }
    }

    verifyOtp = (formData) => {
        const token = isTokenValid(USER_TOKEN);
        if (token) {
            const url = this.props.url ? this.props.url : "subscriber/update-contacts";
            const headers = {
                "Authorization": `Bearer ${token}`, 'authkey': API_SETTING.authkey
            }
            return api.post(url, formData, { headers })
                .then(resp => {
                    console.log('update contacts', resp.data.data);
                    if (resp.data.success) {
                        if (this.props.url) {
                            this.setState({
                                modal_show: true
                            });
                            setTimeout(() => { this.props.logout() }, 5000);
                        } else {
                            history.push({
                                pathname: '/profile',
                                hash: "#",
                                search: '?=1',
                                state: { message: resp.data.data.message }
                            });
                            this.handleClose();
                            return {
                                status: resp.data.data.success,
                                message: resp.data.data.message
                            };
                        }
                    }
                }).catch(error => {
                    if (error.response) {
                        this.setState({
                            savingdata: false,
                            message: error.response.data.data.message.message
                        });
                    }
                    console.log("Error messages", error.response.data.data.message.message);
                });
        }
    }


    render() {
        const alertAndLogout = (<Modal
            show={this.state.modal_show}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                <Alert variant="success">
                    <p>Password changed successfully.</p>
                    <p>Please login again with the new password.</p>
                </Alert>
            </Modal.Body>
        </Modal>
        );
        return (
            <>
                <Modal show={this.props.modalshow} onHide={this.handleClose}>
                    <Form onSubmit={this.handleSubmit} >
                        <Modal.Header closeButton={true} aria-label={"Close"}>
                            <Modal.Title>Verify OTP</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="show-grid">
                            <Container>
                                {
                                    this.state.message && <Alert key="error_alert" variant="danger">
                                        {this.state.message}
                                    </Alert>
                                }
                                <Row>
                                    {SITE_SETTING.settings.enable_email_verification && <Col xs={12} md={8}>
                                        <Form.Group controlId="email_id">
                                            <Form.Label>Email OTP</Form.Label>
                                            <Form.Control className="input-sm" type="text" name="email_otp"
                                                placeholder="Enter email otp"
                                                value={this.state.form.email_otp.value} onChange={this.handleChange} />
                                            {this.state.form.email_otp.errorMsg && (
                                                <p className="text-danger">{this.state.form.email_otp.errorMsg}</p>
                                            )}
                                        </Form.Group>
                                    </Col>}
                                    <Col xs={12} md={8}>
                                        <Col xs={12} md={8}>
                                            <Form.Group controlId="mobile_id">
                                                <Form.Label>Mobile No. OTP</Form.Label>
                                                <Form.Control className="input-sm" type="text" name="mobile_otp"
                                                    placeholder="Enter mobile no otp"
                                                    value={this.state.form.mobile_otp.value} onChange={this.handleChange} />
                                                {this.state.form.mobile_otp.errorMsg && (
                                                    <p className="text-danger">{this.state.form.mobile_otp.errorMsg}</p>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    </Col>
                                </Row>
                            </Container>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.handleSubmit} disabled={this.state.savingdata}>
                                {this.state.savingdata ? "Saving data..." : "Save Changes"}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                {alertAndLogout}
            </>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(action.logout())
    }
}
export default connect(null, mapDispatchToProps)(withRouter(OtpVerificationModal));