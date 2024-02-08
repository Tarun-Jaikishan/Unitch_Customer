import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Table } from "react-bootstrap";
import {
  isString,
  isEmail,
  isNumeric,
  isaDate,
  isAlphaNumeric,
  isNumericGTZero,
  isTokenValid,
  history,
  getBase64,
  showErrorMessage,
} from "../../utilits";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as action from "../../redux/action/index";
import SpinnerLoading from "../../components/Spinner";
import { API_SETTING, USER_TOKEN } from "../../env.conf";
import { api } from "../../axios";
import OtpVerificationModal from "../../components/OtpVerificationModal";

import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        fname: {
          required: true,
          value: "",
          validation: isString,
          errorMsg: null,
        },
        lname: {
          required: true,
          value: "",
          validation: isString,
          errorMsg: null,
        },
        mname: {
          required: false,
          value: "",
          validation: isString,
          errorMsg: null,
        },
        email: {
          required: true,
          value: "",
          validation: isEmail,
          errorMsg: null,
        },
        phone_no: {
          required: false,
          value: "",
          validation: isNumeric,
          errorMsg: null,
        },
        mobile_no: {
          required: true,
          value: "",
          validation: isNumeric,
          errorMsg: null,
        },
        gender: {
          required: true,
          value: "",
          validation: isNumericGTZero,
          errorMsg: null,
        },
        dob: {
          required: false,
          value: "",
          validation: isaDate,
          errorMsg: null,
        },
        flatno: {
          required: true,
          value: "",
          validation: isString,
          errorMsg: null,
        },
        floor: {
          required: true,
          value: "",
          validation: isAlphaNumeric,
          errorMsg: null,
        },
        wing: {
          required: true,
          value: "",
          validation: isAlphaNumeric,
          errorMsg: null,
        },
        installation_address: {
          required: true,
          value: "",
          validation: isAlphaNumeric,
          errorMsg: null,
        },
        billing_address: {
          required: false,
          value: "",
          validation: isAlphaNumeric,
          errorMsg: null,
        },
        pincode: {
          required: true,
          value: "",
          validation: isNumeric,
          errorMsg: null,
        },
        billing_pincode: {
          required: false,
          value: "",
          validation: isNumeric,
          errorMsg: null,
        },
        customer_photo: {
          required: false,
          value: {
            data: "",
            ext: "",
            name: "",
            proof_types: "cust_photo",
            type: "",
          },
          validation: null,
          errorMsg: null,
        },
        id_proof_document: {
          required: false,
          value: "",
          validation: null,
          errorMsg: null,
        },
        id_proof: {
          required: false,
          value: {
            data: "",
            document_type: "",
            ext: "",
            name: "",
            proof_types: "id_proof",
            type: "",
          },
          validation: null,
          errorMsg: null,
        },
        address_proof_document: {
          required: false,
          value: "",
          validation: null,
          errorMsg: null,
        },
        address_proof: {
          required: false,
          value: {
            data: "",
            document_type: "",
            ext: "",
            name: "",
            proof_types: "address_proof",
            type: "",
          },
          validation: null,
          errorMsg: null,
        },
      },
      modalshow: false,
      formData: {},
      is_button_loading: false,
    };
  }

  async componentDidMount() {
    await this.props.fetchAccounts();
    if (Object.keys(this.props.profile).length > 0) {
      var forms = { ...this.state.form };
      for (var fields in this.props.profile) {
        if (fields !== "address" && fields !== "billing_address") {
          if (
            forms[fields] !== undefined &&
            Object.keys(forms[fields]).length > 0
          ) {
            forms[fields].value = this.props.profile[fields];
          }
        }
        if (fields === "gender") {
          forms.gender.value = this.props.profile.gender === "Male" ? 0 : 1;
        }
        if (fields === "address") {
          forms.installation_address.value =
            this.props.profile.address.installation_address;
          forms.flatno.value = this.props.profile.address.flatno;
          forms.floor.value = this.props.profile.address.floor;
          forms.wing.value = this.props.profile.address.wing;
        }
        if (fields === "billing_address") {
          forms.billing_address.value = this.props.profile.billing_address.addr;
          forms.billing_pincode.value =
            this.props.profile.billing_address.pincode;
        }
      }
    }
    this.setState({
      form: { ...forms },
    });
  }

  handleChange = (e) => {
    let form = { ...this.state.form };
    form[e.target.name].value = e.target.value;
    this.setState({
      form: { ...form },
    });
  };

  handleFileUpload = async (e) => {
    let form = { ...this.state.form };
    const file = e.target.files[0];
    console.log("file length", e.target.files.length);
    console.log("file", file);
    if (e.target.files.length > 0) {
      form[e.target.name].value = {
        ext: file.name.split(".")[1],
        proof_types: e.target.name,
        type: file.type,
        name: file.name,
      };

      if (e.target.name !== "cust_photo") {
        form[e.target.name].value.document_type = 0;
      }

      await getBase64(e.target.files[0], (result) => {
        form[e.target.name].value.data = result.replace(
          "data:image/jpeg;base64,",
          ""
        );
      });

      this.setState({
        form: { ...form },
      });
    }
  };

  isFormValid = () => {
    let isvalid = true;
    const forms = { ...this.state.form };
    for (var field in forms) {
      if (forms[field].required && forms[field].value.length === 0) {
        forms[field].errorMsg = "Field required, cannot be empty.";
        isvalid = isvalid && false;
      }
      if (
        typeof forms[field].validation === "function" &&
        forms[field].value !== null &&
        forms[field].value.length > 0
      ) {
        forms[field].errorMsg = !forms[field].validation(forms[field].value)
          ? " Invalid data."
          : "";
        isvalid = isvalid && forms[field].validation(forms[field].value);
      }
    }

    if (!isvalid) {
      this.setState({
        form: {
          ...forms,
        },
      });
    }
    return isvalid;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      is_button_loading: true,
    });
    if (this.isFormValid()) {
      const frm = { ...this.state.form };
      const formData = { upload_proof: [] };
      for (var field in frm) {
        if (field === "billing_address") {
          formData["billing_address"] = {};
          formData["billing_address"]["addr"] = frm[field].value;
        } else if (field === "billing_pincode") {
          formData["billing_address"]["pincode"] = frm[field].value;
        } else {
          formData[field] = frm[field].value;
        }
      }
      this.setState({
        formData: formData,
      });
      this.sendOtp(formData);
    } else {
      this.setState({
        is_button_loading: false,
      });
    }
  };

  sendOtp = async (formData) => {
    const token = isTokenValid(USER_TOKEN);
    if (token) {
      const url = "subscriber/send-verification-otp";
      const headers = {
        Authorization: `Bearer ${token}`,
        authkey: API_SETTING.authkey,
      };
      const request = {
        subscriber_id: this.props.profile.id,
        email: formData.email,
        mobile_no: formData.mobile_no,
      };
      return await api
        .post(url, request, { headers })
        .then((resp) => {
          if (resp.data.success) {
            this.setState({
              modalshow: true,
            });
            return {
              status: resp.data.data.success,
              message: resp.data.data.message,
            };
          } else {
            console.log("Error response", resp.data);
          }
        })
        .catch((err) => {
          let message = showErrorMessage(err.response.data);
          let form = { ...this.state.form };
          form.mobile_no.errorMsg = message;
          this.setState({
            is_button_loading: false,
            form: { ...form },
          });
        });
    }
  };

  saveCustomerData = (formData) => {
    const token = isTokenValid(USER_TOKEN);
    if (token) {
      const url = `subscriber/${this.props.profile.id}?vr=web1.0`;
      const headers = {
        Authorization: `Bearer ${token}`,
        authkey: API_SETTING.authkey,
      };
      api
        .post(url, formData, { headers })
        .then((resp) => {
          if (resp.data.success) {
            this.setState({
              modalshow: false,
            });
            history.push({
              pathname: "/profile",
              hash: "#",
              search: "?=1",
              state: {},
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    const gender_list = ["Male", "Female"];
    const proof_types = [
      { id: 1, value: "Aadhar Card" },
      { id: 2, value: "PAN Card" },
      { id: 3, value: "Driving Licence" },
      { id: 4, value: "Passport" },
      { id: 5, value: "Voter ID" },
    ];
    var content = <SpinnerLoading />;
    if (this.props.profile) {
      content = (
        <Form onSubmit={this.handleSubmit}>
          <div className="card">
            <div>
              <div>
                <div className="px-5 pt-5">
                  <div className="text-xl d-flex align-items-center flex-gap mb-3">
                    <Link
                      to="/profile"
                      type="button"
                      className="btn bg-purple text-white rounded-lg py-1 px-2 text-lg btn-sm"
                    >
                      <ArrowLeft />
                    </Link>
                    My Profile
                  </div>
                </div>

                <div>
                  <div>
                    <div key="personal_details">
                      <div className="px-5 py-2">
                        <div className="text-lg text-center w-full">
                          Personal Details
                        </div>
                      </div>

                      <div className="px-5">
                        <div>
                          <div key="name">
                            <div key="name_label">
                              <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <div className="row d-flex flex-gap px-3">
                                  <div className="flex-grow-1">
                                    <Form.Control
                                      className="input-sm"
                                      type="text"
                                      name="fname"
                                      placeholder="Enter First Name"
                                      value={this.state.form.fname.value}
                                      onChange={this.handleChange}
                                    />
                                    {this.state.form.fname.errorMsg && (
                                      <p className="text-danger">
                                        {this.state.form.fname.errorMsg}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex-grow-1">
                                    <Form.Control
                                      className="input-sm"
                                      type="text"
                                      name="mname"
                                      placeholder="Enter Middle Name"
                                      value={this.state.form.mname.value}
                                      onChange={this.handleChange}
                                    />
                                    {this.state.form.mname.errorMsg && (
                                      <p className="text-danger">
                                        {this.state.form.mname.errorMsg}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex-grow-1">
                                    <Form.Control
                                      className="input-sm"
                                      type="text"
                                      name="lname"
                                      placeholder="Enter Last Name"
                                      value={this.state.form.lname.value}
                                      onChange={this.handleChange}
                                    />
                                    {this.state.form.lname.errorMsg && (
                                      <p className="text-danger">
                                        {this.state.form.lname.errorMsg}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </Form.Group>
                            </div>
                          </div>
                          <div className="d-flex justify-content-around align-items-center flex-gap">
                            <div className="flex-grow-1" key="gender">
                              <div key="gender_label">
                                <Form.Group controlId="gender_id">
                                  <Form.Label>Gender</Form.Label>
                                  <Form.Control
                                    as="select"
                                    onChange={this.handleChange}
                                    name="gender"
                                    value={this.state.form.gender.value}
                                  >
                                    <option value="">Select Gender</option>
                                    {gender_list.map((item, index) => (
                                      <option value={index} key={item}>
                                        {item}
                                      </option>
                                    ))}
                                  </Form.Control>
                                  {this.state.form.gender.errorMsg && (
                                    <p className="text-danger">
                                      {this.state.form.gender.errorMsg}
                                    </p>
                                  )}
                                </Form.Group>
                              </div>
                            </div>
                            <div className="flex-grow-1" key="dob">
                              <div key="dob_label">
                                <Form.Group controlId="dob">
                                  <Form.Label>DOB</Form.Label>
                                  <Form.Control
                                    className="input-sm"
                                    type="date"
                                    name="dob"
                                    placeholder="Enter dob"
                                    min="1960-01-01"
                                    max={new Date(
                                      new Date().setFullYear(
                                        new Date().getFullYear() - 18
                                      )
                                    )
                                      .toISOString()
                                      .slice(0, 10)}
                                    value={this.state.form.dob.value}
                                    onChange={this.handleChange}
                                  />
                                </Form.Group>
                                {this.state.form.dob.errorMsg && (
                                  <p className="text-danger">
                                    {this.state.form.dob.errorMsg}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div key="contact_details">
                      <div className="px-5 py-2">
                        <div className="text-lg text-center w-full">
                          Contact Details
                        </div>
                      </div>
                      <div className="px-5 mt-3">
                        <div className="d-flex justify-content-between align-items-center flex-gap flex-wrap ">
                          <div className="flex-grow-1" key="phone_no">
                            <div key="phone_no">
                              <Form.Group controlId="phone_no">
                                <Form.Label>Phone No.</Form.Label>
                                <Form.Control
                                  className="input-sm"
                                  type="text"
                                  name="phone_no"
                                  placeholder="Enter Phone No."
                                  value={this.state.form.phone_no.value}
                                  onChange={this.handleChange}
                                />
                                {this.state.form.phone_no.errorMsg && (
                                  <p className="text-danger">
                                    {this.state.form.phone_no.errorMsg}
                                  </p>
                                )}
                              </Form.Group>
                            </div>
                          </div>
                          <div className="flex-grow-1" key="mobile_no">
                            <div key="mobile_no">
                              <Form.Group controlId="mobile_no">
                                <Form.Label>Mobile No.</Form.Label>
                                <Form.Control
                                  className="input-sm"
                                  type="text"
                                  name="mobile_no"
                                  placeholder="Enter Mobile No."
                                  value={this.state.form.mobile_no.value}
                                  onChange={this.handleChange}
                                />
                                {this.state.form.mobile_no.errorMsg && (
                                  <p className="text-danger">
                                    {this.state.form.mobile_no.errorMsg}
                                  </p>
                                )}
                              </Form.Group>
                            </div>
                          </div>
                          <div className="flex-grow-1" key="email">
                            <div key="email_label">
                              <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  className="input-sm"
                                  type="email"
                                  name="email"
                                  placeholder="Enter Email"
                                  value={this.state.form.email.value}
                                  onChange={this.handleChange}
                                />
                                {this.state.form.email.errorMsg && (
                                  <p className="text-danger">
                                    {this.state.form.email.errorMsg}
                                  </p>
                                )}
                              </Form.Group>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div key="aadress_details">
                      <div className="px-5 py-2">
                        <div className="text-lg text-center w-full">
                          Address Details
                        </div>
                      </div>
                      <div className="px-5 mt-3">
                        <div className="d-flex justify-content-between align-items-center flex-gap flex-wrap ">
                          <div key="flat_floor_wing">
                            <div key="name_label">
                              <Form.Group controlId="name">
                                <Form.Label>Address</Form.Label>
                                <div className="row d-flex flex-gap px-3">
                                  <div className="flex-grow-1">
                                    <Form.Control
                                      className="input-sm"
                                      type="text"
                                      name="flatno"
                                      placeholder="Enter Flat Number"
                                      value={this.state.form.flatno.value}
                                      onChange={this.handleChange}
                                    />
                                    {this.state.form.flatno.errorMsg && (
                                      <p className="text-danger">
                                        {this.state.form.flatno.errorMsg}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex-grow-1">
                                    <Form.Control
                                      className="input-sm"
                                      type="text"
                                      name="floor"
                                      placeholder="Enter Floor Number"
                                      value={this.state.form.floor.value}
                                      onChange={this.handleChange}
                                    />
                                    {this.state.form.floor.errorMsg && (
                                      <p className="text-danger">
                                        {this.state.form.floor.errorMsg}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex-grow-1">
                                    <Form.Control
                                      className="input-sm"
                                      type="text"
                                      name="wing"
                                      placeholder="Enter Wing"
                                      value={this.state.form.wing.value}
                                      onChange={this.handleChange}
                                    />
                                    {this.state.form.wing.errorMsg && (
                                      <p className="text-danger">
                                        {this.state.form.wing.errorMsg}
                                      </p>
                                    )}
                                  </div>

                                  <div className="flex-grow-1">
                                    <Form.Control
                                      className="input-sm"
                                      as="textarea"
                                      name="installation_address"
                                      placeholder="Enter Land Mark / Address"
                                      value={
                                        this.state.form.installation_address
                                          .value
                                      }
                                      onChange={this.handleChange}
                                    />
                                    {this.state.form.installation_address
                                      .errorMsg && (
                                      <p className="text-danger">
                                        {
                                          this.state.form.installation_address
                                            .errorMsg
                                        }
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex-grow-1">
                                    <Form.Control
                                      className="input-sm"
                                      type="text"
                                      name="pincode"
                                      placeholder="Enter Pincode"
                                      value={this.state.form.pincode.value}
                                      onChange={this.handleChange}
                                    />
                                    {this.state.form.pincode.errorMsg && (
                                      <p className="text-danger">
                                        {this.state.form.pincode.errorMsg}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </Form.Group>
                            </div>
                          </div>

                          <div className="w-full" key="billing_address_k">
                            <div key="name_label">
                              <Form.Group controlId="name">
                                <Form.Label>Billing Address</Form.Label>
                                <div className="row d-flex flex-gap px-3">
                                  <div className="flex-grow-1">
                                    <Form.Control
                                      className="input-sm"
                                      as="textarea"
                                      name="billing_address"
                                      placeholder="Enter Billing Address"
                                      value={
                                        this.state.form.billing_address.value
                                      }
                                      onChange={this.handleChange}
                                    />
                                    {this.state.form.billing_address
                                      .errorMsg && (
                                      <p className="text-danger">
                                        {
                                          this.state.form.billing_address
                                            .errorMsg
                                        }
                                      </p>
                                    )}
                                  </div>

                                  <div className="flex-grow-1">
                                    <Form.Control
                                      className="input-sm"
                                      type="text"
                                      name="billing_pincode"
                                      placeholder="Enter Billing Pincode"
                                      value={
                                        this.state.form.billing_pincode.value
                                      }
                                      onChange={this.handleChange}
                                    />
                                    {this.state.form.billing_pincode
                                      .errorMsg && (
                                      <p className="text-danger">
                                        {
                                          this.state.form.billing_pincode
                                            .errorMsg
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </Form.Group>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div key="proofs_details">
                      <div className="px-5 py-2">
                        <div className="text-lg text-center w-full">Proofs</div>
                      </div>
                      <div className="px-5">
                        <div>
                          <div key="subscriber_photo">
                            <div key="subscriber_photo">
                              <Form.Group controlId="name">
                                <Form.Label>
                                  Subscriber Photo (MAX 2Mb)
                                </Form.Label>
                                <div className="row d-flex flex-gap px-3">
                                  <div className="flex-grow-1">
                                    <Form.Control
                                      className="input-sm"
                                      type="file"
                                      name="customer_photo"
                                      onChange={this.handleFileUpload}
                                    />
                                  </div>
                                </div>
                              </Form.Group>
                            </div>
                          </div>

                          <div key="address_proof_tr">
                            <div key="address_proof_td">
                              <Form.Group controlId="address_proofs">
                                <Form.Label>Address Proof (MAX 2Mb)</Form.Label>
                                <div className="row d-flex flex-gap px-3">
                                  <div className="flex-grow-1">
                                    <Form.Control
                                      as="select"
                                      onChange={this.handleChange}
                                      name="address_proof_document"
                                      value={
                                        this.state.form.address_proof_document
                                          .value
                                      }
                                    >
                                      <option value="">
                                        Select Address Proof
                                      </option>
                                      {proof_types.map((item, index) => (
                                        <option value={item.id} key={item.id}>
                                          {item.value}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  </div>
                                  <div className="flex-grow-1">
                                    <Form.Control
                                      className="input-sm"
                                      type="file"
                                      name="address_proof"
                                      placeholder="upload file"
                                      onChange={this.handleFileUpload}
                                    />
                                  </div>
                                </div>
                              </Form.Group>
                            </div>
                          </div>

                          <div key="id_proof_tr">
                            <div key="id_proof_td">
                              <Form.Group controlId="id_proofs">
                                <Form.Label>ID Proof (MAX 2Mb)</Form.Label>
                                <div className="row d-flex flex-gap px-3">
                                  <div className="flex-grow-1">
                                    <Form.Control
                                      as="select"
                                      onChange={this.handleChange}
                                      name="id_proof_document"
                                      value={
                                        this.state.form.id_proof_document.value
                                      }
                                    >
                                      <option value="">Select ID Proof</option>
                                      {proof_types.map((item, index) => (
                                        <option value={item.id} key={item.id}>
                                          {item.value}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  </div>
                                  <div className="flex-grow-1">
                                    <Form.Control
                                      type="file"
                                      name="id_proof"
                                      placeholder="upload file"
                                      onChange={this.handleFileUpload}
                                    />
                                  </div>
                                </div>
                              </Form.Group>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center pb-5">
                      <button
                        className="btn btn-purple px-5"
                        type="submit"
                        disabled={this.state.is_button_loading}
                      >
                        {this.state.is_button_loading
                          ? "Processing..."
                          : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <OtpVerificationModal
            modalshow={this.state.modalshow}
            handleClose={() =>
              this.setState({ modalshow: false, is_button_loading: false })
            }
            subscriber_id={this.props.profile.id}
            email={this.state.form.email.value}
            mobile_no={this.state.form.mobile_no.value}
            formdata={this.state.formData}
          />
        </Form>
      );
    }

    return content;
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.customer.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAccounts: () => dispatch(action.fetchAccounts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
