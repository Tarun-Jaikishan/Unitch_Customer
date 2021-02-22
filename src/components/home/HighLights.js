import React from 'react';
import Card from 'react-bootstrap/Card'


const HighLights = () => (
    <div className="mt-5 d-flex">
        <Card style={{marginRight: "10px" }}>
            <Card.Body>
                <Card.Title>Quality of Service</Card.Title>
                <Card.Text>
                    Our experience enables us to understand the demand of customers and be able to reach their needs. It is the quality our service that dictates our survival in the market.
                </Card.Text>
            </Card.Body>
        </Card>

        <Card style={{ marginRight: "10px" }}>
            <Card.Body>
                <Card.Title>Premium Technology</Card.Title>
                <Card.Text>
                    In a fast growing nation like ours, we ought to stay in sync with the latest technology, which can be applied to deliver nothing but the best to our customers.
                </Card.Text>
            </Card.Body>
        </Card>

        <Card style={{ marginRight: "10px" }}>
            <Card.Body>
                <Card.Title>Instant Support</Card.Title>
                <Card.Text>
                    Technical support and assistance is always made available to make sure you make the most out of our service and your need for entertainment is never compromised.
                </Card.Text>
            </Card.Body>
        </Card>

    </div>
);

export default HighLights;