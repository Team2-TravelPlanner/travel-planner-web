import Map from "./NewYorkMap"
import React from "react";
import locations from "../data/SearchResults"

class Main extends React.Component {

    render() {
        return (
            <Map
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%`}} />}
                containerElement={<div style={{ height: `600px` }} />}
                mapElement={<div style={{ height: `100%`}} />}
            />
    )
  }
}

export default Main;