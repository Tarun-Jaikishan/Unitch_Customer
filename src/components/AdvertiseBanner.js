import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

const AdvertiseBanner = ({ banners }) => (
    <Carousel>
        {banners.map(({ title, caption, description, imageUrl, id }) => (
            <Carousel.Item key={id}>
                <img
                    className="d-block w-100"
                    src={imageUrl}
                    alt={title}
                />
                <Carousel.Caption>
                    <h3>{caption}</h3>
                    <p>{description}</p>
                </Carousel.Caption>
            </Carousel.Item>
        ))}
    </Carousel>
);

export default AdvertiseBanner;