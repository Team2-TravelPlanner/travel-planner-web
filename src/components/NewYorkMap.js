import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";

import locations from "../data/SearchResults";
import PlaceMarkers from "./PlaceMarkers";

// This is the Map class.
// Need the following components:
// From Searching: a list of locations with the name, type, position, description, URL and picture of each location
// From schedule: A list of locations with the name, type, position, description, URL and picture along with the specific
// day and order of each location.
class Map extends React.Component {

    // state = {
    //     isOpen: false,
    // }
    //
    getMapRef = (mapInstance) => {
        this.map = mapInstance;
        window.map = mapInstance;
    }

    handleMapMounted = (map) => {
        this.map = map
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();
            locations.places.map(place => {
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

    render() {
        console.log(locations.places[1])
        return (
            <GoogleMap
                ref={this.getMapRef()}
                zoom={13}
                center={{ lat: 40.78, lng: -73.935242 }}
                onLoad={this.handleMapMounted}
            >
                {locations.places.map(place => <PlaceMarkers place={place} key={place.imageUrl} map={this.map}/>)}
            </GoogleMap>
        );
    }
}

const NewYorkMap = withScriptjs(withGoogleMap(Map));

export default NewYorkMap;