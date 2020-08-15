import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class Home extends React.Component {

  render() {
    return (
      <div className="home">

        {/* for background image with opacity */}
        <div className="background">
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
            <Link to="/form">
              <Button variant="dark" size="lg" className="nav-button">
                <span>Start Auto Planning</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* background image credit */}
        <span className="background-credit">
          Photo by{" "}
          <a href="https://unsplash.com/@andersjilden?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
            target="_blank"
            rel="noopener noreferrer">
            Anders Jildén
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
