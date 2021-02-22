import React from 'react';
import BouListSel from './BouListSel';

const BouquetSelectionListing = ({ bouquets, title, is_checked, disabled, removeBouquet }) => {
    console.log('Boquuet', bouquets, title);
    return (
        <div className="card col col-12 col-sm-12 col-lg-12">
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
            </div>
            <div className="card-body">
                <div className="row row-cards">
                    {
                        bouquets.map((bouquet, index) => <BouListSel
                            bouquet={bouquet}
                            removeBouquet={removeBouquet}
                            key={index}
                            disabled={disabled}
                            is_checked={is_checked}
                        />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default BouquetSelectionListing;