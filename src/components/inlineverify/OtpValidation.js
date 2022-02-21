import React from 'react';
import { Button, InputGroup, Form } from "react-bootstrap";

const OtpValidation = ({ verifyOtpSubmit, handleOnChangeOtp, otp }) => {
    return (<Form noValidate={otp.length < 6 ? false : true} onSubmit={verifyOtpSubmit}>
        <Form.Group className="mb-3" controlId="otpformBasicEmail">
            <InputGroup.Text id="otpInputGroupPrepend">
                <Form.Control type="text" name="otp" placeholder="Enter OTP"
                    value={otp} required onChange={handleOnChangeOtp}
                    maxLength="6"
                />
                <Button type="submit">Verify</Button>
            </InputGroup.Text>
        </Form.Group>
    </Form>);
}

export default OtpValidation;