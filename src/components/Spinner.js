import React from 'react';
import {Spinner} from 'react-bootstrap';

const SpinnerLoading = () => (
    <React.Fragment>
        <Spinner animation="border" variant="primary" />
        <Spinner animation="border" variant="secondary" />
        <Spinner animation="border" variant="success" />
        <Spinner animation="border" variant="danger" />
        <Spinner animation="border" variant="warning" />
        <Spinner animation="border" variant="info" />
    </React.Fragment>
);

export default SpinnerLoading;