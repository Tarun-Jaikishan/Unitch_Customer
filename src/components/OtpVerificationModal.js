import React, { Component } from 'react';
import { Modal, Button, Form, Container, Alert, Col, Row } from 'react-bootstrap';
import { isNumeric, isTokenValid, history } from '../utilits';
import { API_SETTING, USER_TOKEN } from '../env.conf';
import { api } from '../axios';


class OtpVerificationModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                email_otp: {
                    required: true,
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
            message: ""
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

    handleSubmit = (e) => {
        e.preventDefault();
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
        }
    }

    verifyOtp = (formData) => {
        const token = isTokenValid(USER_TOKEN);
        if (token) {
            const url = "subscriber/update-contacts?debug=1";
            const headers = {
                "Authorization": `Bearer ${token}`, 'authkey': API_SETTING.authkey
            }
            return api.post(url, formData, { headers })
                .then(resp => {
                    console.log('update contacts', resp.data.data);
                    if (resp.data.success) {
                        history.push({
                            pathname: '/profile',
                            hash: "#",
                            search: '?=1',
                            state: { message: resp.data.data.message }
                        });
                        this.props.handleClose();
                        return {
                            status: resp.data.data.success,
                            message: resp.data.data.message
                        };
                    }
                }).catch(error => {
                    if (error.response) {
                        this.setState({
                            message: error.response.data.data.message.message
                        });
                    }
                    console.log("Error messages", error.response.data.data.message.message);
                });
        }
    }

    render() {
        return (
            <Modal show={this.props.modalshow} onHide={this.props.handleClose}>
                <Form onSubmit={this.handleSubmit} >
                    <Modal.Header closeButton>
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
                                <Col xs={12} md={8}>
                                    <Form.Group controlId="email_id">
                                        <Form.Label>Email OTP</Form.Label>
                                        <Form.Control className="input-sm" type="text" name="email_otp"
                                            placeholder="Enter email otp"
                                            value={this.state.form.email_otp.value} onChange={this.handleChange} />
                                        {this.state.form.email_otp.errorMsg && (
                                            <p className="text-danger">{this.state.form.email_otp.errorMsg}</p>
                                        )}
                                    </Form.Group>
                                </Col>
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
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>);
    }
}

export default OtpVerificationModal;