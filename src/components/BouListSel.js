import React from "react";

const BouListSel = ({ bouquet, is_checked, disabled, removeBouquet }) => (
  <div>
    <div className="inner-card p-5 border rounded-lg">
      <div className="d-flex align-items-center ">
        <span>
          <input
            type="checkbox"
            className="custom-control"
            disabled={disabled}
            value={bouquet.id}
            defaultChecked={is_checked}
            style={{
              zIndex: 100,
              border: "1px solid #467fcf",
              opacity: 10,
              width: "1.3rem",
              marginRight: "1rem",
            }}
            onClick={(e) => {
              let type = e.target.checked ? true : false;
              removeBouquet(bouquet.id, type);
            }}
          />
        </span>
        <div>
          <div className="h6 m-0">{bouquet.name}</div>
        </div>
      </div>
    </div>
  </div>
);

export default BouListSel;
