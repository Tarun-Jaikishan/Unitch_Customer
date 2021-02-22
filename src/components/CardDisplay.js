import React from 'react';

const CardDisplay = ({ title, imgUrl }) => (
    <div className="card">
        <img src={imgUrl} className="card-img-top" alt={title} />
        <div className="card-body d-flex flex-column">
            <h6>
                {title}
            </h6>
        </div>
    </div>
);

export default CardDisplay;