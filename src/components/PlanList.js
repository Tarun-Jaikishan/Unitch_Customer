import React from 'react';
import {SITE_SETTING} from '../env.conf';
import PricingCard from './pricingCard';


const PlanList = ({ bouquets, callback }) => (
    <div className="row">
        {bouquets.map(bouquet => {
            let counts = 0;
            if (bouquet.package) {
                bouquet.package.forEach(pack => {
                    counts += pack.totalChannelCount;
                });
            }
            if (bouquet.alacarte) {
                counts += bouquet.alacarte.length;
            }

            const feature = [{ name: "GST Applicable", value: "18%" }];
            if (SITE_SETTING.settings.plan_channel_count) {
                feature.push({ name: "Channel Count", value: counts });
            }

            const data = {
                id: bouquet.id,
                name: bouquet.name,
                price: `Rs ${(parseFloat(bouquet.mrp)).toFixed(2)}/month`,
                features: feature,
                callback: callback
            }
            if (!bouquet.ifFixNCF) {
                data.features.push({ name: "NCF Extra Applicable", value: "" })
            }
            return <PricingCard {...data} key={bouquet.id} callback={callback} />
        })}
    </div>
);

export default PlanList;