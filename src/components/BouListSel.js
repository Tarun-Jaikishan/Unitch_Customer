import React from 'react';

const BouListSel = ({ bouquet, is_checked, disabled, removeBouquet }) => (
    <div className="col col-sm-6 col-lg-3">
        <div className="card p-3">
            <div className="d-flex align-items-center">
                <span className="stamp-md mr-3">
                    <input type="checkbox" className="custom-control-input custom-control"
                        disabled={disabled} value={bouquet.id}
                        defaultChecked={is_checked}
                        style={{ zIndex: 100, border: "1px solid #467fcf", opacity: 10, margin: "10px" }}
                        onClick={(e) => { let type = (e.target.checked) ? true : false; removeBouquet(bouquet.id, type) }}
                    />
                </span>
                <div>
                    <div className="h6 m-0">
                        {bouquet.name}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default BouListSel;