import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import { Image } from "react-bootstrap";
import PropTypes from 'prop-types';

class PlaceMarker extends React.Component {

  MAP_DIR_BASE = "https://www.google.com/maps/dir/?api=1";

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
        const { name, address, message, imageUrl, category, info, lat, lon, website } = this.props.place;
        return (
            <Marker
                position={{ lat:lat, lng: lon }}
                onClick={this.handleToggle}
            >
                {this.state.isOpen ? (
                    <InfoWindow>
                        <div className="marker-popup">
                            <img src={imageUrl} alt={message} className="marker-image"/>
                            <div className="marker-info">
                              <h5>{name}</h5>
                              <p>{address} <a href={`${this.MAP_DIR_BASE}&destination=${lat},${lon}`}
                                   target="_blank"
                                   rel="noreferrer noopener">Get direction</a>
                              </p>
                              <p className="marker-cat">{category}</p>
                              <p><a href={website} target="_blank" rel="noreferrer noopener">{website}</a></p>
                              <p className="marker-desc">{info}</p>
                            </div>
                            
                        </div>
                    </InfoWindow>
                ) : null}
            </Marker>
        );
    }
}

export default PlaceMarker;
