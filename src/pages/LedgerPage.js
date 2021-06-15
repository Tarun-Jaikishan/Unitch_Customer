import { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination';
import { FileEarmark } from 'react-bootstrap-icons';
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

        let account_id;
        let smartcardno;
        let stbno;

        if (this.props.match !== undefined) {
            if (this.props.match.params.account_id) {
                account_id = this.props.match.params.account_id;
            }
            if (this.props.match.params.smartcardno) {
                smartcardno = this.props.match.params.smartcardno;
            }
            if (this.props.match.params.stbno) {
                stbno = this.props.match.params.stbno;
            }
        } else if (this.props.location.state !== undefined) {
            if (this.props.location.state.account_id !== undefined) {
                account_id = this.props.location.state.account_id;
            }
            if (this.props.location.state.smartcardno !== undefined) {
                smartcardno = this.props.location.state.smartcardno;
            }
            if (this.props.location.state.stbno !== undefined) {
                stbno = this.props.location.state.stbno;
            }
        }
        if (account_id !== undefined && smartcardno !== undefined && stbno !== undefined) {
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
                    if (resp.data.success) {
                        const d = resp.data.data;
                        const resp_header = resp.headers;
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.transactions.map((item, index) => {
                                let decode = btoa(`t_${item.id}`);
                                let url = `${API_SETTING.front_url}${item.id}?vati=${decode}`;

                                return (<tr key={item.id}>
                                    <td>{((this.state.current_page - 1) * 10) + index + 1}</td>
                                    <td>{item.reciept_no}</td>
                                    <td>{item.created_at}</td>
                                    <td>{item.type_lbl}</td>
                                    <td>{item.note_lbl}</td>
                                    <td>{item.mrp}</td>
                                    <td>{item.mrp_tax || 0}</td>
                                    <td>{parseFloat(item.mrp_tax || 0.00) + parseFloat(item.mrp)}</td>
                                    <td>
                                        {item.note_lbl === 'Cr' && <Link to={{ pathname: url }} target='_blank'><FileEarmark /></Link>}
                                    </td>
                                </tr>);
                            })}
                        </tbody >
                    </Table >
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