import React from "react";
import { SITE_SETTING } from "../../env.conf";

const Footer = () => (
  <div>
    <div className="d-none d-md-block">
      <div className="footer footer-zindex d-flex justify-content-between px-5 flex-wrap">
        <div>
          Copyright &#169; {new Date().getFullYear()}{" "}
          {SITE_SETTING.company_name}. All Right Reserved.
        </div>

        <div className="d-flex flex-wrap flex-gap">
          <div>Complaint At : {SITE_SETTING.company_contact.crm}</div>
          <div>Contact Us : {SITE_SETTING.company_contact.supp}</div>
          <div>Email Us : {SITE_SETTING.company_email}</div>
        </div>
      </div>
    </div>

    {/* Mobile Responsive */}

    <div className="d-md-none">
      <div className="footer footer-zindex  px-5 py-2 flex-wrap footer-text-sm">
        <div className="text-center">
          Copyright &#169; {new Date().getFullYear()}{" "}
          {SITE_SETTING.company_name}. All Right Reserved.
        </div>

        <div className="d-flex flex-gap justify-content-center">
          <div>Complaint At : {SITE_SETTING.company_contact.crm}</div>
          <div>Contact Us : {SITE_SETTING.company_contact.supp}</div>
        </div>
        <div className="text-center ">
          Email Us : {SITE_SETTING.company_email}
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
