import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Polyline,
    DirectionsRenderer,
} from "react-google-maps";
import PlaceMarker from "./PlaceMarkers";
import PropTypes from "prop-types";
import locations from "../data/SearchResults";

// This is the Map class.
// Need the following components:
// From Searching: a list of locations with the name, type, position, description, URL and picture of each location
// From schedule: A list of locations with the name, type, position, description, URL and picture along with the specific
// day and order of each location.
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
    // if update is happening because of parent changes props
    // reset selected place
    if (prevProps !== this.props) {  
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

        const places = this.props.places;
        const currentPath = places.map(place =>  {
            const current = {lat:place.lat, lng:place.lon}
            return current
        });

        return (
            <GoogleMap
                // ref={this.getMapRef()}
                zoom={13}
                center={{ lat: 40.78, lng: -73.935242 }}
                onClick={this.handleMapClick}
            >
                {places.map( (place, index) => 
                    <PlaceMarker 
                      place={place} 
                      key={index} 
                      map={this.map}
                      toggleMarker={() => this.handleToggleMarker(place)} 
                      isOpen={this.state.selectedPlace && this.state.selectedPlace === place.id} />)}
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
                    />

                {/*{props.directions && <DirectionsRenderer directions={props.directions} />}*/}

            </GoogleMap>
        );
    }
}

const NewYorkMap = withScriptjs(withGoogleMap(Map));

export default NewYorkMap;