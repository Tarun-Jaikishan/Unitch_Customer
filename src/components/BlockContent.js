import React from 'react';
import CardDisplay from './CardDisplay';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

const BlockContentOld = ({ genre_id, genre_name, channel_list }) => (
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


const BlockContent = ({ genre_id, genre_name, channel_list }) => (
    <Card>
        <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={genre_id}>
                {genre_name}
            </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={genre_id}>
            <Card.Body>
                <div className="row row-cards row-deck">
                    {channel_list.map(({ id, name, logo_url }) => {
                        return (<div className="col col-sm-6 col-xl-3" key={id}>
                            <CardDisplay title={name} imgUrl={logo_url} />
                        </div>
                        );
                    })}
                </div>
            </Card.Body>
        </Accordion.Collapse>
    </Card>
);

export default BlockContent;