import React from 'react';
import { SITE_SETTING } from '../env.conf';

const PricingCard = ({ id, name, price, features, callback }) => (

    <div className="col col-sm-3 col-lg-3">
        <div className="card">
            <div className="card-body text-center">
                <div className="card-category">{name}</div>
                <div className="my-4"><strong>{price}</strong></div>
                <ul className="list-unstyled leading-loose">
                    {features.map((feature, index) => <li key={feature.name}>{feature.name} <strong>{feature.value}</strong></li>)}
                </ul>
                {SITE_SETTING.settings.plan_details && <div className="text-center mt-6">
                    {callback && <button className="btn btn-secondary btn-block" onClick={() => callback(id)}>
                        <i className="fe fe-align-justify" />
                    </button>}
                </div>}
            </div>
        </div>
    </div>
);

export default PricingCard;