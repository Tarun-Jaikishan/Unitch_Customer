import React, { Component } from 'react';
import { extApi } from '../axios';
import Spinner from './Spinner';
import PopupModal from './PopupModal';
import BlockContent from './BlockContent';
import { RemoveTokens } from '../utilits';
import { Accordion } from 'react-bootstrap';


class PlanDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: null,
            name: "Loading....",
            channels: [],
            is_loading: true
        }
    }


    componentDidMount() {
        this.fetchBouquetDetails();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            this.fetchBouquetDetails();
        }
    }

    fetchBouquetDetails = () => {
        const url = `/bouque/${this.props.id}?fields=id,name&expand=channels`;
        extApi.get(url)
            .then(response => {
                console.log(response);
                const resp = response.data.data;
                this.setState({
                    name: resp.name,
                    id: resp.id,
                    channels: resp.channels,
                    is_loading: false
                });
            }).catch(err => {
                if (err.response) {
                    if (err.response.data.status === 401) {
                        RemoveTokens(false);
                    }
                }
            });
    }


    closeModal = () => {
        this.props.setModalShow();
        this.setState({
            id: null,
            name: "Loading....",
            channels: [],
            is_loading: false
        });
    }

    render() {
        let content = <Spinner />;
        if (this.state.channels.length > 0) {
            content = this.state.channels.map(({ genre_id, genre_name, channel_list }) => {
                return <BlockContent key={genre_id} channel_list={channel_list} genre_id={genre_id} genre_name={genre_name} />
            });

            content = <Accordion>{content}</Accordion>
        }

        return (
            <PopupModal show={this.props.modalShow} onHide={() => this.closeModal()} title={this.state.name} content={content} />
        );
    }
}

export default PlanDetails;