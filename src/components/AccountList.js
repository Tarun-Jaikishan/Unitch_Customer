import React from "react";
import BouquetList from "../components/BouquetList";
import { history } from "../utilits";
import {
  PlusSquareFill,
  FileEarmarkPlusFill,
  PencilSquare,
  ExclamationDiamondFill,
  FileSpreadsheetFill,
} from "react-bootstrap-icons";

const AccountList = ({ index, account, pygt, profile }) => {
  console.log(profile);
  const bouquet_ids = account.bouque.map((item) => item.bouque_id);
  return (
    <div className="w-full">
      <div className="pb-5 d-flex justify-content-between align-items-center flex-gap">
        <div className="text-xl d-none d-lg-block ">Account {index + 1}</div>
        <div className="font-weight-bolder text-lg d-lg-none ">
          Account {index + 1}
        </div>
        <div className="d-flex flex-gap flex-wrap">
          {pygt !== 2 && (
            <button
              className="btn btn-outline-purple flex-grow-1 d-flex align-items-center flex-gap-sm"
              onClick={() =>
                history.push({
                  pathname: `/myaccount/renewal/${account.id}/${bouquet_ids}`,
                  hash: "#",
                  search: "",
                  state: { bouquet_ids: bouquet_ids, account_id: account.id },
                })
              }
            >
              <PlusSquareFill /> Renew
            </button>
          )}
          {pygt !== 2 && account.status !== -2 && (
            <button
              className="btn btn-outline-purple flex-grow-1 d-flex align-items-center flex-gap-sm"
              onClick={() =>
                history.push({
                  pathname: `/myaccount/addons/${account.id}`,
                  hash: "#",
                  search: "",
                  state: { account_id: account.id },
                })
              }
            >
              <FileEarmarkPlusFill /> Addons
            </button>
          )}
          <button
            className="btn btn-outline-purple flex-grow-1 d-flex align-items-center flex-gap-sm"
            onClick={() =>
              history.push({
                pathname: `/myaccount/tickets/${account.id}`,
                hash: "#",
                search: "",
                state: { account_id: account.id },
              })
            }
          >
            <ExclamationDiamondFill /> Tickets
          </button>
          <button
            className="btn btn-outline-purple flex-grow-1 d-flex align-items-center flex-gap-sm"
            onClick={() =>
              history.push({
                pathname: `/myaccount/ledger/${account.id}/${account.smartcardno}/${account.stbno}`,
                hash: "#",
                search: "",
                state: {
                  account_id: account.id,
                  smartcardno: account.smartcardno,
                  stbno: account.stbno,
                },
              })
            }
          >
            <FileSpreadsheetFill /> Ledger
          </button>
        </div>
      </div>

      <div className="card p-5">
        <div className="mt-5">
          <div className="table-responsive">
            <div className="d-lg-flex flex-gap">
              <fieldset className="border rounded-lg p-3">
                <legend className="font-weight-bolder text-lg w-fit px-2">
                  Subscriber Information
                </legend>
                <div className="mt-2 d-flex flex-gap align-items-center">
                  <div className="d-flex flex-gap align-items-center ">
                    <div>
                      <strong>Customer Name</strong>
                    </div>
                    <div className="px-2 py-1 bg-purple text-white font-weight-bolder rounded-lg">
                      {profile.name}
                    </div>
                  </div>

                  <div className="d-flex flex-gap align-items-center ">
                    <div>
                      <strong>Customer ID</strong>
                    </div>
                    <div className="px-2 py-1 bg-purple text-white font-weight-bolder rounded-lg">
                      {profile.customer_id}
                    </div>
                  </div>
                </div>
                <br />
                <div className="mt-2 d-flex flex-gap align-items-center h-fit">
                  {" "}
                  <div className="d-flex flex-gap align-items-center ">
                    <div>
                      <strong>Billing Address / Pincode</strong>
                    </div>
                    <div className="px-2 py-1 bg-purple text-white font-weight-bolder rounded-lg">
                      {profile.billing_address.addr} /{" "}
                      {profile.billing_address.pincode}
                    </div>
                  </div>
                  <div className="d-flex flex-gap align-items-center ">
                    <div>
                      <strong>Mobile Number</strong>
                    </div>
                    <div className="px-2 py-1 bg-purple text-white font-weight-bolder rounded-lg">
                      {profile.mobile_no}
                    </div>
                  </div>
                </div>
              </fieldset>
              <br />

              <fieldset className="border rounded-lg p-3">
                <legend className="font-weight-bolder text-lg w-fit px-2">
                  Box Information
                </legend>
                <div className="mt-2 d-lg-flex flex-gap align-items-center">
                  <div className="d-flex flex-gap align-items-center ">
                    <div>
                      <strong>Smartcard No</strong>
                    </div>
                    <div className="px-2 py-1 bg-purple text-white font-weight-bolder rounded-lg">
                      {account.smartcardno}
                    </div>
                  </div>

                  <br />

                  <div className="d-flex flex-gap align-items-center ">
                    <div>
                      <strong>STB No</strong>
                    </div>
                    <div className="px-2 py-1 bg-purple text-white font-weight-bolder rounded-lg">
                      {account.stbno}
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>

            <br />

            <fieldset className="border rounded-lg p-3">
              <legend className="font-weight-bolder text-lg w-fit px-2">
                Digital Information
              </legend>
              <div className="mt-2 d-flex flex-gap align-items-center">
                <div className="d-flex flex-gap align-items-center ">
                  <div>
                    <strong>Current Status</strong>
                  </div>
                  <div className="px-2 py-1 bg-purple text-white font-weight-bolder rounded-lg">
                    {account.status_lbl}
                  </div>
                </div>

                <div className="d-flex flex-gap align-items-center ">
                  <div>
                    <strong>Activation Date</strong>
                  </div>
                  <div className="px-2 py-1 bg-purple text-white font-weight-bolder rounded-lg">
                    {account.activation_date}
                  </div>
                </div>

                <div className="d-flex flex-gap align-items-center ">
                  <div>
                    <strong>Deactivation Date</strong>
                  </div>
                  <div className="px-2 py-1 bg-purple text-white font-weight-bolder rounded-lg">
                    {account.activation_date}
                  </div>
                </div>
              </div>
            </fieldset>
            <br />
          </div>

          <div className="mt-5">
            <table className="table-hover table-bordered">
              <tr>
                <th className="text-center">
                  <strong>Bouquet</strong>
                </th>
                <th className="text-center">
                  <strong>Type</strong>
                </th>
                <th className="text-center">
                  <strong>Start Date</strong>
                </th>
                <th className="text-center">
                  <strong>End Date</strong>
                </th>
              </tr>
              <>
                {account.bouque.map((item, index) => (
                  <BouquetList item={item} index={index} key={index} />
                ))}
              </>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountList;
