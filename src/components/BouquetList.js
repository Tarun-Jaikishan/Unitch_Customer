import React from 'react';
import { BOUQUET_ADDONS, BOUQUET_BASE } from '../env.conf';

const BouquetList = ({ item, index }) => (
    <tr key={index}>
        <th>{item.bouque_name}</th>
        <th>{item.bouque_type === BOUQUET_BASE ? "BASE" : (item.bouque_type === BOUQUET_ADDONS ? "ADDONS" : "ALACARTE")}</th>
        <th>{item.activation_date}</th>
        <th>{item.deactivation_date}</th>
    </tr>
);

export default BouquetList;