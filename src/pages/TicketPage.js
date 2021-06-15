import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { api } from '../axios';
import { isTokenValid, history } from '../utilits';
import { USER_TOKEN, API_SETTING, OPEN_TICKET, CLOSED_TICKET, PENDING_TICKET } from '../env.conf';
import TicketDetails from '../components/TicketDetails';
import DisplayTicket from '../components/DisplayTicket';

class TicketPage extends Component {

    state = {
        account_id: null,
        open_ticket: [],
        closed_ticket: [],
        display_ticket: {}
    };

    displayReply = (id) => {
        const replyList = [...this.state.open_ticket, ...this.state.closed_ticket];
        const selectedReply = replyList.filter((reply) => reply.id === id);
        if (selectedReply) {
            const selReply = selectedReply[0];
            this.setState({
                display_ticket: selReply
            });
        }
    }

    componentDidMount() {
        let account_id;
        if (this.props.match !== undefined) {
            if (this.props.match.params.account_id) {
                account_id = this.props.match.params.account_id;
            }
        } else if (this.props.location.state !== undefined) {
            if (this.props.location.state.account_id !== undefined) {
                account_id = this.props.location.state.account_id;
            }
        }

        if (account_id !== undefined) {
            const token = isTokenValid(USER_TOKEN);
            const url = `complaint?filter[account_id]=${account_id}&expand=priority_lbl,created_by_lbl,operator_lbl,location_lbl,sublocation_lbl,category_lbl,subcategory_lbl,smartcard_lbl,stb_lbl,status_lbl,reply_lbl,name_lbl`;
            const headers = { "Authorization": `Bearer ${token}`, 'authkey': API_SETTING.authkey }
            api.get(url, { headers })
                .then(resp => {
                    if (resp.data.success) {
                        const d = resp.data.data;
                        const open_ticket = d.filter((item) => item.status === OPEN_TICKET || item.status === PENDING_TICKET);
                        const closed_ticket = d.filter((item) => item.status === CLOSED_TICKET);
                        this.setState({
                            account_id,
                            open_ticket,
                            closed_ticket
                        });
                    }
                }).catch(err => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sx-12">
                        {this.state.open_ticket.length === 0 && <Button variant="primary" className="pull-right" onClick={() => history.push({
                            pathname: `/myaccount/add-tickets/${this.state.account_id}`,
                            search: '',
                            hash: "#",
                            state: { account_id: this.state.account_id }
                        })} >Create Tickets</Button>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sx-12 mb-3">
                        {this.state.open_ticket.map((item) => <TicketDetails {...item} display_ticket={this.displayReply} key={item.id} />)}
                        {this.state.closed_ticket.map((item) => <TicketDetails {...item} display_ticket={this.displayReply} key={item.id} />)}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sx-12 ml-5 mt-3">
                        {Object.keys(this.state.display_ticket).length > 0 && <DisplayTicket ticket={this.state.display_ticket} />}
                    </div>
                </div>
            </>
        );
    }

}

export default TicketPage;