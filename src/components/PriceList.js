import React from "react";

const PriceList = ({
  handleOnChange,
  id,
  ncf_mrp_price,
  ncf_mrp_tax,
  ncf_mrp_total,
  mrp_amount,
  mrp_price,
  mrp_tax,
  mrp_total,
  name,
  ncf_sd_channel_count,
  ncf_sd_channels,
  nonncf_channel_count,
}) => (
  <div key={id}>
    <div className="inner-card p-5 border rounded-lg">
      <div className="d-flex align-items-center">
        <span>
          <input
            type="radio"
            className="custom-control"
            name="rperiod_id"
            value={id}
            onChange={handleOnChange}
            style={{
              zIndex: 100,
              border: "1px solid #467fcf",
              opacity: 10,
              width: "1.2rem",
              marginRight: "1rem",
            }}
          />
        </span>
        <div className="text-md">
          <div className="ml-2 font-weight-bold">
            {name} - Rs. {mrp_amount}
          </div>
          <table className="inner-table">
            <tr>
              <td>
                <small className="text-muted" key="ncf_mrp_total">
                  NCF Price
                </small>
              </td>
              <td>
                <span className="px-2 py-1 bg-purple text-white rounded-lg">
                  {ncf_mrp_total ? ncf_mrp_total : 0}
                </span>
              </td>
            </tr>

            <tr>
              <td>
                <small className="text-muted" key="ncf_mrp_total">
                  NCF Channels
                </small>
              </td>
              <td>
                <span className="px-2 py-1 bg-purple text-white font-weight-bolder rounded-lg">
                  {ncf_sd_channel_count ? ncf_sd_channel_count : 0}
                </span>
              </td>
            </tr>

            <tr>
              <td>
                <small className="text-muted" key="ncf_mrp_total">
                  MRP Price
                </small>
              </td>
              <td>
                <span className="px-2 py-1 bg-purple text-white font-weight-bolder rounded-lg">
                  {mrp_total ? mrp_total : 0}
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default PriceList;
