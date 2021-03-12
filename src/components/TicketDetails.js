import react from 'react';
import { ListGroupItem, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ChatLeftText } from 'react-bootstrap-icons';

const TicketDetails = (props) => (
    <div className="card mt-3">
        <div className="card-header">
            <div className="card-title">
                <strong>Ticket: #{props.ticketno}</strong>
            </div>
            <ChatLeftText className="float-right text-right ml-5" style={{ cursor: "pointer" }} onClick={() => props.display_ticket(props.id)}></ChatLeftText>
        </div>
        <div className="card-body">
            <ListGroup variant="flush">
                <ListGroupItem><strong>Opening Remark: </strong>{props.opening_remark}</ListGroupItem>
                {props.closing_remark && <ListGroupItem><strong>Closing Remark: </strong>{props.closing_remark}</ListGroupItem>}
                <ListGroupItem><strong>Status: </strong>{props.status_lbl}</ListGroupItem>
                <ListGroupItem><strong>Category: </strong>{props.category_lbl}</ListGroupItem>
                <ListGroupItem><strong>Sub Category: </strong>{props.subcategory_lbl}</ListGroupItem>
            </ListGroup>
        </div>
    </div>

);

export default TicketDetails;
