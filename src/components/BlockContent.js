import React from 'react';
import CardDisplay from './CardDisplay';

const BlockContent = ({ genre_id, genre_name, channel_list }) => (
    <>
        <div className="page-header">
            <h5 className="page-title">{genre_name}</h5>
        </div>
        <div className="row row-cards row-deck">
            {channel_list.map(({ id, name, logo_url }) => {
                return (<div className="col col-sm-6 col-xl-3" key={id}>
                    <CardDisplay title={name} imgUrl={logo_url} />
                </div>
                );
            })}
        </div>
    </>
);

export default BlockContent;