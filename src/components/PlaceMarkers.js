import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types';

class PlaceMarker extends React.Component {
    static propTypes = {
        place: PropTypes.object.isRequired,
    }

    state = {
        isOpen: false,
    }

    handleToggle = () => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
        // if (this.props.map.zoom < 13) {
        //     this.props.map.zoom = 13;
        // }

    }

    // zoom = () => {
    //     if (zoom < 13) {
    //         setZoom(13);
    //     }
    // }

    render() {
        const { address, message, imageUrl, category, info, lat, lon } = this.props.place;
        return (
            <Marker
                position={{ lat:lat, lng: lon }}
                // onMouseOver={this.handleToggle}
                // onMouseOut={this.handleToggle}
                onClick={this.handleToggle}
            >
                {this.state.isOpen ? (
                    <InfoWindow>
                        <div>
                            <img src={imageUrl} alt={message} className="around-marker-image"/>
                            <p>{`address: ${address}`}</p>
                            <p>{`category: ${category}`}</p>
                            <p>{`info: ${info}`}</p>
                        </div>
                    </InfoWindow>
                ) : null}
            </Marker>
        );
    }
}

export default PlaceMarker;
