import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Polyline,
    DirectionsRenderer,
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

    // componentDidMount = (map) => {
    //     this.map = map;
    //     console.log("hello");
    //     const bounds = new window.google.maps.LatLngBounds();
    //     locations.places.map(place => {
    //         const { lat, lon } = place;
    //         bounds.extend({lat, lng: lon});
    //     });
    //     this.map.fitBounds(bounds);
    //     // const DirectionsService = new window.google.maps.DirectionsService()
    //     // DirectionsService.route({
    //     //     origin: new window.google.maps.LatLng(locations.places[1].lat, locations.places[1].lon),
    //     //     destination: new window.google.maps.LatLng(locations.places[2].lat, locations.places[2].lon),
    //     //     travelMode: window.google.maps.TravelMode.DRIVING,
    //     // }, (result, status) => {
    //     //     if (status === window.google.maps.DirectionsStatus.OK) {
    //     //         this.setState({
    //     //             directions: result,
    //     //         });
    //     //     } else {
    //     //         console.error(`error fetching directions ${result}`);
    //     //     }
    //     // });
    //     if (map) {
    //         console.log("in");
    //         const bounds = new window.google.maps.LatLngBounds();
    //         locations.places.map(place => {
    //             const { lat, lon } = place;
    //             bounds.extend({lat, lng: lon});
    //         });
    //         map.fitBounds(bounds);
    //         // const DirectionsService = new window.google.maps.DirectionsService()
    //         // DirectionsService.route({
    //         //     origin: new window.google.maps.LatLng(locations.places[1].lat, locations.places[1].lon),
    //         //     destination: new window.google.maps.LatLng(locations.places[2].lat, locations.places[2].lon),
    //         //     travelMode: window.google.maps.TravelMode.DRIVING,
    //         // }, (result, status) => {
    //         //     if (status === window.google.maps.DirectionsStatus.OK) {
    //         //         this.setState({
    //         //             directions: result,
    //         //         });
    //         //     } else {
    //         //         console.error(`error fetching directions ${result}`);
    //         //     }
    //         // });
    //
    //     }
    // }

    onToggle = () => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    }

    getPixelPositionOffset = (width, height) => ({
        x: -(width / 2),
        y: -(height / 2),
    })

    render() {
        console.log(locations.places);
        const currentPath = locations.places.map(place =>  {
            const current = {lat:place.lat, lng:place.lon}
            return current})

        console.log(currentPath);
        return (
            <GoogleMap
                // ref={this.getMapRef()}
                zoom={16}
                center={{ lat:locations.places[2].lat, lng:locations.places[2].lon }}
            >
                {locations.places.map(place => <PlaceMarkers place={place} key={place.imageUrl} map={this.map}/>)}
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