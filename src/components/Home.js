import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { backgrounds } from "../Backgrounds";


class Home extends React.Component {

  constructor() {
    super();
    const random = Math.floor(Math.random() * backgrounds.length);
    const background = backgrounds[random];
    this.state = {
      background: background
    };
  }

  render() {

    const { background } = this.state;

    var backgroundStyle = {
      backgroundImage: `url(${background.path})`
    };

    return (
      <div className="home">

        {/* for background image with opacity */}
        <div className="background" style={backgroundStyle}>
        </div>

        {/* Navigations */}
        <div className="nav-box-container">
          <div className="nav-box">
            <div className="nav-background"></div>
            <ul className="nav-desc">
              <li> I want semi-automated trip planning</li>
              <li> I want to explore the New York's attractions</li>
              <li> I want to pick the places I want to visit</li>
            </ul>
            <Link to="/explorer">
              <Button variant="dark" size="lg" className="nav-button">
                <span>Start Self Planning</span>
              </Button>
            </Link>
          </div>
          <div className="nav-box">
            <div className="nav-background"></div>
            <ul className="nav-desc">
              <li> I want fully automated trip planning</li>
              <li> I want Travel Planner to pick customized attractions for me</li>
            </ul>
            <Button variant="dark" size="lg" className="nav-button" onClick={this.props.openForm}>
              <span>Start Auto Planning</span>
            </Button>
          </div>
        </div>

        {/* background image credit */}
        <span className="background-credit">
          Photo by{" "}
          <a href={background.link}
            target="_blank"
            rel="noopener noreferrer">
            {background.author}
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/new-york?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
            target="_blank"
            rel="noopener noreferrer">
            Unsplash
          </a>
        </span>
      </div>
    );
  }
}

export default Home;
