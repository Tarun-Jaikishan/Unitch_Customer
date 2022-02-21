import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { SITE_SETTING } from '../env.conf';
import HighLights from '../components/home/HighLights';

class HomePage extends Component {

    carousel_list = SITE_SETTING.dashboard_carousel;

    render() {
        return (<div>
            <Carousel>
                {this.carousel_list.map(({ title, caption, description, imageUrl, style }) => (
                    <Carousel.Item interval={1000} key={title} >
                        <img
                            className="d-block w-100"
                            src={imageUrl}
                            alt={title}
                        />
                        <Carousel.Caption style={style} >
                            <h3>{caption}</h3>
                            <p>{description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))
                }
            </Carousel>

            <HighLights />
        </div>);
    }
}

export default HomePage;