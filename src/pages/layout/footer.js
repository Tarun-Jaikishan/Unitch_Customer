import React from 'react';
import { SITE_SETTING } from '../../env.conf';

const Footer = () => (
    <div className="footer">
        <div className="container">
            <div className="row row align-items-center flex-row-reverse">
                <div className="col col-auto ml-auto">
                    <div className="row row align-items-center">
                        <div className="col col-auto">
                            <ul className="list list-inline list-inline-dots mb-0">
                                <li className="list-inline-item">Complaint at : {SITE_SETTING.company_contact.crm}</li>
                                <li className="list-inline-item">Contact us : {SITE_SETTING.company_contact.supp}</li>
                                <li className="list-inline-item">Email us : {SITE_SETTING.company_email}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col col-12 col-lg-auto mt-3 mt-lg-0 text-center">
                    Copyright &#169; {(new Date()).getFullYear()} {SITE_SETTING.company_name}. All right reserved.
                </div>
            </div>
        </div>
    </div>
);

export default Footer;