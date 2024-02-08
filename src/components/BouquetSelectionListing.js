import React from "react";
import BouListSel from "./BouListSel";

const BouquetSelectionListing = ({
  bouquets,
  title,
  is_checked,
  disabled,
  removeBouquet,
}) => {
  return (
    <div className="card p-5">
      <div>
        <div className="text-lg text-center">{title}</div>
      </div>
      <br />
      <div>
        <div className="d-flex flex-wrap flex-gap">
          {bouquets.map((bouquet, index) => (
            <BouListSel
              bouquet={bouquet}
              removeBouquet={removeBouquet}
              key={index}
              disabled={disabled}
              is_checked={is_checked}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BouquetSelectionListing;
