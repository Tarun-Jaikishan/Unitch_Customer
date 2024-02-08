import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "./styles.scss";
import DvDQuality from "../../resouces/images/front/dvd_quality.png";
import ChannelSelection from "../../resouces/images/front/channel_selection.png";
import ElectronicGuide from "../../resouces/images/front/electronic_guide.png";
import ParentalLock from "../../resouces/images/front/parental_lock.png";
import RecordShow from "../../resouces/images/front/record_show.png";
import SoundQuality from "../../resouces/images/front/sound_quality.png";

class FeaturesList extends Component {
  features = [
    {
      title: "DVD Quality",
      description:
        "Never miss even the smallest details while watching TV, now enjoy the Video with DVD picture quality.",
      img: DvDQuality,
      class: "deg0",
    },
    {
      title: "Channel Selection",
      description:
        "With Genre-wise channel selection function we sort your choice of channels at one place. ",
      img: ChannelSelection,
      class: "deg45",
    },
    {
      title: "Surround Sound",
      description:
        "Enjoy the sound that soothes your ear buds Excellent audio with stereophonic sound ",
      img: SoundQuality,
      class: "deg135",
    },
    {
      title: "Electronic Program Guide",
      description:
        "With advanced electronic program guide Never miss your favorite shows",
      img: ElectronicGuide,
      class: "deg180",
    },
    {
      title: "Parental Lock",
      description:
        "Don’t want your kids to surf unwanted channels? Lock the channels and live without worry.",
      img: ParentalLock,
      class: "deg225",
    },
    {
      title: "Record Shows",
      description:
        "Don’t have time to watch your favourite shows, just record and save it on USB pen drive and enjoy it later on ",
      img: RecordShow,
      class: "deg315",
    },
  ];

  render() {
    return (
      <div class="circle-container">
        {this.features.map((feature) => (
          <Card style={{ width: "18rem" }} className={feature.class}>
            <div className="d-flex">
              <Card.Body>
                <div className="d-inline-flex">
                  <Card.Img
                    variant="top"
                    src={feature.img}
                    style={{ width: "45px", height: "45px" }}
                  />
                  <Card.Title>{feature.title}</Card.Title>
                </div>
                <Card.Text>{feature.description}</Card.Text>
              </Card.Body>
            </div>
          </Card>
        ))}
      </div>
    );
  }
}

export default FeaturesList;
