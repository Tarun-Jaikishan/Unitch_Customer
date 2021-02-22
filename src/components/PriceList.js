import React from 'react';


const PriceList = ({ handleOnChange,id, ncf_mrp_price, ncf_mrp_tax, ncf_mrp_total, mrp_amount, mrp_price, mrp_tax, mrp_total, name, ncf_sd_channel_count, ncf_sd_channels, nonncf_channel_count }) => (
    <div className="col col-sm-12 col-lg-6">
        <div className="card p-3">
            <div className="d-flex align-items-center">
                <span className="stamp-md mr-3">
                    <input type="radio" className="custom-control-input custom-control" name="rperiod_id"
                        value={id} onChange={handleOnChange}
                        style={{ zIndex: 100, border: "1px solid #467fcf", opacity: 10, margin: "10px" }}
                    />
                </span>
                <div>
                    <div className="h6 m-0">
                        {name} - Rs.{mrp_amount}
                    </div>
                    <small className="sm text-muted">NCF Channels : {ncf_sd_channel_count}</small><br />
                    <small className="sm text-muted">NCF Price : {ncf_mrp_total}</small><br />
                    <small className="sm text-muted">MRP Price : {mrp_total}</small>
                </div>
            </div>
        </div>
    </div>
);

export default PriceList;