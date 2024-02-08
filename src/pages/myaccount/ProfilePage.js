import React, { Component } from "react";
import SpinnerLoading from "../../components/Spinner";
import { connect } from "react-redux";
import * as action from "../../redux/action/index";
import { Container, Row, Col, Button } from "react-bootstrap";
import { API_SETTING, USER_TOKEN } from "../../env.conf";
import { isTokenValid } from "../../utilits";
import { api } from "../../axios";
import { PencilSquare, LockFill, PersonLinesFill } from "react-bootstrap-icons";
import { history } from "../../utilits";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile_no: props.mobile_no,
      email: props.email,
      is_mobile_verified: props.is_mobile_verified,
      is_email_verified: props.is_email_verified,
    };
  }

  async componentDidMount() {
    await this.props.fetchAccounts();
  }

  sendOtp = async (type, contact_details) => {
    let request = {
      subscriber_id: this.props.profile.id,
      mobile_no: "",
      email: "",
    };
    if (type === "mobile_no" && contact_details !== "") {
      request.mobile_no = contact_details;
    } else if (type === "email" && contact_details !== "") {
      request.email = contact_details;
    }
    console.log("request data", request);

    const token = isTokenValid(USER_TOKEN);
    if (token) {
      const url = "subscriber/send-verification-otp";
      const headers = {
        Authorization: `Bearer ${token}`,
        authkey: API_SETTING.authkey,
      };
      return await api
        .post(url, request, { headers })
        .then((resp) => {
          console.log("sent otp resp", resp.data.data);
          if (resp.data.success) {
            return {
              status: resp.data.data.success,
              message: resp.data.data.message,
            };
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return false;
  };

  updateData = (type, contact_details, otp) => {
    let request = {
      subscriber_id: this.props.profile.id,
      otp: otp,
      mobile_no: "",
      email: "",
    };
    if (type === "mobile_no" && contact_details !== "") {
      request.mobile_no = contact_details;
    } else if (type === "email" && contact_details !== "") {
      request.email = contact_details;
    }
    const token = isTokenValid(USER_TOKEN);
    if (token) {
      const url = "subscriber/update-contacts";
      const headers = {
        Authorization: `Bearer ${token}`,
        authkey: API_SETTING.authkey,
      };
      return api
        .post(url, request, { headers })
        .then((resp) => {
          console.log("update contacts", resp.data.data);
          if (resp.data.success) {
            if (request.mobile_no !== "") {
              this.setState({
                is_mobile_verified: true,
              });
            }
            if (request.email !== "") {
              this.setState(
                {
                  is_email_verified: true,
                },
                async () => {
                  await this.props.fetchAccounts();
                }
              );
            }
            return {
              status: resp.data.data.success,
              message: resp.data.data.message,
            };
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return false;
  };

  redirectProfilePage = () =>
    history.push({
      pathname: `/profile/edit/${this.props.profile.id}`,
      hash: "#",
      search: "",
      state: {},
    });

  redirectChangePasswordPage = () =>
    history.push({
      pathname: `/changepassword`,
      hash: "#",
      search: "",
      state: {},
    });

  render() {
    let content = <SpinnerLoading />;
    if (this.props.profile) {
      const address = [];
      const profile = this.props.profile;
      let cnt = 1;
      for (let addr in profile.address) {
        address.push(
          <tr>
            <td className="text-secondary font-weight-bold" key={addr}>
              {(addr.charAt(0).toUpperCase() + addr.substring(1)).replaceAll(
                "_",
                " "
              )}
            </td>

            <td className="text-secondary" key={profile.address[addr]}>
              {profile.address[addr]}
            </td>
          </tr>
        );
        cnt++;
      }

      content = (
        <div className="row">
          <div className="col-md-12">
            <div className="">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-none d-lg-flex text-xl align-items-center flex-gap">
                  <PersonLinesFill />
                  My Profile
                </div>

                {/* Responsive */}
                <div className="d-lg-none text-xl">My Profile</div>
                <div className="d-flex flex-gap">
                  <button
                    onClick={() => this.redirectProfilePage()}
                    title="Edit My Profile"
                    className="d-flex align-items-center flex-gap-sm text-md btn btn-sm d-lg-none py-2 btn-purple"
                  >
                    <PencilSquare /> Edit
                  </button>
                  <button
                    onClick={() => this.redirectChangePasswordPage()}
                    title="Change Password"
                    className="d-flex align-items-center flex-gap-sm text-md btn btn-sm d-lg-none py-2 btn-purple"
                  >
                    <LockFill /> Change Password
                  </button>

                  {/* Responsive */}
                  <button
                    onClick={() => this.redirectProfilePage()}
                    title="Edit My Profile"
                    className="d-none d-lg-flex align-items-center flex-gap-sm text-md btn btn-purple"
                  >
                    <PencilSquare /> Edit
                  </button>
                  <button
                    onClick={() => this.redirectChangePasswordPage()}
                    title="Change Password"
                    className="d-none d-lg-flex align-items-center flex-gap-sm text-md btn btn-purple"
                  >
                    <LockFill /> Change Password
                  </button>
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <Container>
                <Row xs={2} md={4} lg={6}>
                  <Col key="personal_details">
                    <div className="py-5 px-2">
                      <div className="card-title font-weight-bold">
                        Personal Details
                      </div>
                    </div>

                    <div>
                      <div className="table-responsive">
                        <table className=" profile-table">
                          <tbody>
                            <tr key="saf_no">
                              <td key="saf_lable">
                                <h6 className="mb-0">SAF No.</h6>
                              </td>
                              <td key="saf_data">
                                {" "}
                                <span className="text-secondary">
                                  {profile.formno}
                                </span>
                              </td>
                            </tr>
                            <tr key="customer_id">
                              <td key="cust_label">
                                <h6 className="mb-0">Customer ID</h6>
                              </td>
                              <td key="cust_data">
                                {" "}
                                <span className="text-secondary">
                                  {profile.customer_id}
                                </span>
                              </td>
                            </tr>
                            <tr key="name">
                              <td key="name_label">
                                <h6 className="mb-0">Name</h6>
                              </td>
                              <td key="name_data">
                                {" "}
                                <span className="text-secondary">
                                  {profile.name}
                                </span>
                              </td>
                            </tr>
                            <tr key="connection_type">
                              <td key="con_label">
                                <h6 className="mb-0">Connection Type</h6>
                              </td>
                              <td key="con_data">
                                {" "}
                                <span className="text-secondary">
                                  {profile.customer_type}
                                </span>
                              </td>
                            </tr>
                            <tr key="gender">
                              <td key="gen_label">
                                <h6 className="mb-0">Gender</h6>
                              </td>
                              <td key="gen_data">
                                {" "}
                                <span className="text-secondary">
                                  {profile.gender}
                                </span>
                              </td>
                            </tr>
                            <tr key="dob">
                              <td key="dob_label">
                                <h6 className="mb-0">DOB</h6>
                              </td>
                              <td key="dob_data">
                                {" "}
                                <span className="text-secondary">
                                  {profile.dob}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Col>

                  <Col key="contact_details">
                    <div className="px-2 py-5">
                      <div className="card-title font-weight-bold">
                        Contact Details
                      </div>
                    </div>
                    <div>
                      <div className="table-responsive">
                        <table className="profile-table">
                          <tbody>
                            <tr key="phone_no">
                              <td key="pho_label">
                                <h6 className="mb-0">Phone No.</h6>
                              </td>
                              <td key="pho_data">
                                {" "}
                                <span className="text-secondary">
                                  {profile.phone_no}
                                </span>
                              </td>
                            </tr>
                            <tr key="mobile_no">
                              <td key="mob_label">
                                <h6 className="mb-0">Mobile No.</h6>
                              </td>
                              <td
                                key="mob_data"
                                className="d-flex justify-content-between align-items-center"
                              >
                                <span className="text-secondary">
                                  {profile.mobile_no}
                                </span>
                                {profile.mobile_no_verified === "Y" && (
                                  <span
                                    className="ml-3 px-2 py-1 bg-success rounded-circle"
                                    title="Verified"
                                  >
                                    <i className="fe fe-user-check text-white font-weight-bold"></i>
                                  </span>
                                )}
                              </td>
                            </tr>
                            <tr key="email">
                              <td key="email_label">
                                <h6 className="mb-0">Email</h6>
                              </td>
                              <td
                                key="email_data"
                                className="d-flex justify-content-between align-items-center"
                              >
                                <span className="text-secondary">
                                  {profile.email}
                                </span>
                                {profile.email_verified === "Y" && (
                                  <span
                                    className="ml-3 px-2 py-1 bg-success rounded-circle"
                                    title="Verified"
                                  >
                                    <i className="fe fe-user-check text-white font-weight-bold"></i>
                                  </span>
                                )}
                              </td>
                            </tr>
                            <tr key="address">
                              <td rowSpan={3} key="addr_label">
                                <h6 className="mb-0">Address</h6>
                              </td>
                              <td rowSpan={3} key="addr_data">
                                {address}
                                <tr>
                                  <td
                                    className="text-secondary font-weight-bold"
                                    key="pin_code"
                                  >
                                    Pincode
                                  </td>

                                  <td
                                    className="text-secondary"
                                    key={profile.pincode}
                                  >
                                    {profile.pincode}
                                  </td>
                                </tr>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      );

      return content;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.customer.profile,
    accounts: state.customer.accounts,
    loading: state.customer.loading,
    error: state.customer.error,
    is_customer: state.auth.is_customer,
    is_mobile_verified: state.customer.profile.mobile_no_verified,
    is_email_verified: state.customer.profile.email_verified,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAccounts: () => dispatch(action.fetchAccounts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
