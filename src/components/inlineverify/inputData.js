import React from 'react';
import { Button, InputGroup, Form } from "react-bootstrap";

const InputData = ({ field_name, field_value, handleOnChange, handleOtpSubmit, is_otp_form_validated }) => {
    return (<Form noValidate validated={is_otp_form_validated} onSubmit={handleOtpSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <InputGroup.Text id="inputGroupPrepend">
                <Form.Control type={field_name} placeholder="Enter data" value={field_value} readOnly={is_otp_form_validated}
                    required onChange={handleOnChange} />
                <Button type="submit">{is_otp_form_validated ? "RE-" : ""}OTP</Button>
            </InputGroup.Text>
        </Form.Group>
    </Form>);
}

export default InputData;