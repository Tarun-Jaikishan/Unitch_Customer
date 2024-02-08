import React from "react";
import { BOUQUET_ADDONS, BOUQUET_BASE } from "../env.conf";

const BouquetList = ({ item, index }) => (
  <tr className="tr-hover" key={index}>
    <td className="text-center">{item.bouque_name}</td>
    <td className="text-center">
      {item.bouque_type === BOUQUET_BASE
        ? "BASE"
        : item.bouque_type === BOUQUET_ADDONS
        ? "ADDONS"
        : "ALACARTE"}
    </td>
    <td className="text-center">{item.activation_date}</td>
    <td className="text-center">{item.deactivation_date}</td>
  </tr>
);

export default BouquetList;
