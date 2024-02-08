import { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { ArrowLeft } from "react-bootstrap-icons";
import { FileEarmark } from "react-bootstrap-icons";
import { isTokenValid } from "../utilits";
import SpinnerLoading from "../components/Spinner";
import { API_SETTING, USER_TOKEN } from "../env.conf";
import { api } from "../axios";

class LedgerPage extends Component {
  state = {
    account_id: 0,
    transactions: [],
    current_page: 0,
    page_count: 0,
    loading: true,
    selected_page: 1,
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
    if (
      account_id !== undefined &&
      smartcardno !== undefined &&
      stbno !== undefined
    ) {
      this.setState({
        account_id,
        smartcardno,
        stbno,
      });
      this.fetchTransData(account_id, this.state.selected_page);
    }
  }

  fetchTransData = (account_id, page) => {
    const token = isTokenValid(USER_TOKEN);
    if (token) {
      const url = `subscriber-transaction?expand=created_by_lbl,note_lbl,type_lbl,&filter[account_id]=${account_id}&page=${page}&per-page=10`;
      const headers = {
        Authorization: `Bearer ${token}`,
        authkey: API_SETTING.authkey,
      };
      api
        .get(url, { headers })
        .then((resp) => {
          if (resp.data.success) {
            const d = resp.data.data;
            const resp_header = resp.headers;
            this.setState({
              transactions: d.filter((i) => i.mrp > 0),
              current_page: resp_header["x-pagination-current-page"],
              page_count: resp_header["x-pagination-page-count"],
              loading: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    let content = null;
    let paginations = [];

    if (this.state.loading) {
      content = <SpinnerLoading />;
    }

    if (!this.state.loading) {
      if (this.state.transactions.length === 0) {
        content = (
          <p className="text-center font-italic text-lg">
            No Transactions Found
          </p>
        );
      } else {
        content = (
          <div className="table-responsive">
            <table className="table-bordered">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center">#Receipt</th>
                  <th className="text-center">Done On</th>
                  <th className="text-center">Transaction For</th>
                  <th className="text-center">Note</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Tax</th>
                  <th className="text-center">Total</th>
                  <th className="text-center"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.transactions.map((item, index) => {
                  let decode = btoa(`t_${item.id}`);
                  let url = `${API_SETTING.front_url}${item.id}?vati=${decode}`;

                  return (
                    <tr className="tr-hover" key={item.id}>
                      <td className="text-center">
                        {(this.state.current_page - 1) * 10 + index + 1}
                      </td>
                      <td className="text-center">{item.reciept_no}</td>
                      <td className="text-center">{item.created_at}</td>
                      <td className="text-center">{item.type_lbl}</td>
                      <td className="text-center">{item.note_lbl}</td>
                      <td className="text-center">{item.mrp}</td>
                      <td className="text-center">{item.mrp_tax || 0}</td>
                      <td className="text-center">
                        {parseFloat(item.mrp_tax || 0.0) + parseFloat(item.mrp)}
                      </td>
                      <td className="text-center">
                        {item.note_lbl === "Cr" && (
                          <Link to={{ pathname: url }} target="_blank">
                            <FileEarmark />
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );

        for (let number = 1; number <= this.state.page_count; number++) {
          paginations.push(
            <button
              className="btn btn-purple"
              key={number}
              active={number === parseInt(this.state.current_page)}
              onClick={() => this.fetchTransData(this.state.account_id, number)}
            >
              {number}
            </button>
          );
        }
      }
    }

    return (
      <div className="card mt-3">
        <div className="p-5">
          <div className="card-title d-flex justify-content-between flex-wrap flex-gap">
            <strong className="d-flex align-items-center justify-content-between font-weight-bold text-xl flex-gap">
              <Link
                to="/myaccount"
                type="button"
                className="btn bg-purple text-white rounded-lg py-1 px-2 text-lg btn-sm"
              >
                <ArrowLeft />
              </Link>
              Transaction Details
            </strong>
            <div className="d-flex flex-gap flex-wrap align-items-center">
              <div className="d-flex align-items-center flex-gap">
                <small className="mt-4 font-weight-bold ">Smartcard No</small>
                <strong className="px-2 py-1 bg-purple text-white font-weight-bolder rounded-lg">
                  {this.state.smartcardno}
                </strong>
              </div>
              <div className="d-flex align-items-center flex-gap">
                <small className="mt-4 font-weight-bold ">STB No</small>
                <strong className="px-2 py-1 bg-purple text-white font-weight-bolder rounded-lg">
                  {this.state.stbno}
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5">
          {content}
          <br />
          <Pagination>{paginations}</Pagination>
        </div>
      </div>
    );
  }
}

export default LedgerPage;
