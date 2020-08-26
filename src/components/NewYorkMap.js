import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";

import PlaceMarker from "./PlaceMarkers";
import PropTypes from "prop-types";

class Map extends React.Component {
  
  static propTypes = {
    places: PropTypes.array.isRequired, // list of places
    selectedPlaceId: PropTypes.string,    // selected place's id, not required
    showRoute: PropTypes.bool           // show connection from place to place
  }

  state = {
    selectedPlace: this.props.seletecPlaceId? this.props.seletecPlaceId : null
  }

  componentDidUpdate(prevProps) {
    if (prevProps.places !== this.props.places) {  // when map is showing a different set of places, remove selected marker
      this.setState({
        selectedPlace: this.props.selectedPlaceId
      })
    }
  }

    getMapRef = (mapInstance) => {
        this.map = mapInstance;
        window.map = mapInstance;
    }

    handleMapMounted = (map) => {
        this.map = map
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();
            this.props.places.map(place => {
                const { lat, lon } = place;
                bounds.extend({lat, lng: lon});
            });
            map.fitBounds(bounds);
        }
    }

    onToggle = () => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    }

    getPixelPositionOffset = (width, height) => ({
        x: -(width / 2),
        y: -(height / 2),
    })

    handleToggleMarker = (place) => {
      this.setState({
        selectedPlace: place.id
      });
    }

    render() {
        return (
            <GoogleMap
                ref={this.getMapRef()}
                zoom={13}
                center={{ lat: 40.78, lng: -73.935242 }}
                onLoad={this.handleMapMounted}
                onClick={this.handleMapClick}
            >
                {this.props.places.map( (place, index) => 
                  <PlaceMarker 
                    place={place} 
                    key={index} 
                    map={this.map} 
                    toggleMarker={() => this.handleToggleMarker(place)} 
                    isOpen={this.state.selectedPlace && this.state.selectedPlace === place.id} />)}
            </GoogleMap>
        );
    }
}

const NewYorkMap = withScriptjs(withGoogleMap(Map));

export default NewYorkMap;