import React from 'react';
import { Button } from 'react-bootstrap';
import BouquetList from '../components/BouquetList';
import { history } from '../utilits';

const AccountList = ({ index, account }) => {

    const bouquet_ids = account.bouque.map(item => item.bouque_id);
    return (
        <div className="card mt-3">
            <div className="card-header">
                <div className="card-title">Account {index + 1}</div>
                <div className="btn-list text-right" style={{ width: '70%' }}>
                    <Button variant="primary" className="btn btn-outline-primary" onClick={() => history.push({
                        pathname: `/myaccount/renewal/${account.id}/${bouquet_ids}`,
                        hash: "#",
                        search: '',
                        state: { bouquet_ids: bouquet_ids, account_id: account.id }
                    })} >Renew</Button> {' '}
                    {account.status !== -2 && <Button variant="primary" className="pull-right" onClick={() => history.push({
                        pathname: `/myaccount/addons/${account.id}`,
                        hash: "#",
                        search: '',
                        state: { account_id: account.id }
                    })} >Addons</Button>}{' '}
                    <Button variant="primary" className="pull-right" onClick={() => history.push({
                        pathname: `/myaccount/tickets/${account.id}`,
                        hash: "#",
                        search: '',
                        state: { account_id: account.id }
                    })} >Tickets</Button>
                    <Button variant="primary" className="pull-right" onClick={() => history.push({
                        pathname: `/myaccount/ledger/${account.id}/${account.smartcardno}/${account.stbno}`,
                        hash: "#",
                        search: '',
                        state: { account_id: account.id, smartcardno: account.smartcardno, stbno: account.stbno }
                    })} >Ledger</Button>
                </div>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table card-table table-striped table-vcenter">
                        <tbody>
                            <tr>
                                <td><strong>Smartcard no</strong></td>
                                <td>{account.smartcardno}</td>
                                <td><strong>STB No</strong></td>
                                <td>{account.stbno}</td>
                                <td><strong>Outstanding</strong></td>
                                <td>{account.outstanding}</td>
                                <td><strong>Current Status</strong></td>
                                <td>{account.status_lbl}</td>
                            </tr>
                            <tr>
                                <td colSpan="8">
                                    <table className="table  table-striped ">
                                        <thead>
                                            <tr>
                                                <th><strong>Bouquet</strong></th>
                                                <th><strong>Type</strong></th>
                                                <th><strong>Start Date</strong></th>
                                                <th><strong>End Date</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {account.bouque.map((item, index) => (
                                                <BouquetList item={item} index={index} key={index} />
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}

export default AccountList;