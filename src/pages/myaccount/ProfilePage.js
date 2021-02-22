import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ProfilePage = ({ profile }) => {
    let address = "";
    for (let addr in profile.address) {
        console.log(addr);
        address = address + addr.toUpperCase() + " : " + profile.address[addr] + " ";
    }

    return (
        <div>
            <div className="card mt-3">
                <ListGroup>
                    <ListGroup.Item>
                        <h6 className="mb-0">Customer ID</h6>
                        <span className="text-secondary">{profile.customer_id}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h6 className="mb-0">Full Name</h6>
                        <span className="text-secondary">{profile.name}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h6 className="mb-0">Mobile No</h6>
                        <span className="text-secondary">{profile.mobile_no}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h6 className="mb-0">Email</h6>
                        <span className="text-secondary">{profile.email}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h6 className="mb-0">Address</h6>
                        <span className="text-secondary">{address}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h6 className="mb-0"> Connection Type</h6>
                        <span className="text-secondary">{profile.customer_type}</span>
                    </ListGroup.Item>
                </ListGroup>
            </div>


            <div className="card mt-3">
                <ListGroup>
                    <ListGroup.Item>
                        <h6 className="mb-0">Service Provider</h6>
                        <span className="text-secondary">{profile.operator}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h6 className="mb-0">Contact no.</h6>
                        <span className="text-secondary">{profile.operator_contactno}</span>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    );
}


export default ProfilePage;