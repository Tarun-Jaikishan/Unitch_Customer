import { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { api } from '../axios';
import { isTokenValid, history } from '../utilits';
import SpinnerLoading from '../components/Spinner';
import { API_SETTING, USER_TOKEN } from '../env.conf';

class AddTicketPage extends Component {

    state = {
        form: {
            sub_category: {
                is_valid: true,
                value: "",
                errorMsg: null
            },
            remark: {
                is_valid: true,
                value: "",
                errorMsg: null
            }
        },
        sub_category_list: []
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
            this.setState({
                account_id: account_id
            });
        }

        const token = isTokenValid(USER_TOKEN);
        if (token) {
            const url = 'complaint-subcategory/list?filter[status]=1&fields=id,name,category_id';
            const headers = { "Authorization": `Bearer ${token}`, 'authkey': API_SETTING.authkey }
            api.get(url, { headers })
                .then(resp => {
                    if (resp.data.success) {
                        const d = resp.data.data;
                        console.log("Sub category Details", d);
                        this.setState({
                            sub_category_list: d
                        });
                    }
                }).catch(err => {
                    console.log(err);
                });
        }
    }

    isFormValid = () => {
        let isvalid = true;
        const constate = { ...this.state };
        if (this.state.form.sub_category.value === "") {
            isvalid = isvalid && false;
            constate.form.sub_category.is_valid = false;
            constate.form.sub_category.errorMsg = "Please select complaint category.";
        }

        if (this.state.form.remark.value === "") {
            isvalid = isvalid && false;
            constate.form.remark.is_valid = false;
            constate.form.remark.errorMsg = "Please enter complaint details.";
        }

        if (!isvalid) {
            this.setState({
                form: {
                    ...constate
                }
            });
        }

        return isvalid;
    }

    handleInput = (e) => {
        console.log(e.target.name, e.target.value);
        const curr_state = { ...this.state.form };
        curr_state[e.target.name]['value'] = e.target.value;
        this.setState({
            form: curr_state
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("State ", this.state);
        if (this.isFormValid()) {
            const sub_cat = this.state.sub_category_list.filter((i) => i.id === parseInt(this.state.form.sub_category.value));
            const request = {
                account_id: this.state.account_id,
                category_id: (sub_cat.length > 0) ? sub_cat[0]['category_id'] : 0,
                subcategory_id: this.state.form.sub_category.value,
                opening_remark: this.state.form.remark.value
            };
            const token = isTokenValid(USER_TOKEN);
            if (token) {
                const url = 'complaint';
                const headers = { "Authorization": `Bearer ${token}`, 'authkey': API_SETTING.authkey }
                api.post(url, request, { headers })
                    .then(resp => {
                        if (resp.data.success) {
                            const d = resp.data.success;
                            console.log("Ticket Response", d, resp.data.success);
                            history.push({
                                pathname: '/myaccount',
                                hash: "#",
                                search: '?is_suc=1',
                                state: { ticket_no: "ticket" }
                            });
                        }
                    }).catch(err => {
                        console.log(err);
                    });
            }
        }
    }

    render() {
        let content = <SpinnerLoading />
        console.log("Add ticket category", this.state.sub_category_list);
        if (this.state.sub_category_list.length > 0) {
            content = (
                <div className="card mt-3">
                    <div className="card-header">
                        <div className="card-title">
                            <strong>Raise Ticket</strong>
                        </div>
                    </div>
                    <div className="card-body">
                        <Form onSubmit={this.handleSubmit}>

                            <Form.Group controlId="form.sub_category.value">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" onChange={this.handleInput} name="sub_category">
                                    <option value="">Select Category</option>
                                    {this.state.sub_category_list.map((item, index) => <option value={item.id} key={item.id}>{item.name}</option>)}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="form.remark.value">
                                <Form.Label>Remark</Form.Label>
                                <Form.Control as="textarea" name="remark" rows={3} onChange={this.handleInput} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            );
        }

        return content;
    }

}

export default AddTicketPage;