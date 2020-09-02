import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Polyline,
    DirectionsRenderer,
    TrafficLayer,
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
    selectedPlace: this.props.selectedPlaceId? this.props.selectedPlaceId : null
  }

  componentDidUpdate(prevProps) {
    // if update is happening because of parent changes props
    // reset selected place
    if (prevProps !== this.props) {  
      this.setState({
        selectedPlace: this.props.selectedPlaceId
      })
    };
    // move the newly selected place as the center
    this.props.places.map(place => this.state.selectedPlace === place.id ?
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
      this.setState({
        selectedPlace: place.id
      });

    }

    render() {

        const places = this.props.places;
        const currentPath = places.map(place =>  {
            const current = {lat:place.lat, lng:place.lon}
            return current
        });

        // Options: set restrictions
        const OPTIONS = {
            minZoom: 12,
            maxZoom: 16,
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
                    isOpen={this.state.selectedPlace && this.state.selectedPlace === place.id} />)}
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