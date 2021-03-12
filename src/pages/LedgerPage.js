import { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination';
import { isTokenValid } from '../utilits';
import SpinnerLoading from '../components/Spinner';
import { API_SETTING, USER_TOKEN } from '../env.conf';
import { api } from '../axios';


class LedgerPage extends Component {

    state = {
        account_id: 0,
        transactions: [],
        current_page: 0,
        page_count: 0,
        loading: true,
        selected_page: 1
    };

    componentDidMount() {
        console.log("lohdhdhdhdh", this.props.location.state.account_id);
        if (this.props.location.state.account_id !== undefined) {
            const account_id = this.props.location.state.account_id;
            const smartcardno = this.props.location.state.smartcardno;
            const stbno = this.props.location.state.stbno;
            this.setState({
                account_id,
                smartcardno,
                stbno
            });
            this.fetchTransData(account_id, this.state.selected_page);
        }
    }

    fetchTransData = (account_id, page) => {
        const token = isTokenValid(USER_TOKEN);
        if (token) {
            const url = `subscriber-transaction?expand=created_by_lbl,note_lbl,type_lbl,&filter[account_id]=${account_id}&page=${page}&per-page=10`;
            const headers = { "Authorization": `Bearer ${token}`, 'authkey': API_SETTING.authkey }
            api.get(url, { headers })
                .then(resp => {
                    console.log("Reponse geader", resp.headers);
                    if (resp.data.success) {
                        const d = resp.data.data;
                        const resp_header = resp.headers;
                        console.log("Sub Transactions", d);
                        this.setState({
                            transactions: d.filter(i => i.mrp > 0),
                            current_page: resp_header['x-pagination-current-page'],
                            page_count: resp_header['x-pagination-page-count'],
                            loading: false
                        });
                    }
                }).catch(err => {
                    console.log(err);
                });
        }
    }

    render() {
        let content = null;
        let paginations = [];

        if (this.state.loading) {
            content = <SpinnerLoading />;
        }

        if (!this.state.loading) {
            if (this.state.transactions.length === 0) {
                content = <p>No Transaction found...</p>
            } else {
                content = (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>#Receipt</th>
                                <th>Done On</th>
                                <th>Transaction For</th>
                                <th>Note</th>
                                <th>Amount</th>
                                <th>Tax</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.transactions.map((item, index) => (
                                <tr>
                                    <td>{((this.state.current_page - 1) * 10) + index + 1}</td>
                                    <td>{item.reciept_no}</td>
                                    <td>{item.created_at}</td>
                                    <td>{item.type_lbl}</td>
                                    <td>{item.note_lbl}</td>
                                    <td>{item.mrp}</td>
                                    <td>{item.mrp_tax || 0}</td>
                                    <td>{parseFloat(item.mrp_tax || 0) + parseFloat(item.mrp)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                );

                for (let number = 1; number <= this.state.page_count; number++) {
                    paginations.push(
                        <Pagination.Item key={number} active={number === parseInt(this.state.current_page)} onClick={() => this.fetchTransData(this.state.account_id, number)}>
                            {number}
                        </Pagination.Item>,
                    );
                }
            }
        }

        return (<div className="card mt-3">
            <div className="card-header">
                <div className="card-title">
                    <strong>Transaction Details for Account {this.state.smartcardno}/{this.state.stbno} </strong>
                </div>
            </div>
            <div className="card-body">
                {content}
                <Pagination>{paginations}</Pagination>
            </div>
        </div>
        );
    }


}


export default LedgerPage;