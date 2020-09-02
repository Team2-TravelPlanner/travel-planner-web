import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types';
import greenIcon from "../assets/images/green-icon.svg";
import {Place_API} from "../constants";

class PlaceMarker extends React.Component {

  MAP_DIR_BASE = "https://www.google.com/maps/dir/?api=1";

    static propTypes = {
        place: PropTypes.object.isRequired,

    }

    render() {
        const { name, address, message, imageLink, categories, info, lat, lon, website } = this.props.place;
        return (
            <Marker
                position={{ lat:lat, lng: lon }}
                onClick={this.props.toggleMarker}
                // icon={customizedIcon}
            >
                {this.props.isOpen ? (
                    <InfoWindow>
                        <div className="marker-popup">
                            <img src={imageLink + Place_API} alt={message} className="marker-image"/>
                            <div className="marker-info">
                              <h5>{name}</h5>
                              <p>{address} <a href={`${this.MAP_DIR_BASE}&destination=${lat},${lon}`}
                                   target="_blank"
                                   rel="noreferrer noopener">Get direction</a>
                              </p>
                                {categories.map(category => <p key = {category} className="marker-cat">{category}</p>)}
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
