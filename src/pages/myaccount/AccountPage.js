import React from 'react';
import AccountList from '../../components/AccountList';
import AdvertiseBanner from '../../components/AdvertiseBanner';

const AccountPage = ({ accounts, banners,pygt }) => (
    <div className="row gutters-sm">
        {banners.length > 0 && <AdvertiseBanner banners={banners} />}
        {accounts.map((account, index) => <AccountList pygt={pygt} account={account} index={index} key={account.id} />)}
    </div>
);

export default AccountPage;