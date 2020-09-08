import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Polyline
} from "react-google-maps";
import PlaceMarker from "./PlaceMarkers";
import PropTypes from "prop-types";
class Map extends React.Component {
  
  static propTypes = {
    places: PropTypes.array.isRequired, // list of places
    selectedPlaceId: PropTypes.string,    // selected place's id
    showRoute: PropTypes.bool.isRequired,           // show connection from place to place
    deselectPlace: PropTypes.func.isRequired,
    selectPlace: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {

    // move the newly selected place as the center
    this.props.places.map(place => this.props.selectedPlaceId === place.id ?
        this.map.panTo({lat:place.lat,lng:place.lon}): null);
  }

    getMapRef = (mapInstance) => {
        this.map = mapInstance;
        window.map = mapInstance;
    }

    onToggle = () => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    }

    getPixelPositionOffset = (width, height) => ({
        x: -(width / 2),
        y: -(height / 2),
    })

    handleToggleMarker = (place) => {
      this.props.selectPlace(place.id);
    }

    handleMarkerClosed = () => {
      this.props.deselectPlace();
    }

    render() {

        const places = this.props.places;
        const currentPath = places.map(place =>  {
            const current = {lat:place.lat, lng:place.lon}
            return current
        });

        // Options: set restrictions
        const OPTIONS = {
            panControl: false,
            tilt: 45,
            streetViewControl: false,
        }

        return (
            <GoogleMap
                ref={this.getMapRef}
                zoom={13}
                center={places.length > 0? { lat: places[0].lat, lng: places[0].lon } : { lat: 40.782864, lng: -73.965355 }}
                options = {OPTIONS}
                //onClick={this.handleMapClick}
            >
                {/*<TrafficLayer autoUpdate />*/}
                {this.props.places.map( (place, index) => 
                  <PlaceMarker 
                    place={place} 
                    key={index} 
                    map={this.map} 
                    toggleMarker={() => this.handleToggleMarker(place)} 
                    isOpen={this.props.selectedPlaceId && this.props.selectedPlaceId === place.id}
                    onClose={this.handleMarkerClosed} />)}
                    { this.props.showRoute ? (
                        <Polyline
                            path={currentPath}
                            geodesic={true}
                            options={{
                                strokeColor:  "#02030a",
                                strokeOpacity: 1,
                                strokeWeight: 2,
                                icons: [{
                                    icon: "hello",
                                    offset: "0",
                                    repeat: "20px"
                                }],
                            }}
                        />) : null}

                {/*{props.directions && <DirectionsRenderer directions={props.directions} />}*/}

            </GoogleMap>
        );
    }
}

const NewYorkMap = withScriptjs(withGoogleMap(Map));

export default NewYorkMap;