import React, {Component} from 'react';
import Search from "./Search";
import Map from "./Map";

class SelfPlanner extends Component {
    render() {
        return (
            <div className="self-planner">
                <div className="left-side">
                    <Search />
                </div>
                <div className="right-side">
                    <Map />
                </div>
            </div>
        );
    }
}

export default SelfPlanner;