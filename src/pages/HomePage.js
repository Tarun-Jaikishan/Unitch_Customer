import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import SliderOne from '../resouces/images/front/slider1.jpg';
import SliderTwo from '../resouces/images/front/slider2.jpg';
import HighLights from '../components/home/HighLights';

class HomePage extends Component {

    carousel_list = [
        {
            title: "EFFICIENCE APP",
            caption: "ONE APP FOR ALL",
            description: "Renew Subscription | Add Channels | Raise Complaint",
            imageUrl: SliderOne,
            style: {
                top: "48%",
                left: 0,
                right: "auto",
                width: "40%"
            }
        },
        {
            title: "Redefine TV Experience",
            caption: "Redefine TV Experience",
            description: "Watch all favourite contents in HD",
            imageUrl: SliderTwo,
            style: {}
        },
    ];

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