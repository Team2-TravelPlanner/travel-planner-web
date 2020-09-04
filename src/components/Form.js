import React from "react";
import { ToggleButtonGroup, ToggleButton, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import { GeocodeUrl, GoogleKey } from "../constants";
 
import "react-datepicker/dist/react-datepicker.css";

class AutoForm extends React.Component {

  static propTypes = {
    close: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired // short or long
  }

  defaultAddress = "5th Avenue at, Central Park S, New York, NY 10022";

  state = {
    categories: ["TOURIST_ATTRACTION", "PARK", "MUSEUM", "ZOO", "UNIVERSITY", "ART_GALLERY"],
    style: "Moderate",
    selectedCats: ["POINT_OF_INTEREST"],
    address: "",
    startDate: new Date(),
    endDate: new Date()
  }

  capitalizeWords = (str) => {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  handleStyleChange = (style) => {
    this.setState({
      style: style
    });
  }

  handleClickCategory = (cat) => {
    const { selectedCats } = this.state;
    let selected = [];
    if (selectedCats.includes(cat)) {
      selected = selectedCats.filter( c => c !== cat);
    } else {
      selected = [...selectedCats, cat];
    }
    this.setState({
      selectedCats: selected
    });
  }

  handleAddressChange = (e) => {
    this.setState({
      address: e.target.value
    })
  }

  handleChangeStartDate = (date) => {
    this.setState({
      startDate: date
    });
  }

  handleChangeEndDate = (date) => {
    this.setState({
      endDate: date
    });
  }

  handleClose = () => {
    this.props.close();
  }

  handleSubmit = () => {
    let { style, selectedCats, address, startDate, endDate } = this.state;

    // validate address, start and end date
    address = address? address : this.defaultAddress;
    address = address.split(" ").join("+");
    console.log(address);

    fetch(`${GeocodeUrl}?address=${address}&key=${GoogleKey}`)
    .then( res => {
      return res.json();
    })
    .then( data => {
      const lat = data.results[0].geometry.location.lat;
      const lon = data.results[0].geometry.location.lng;

      this.props.submit({
        style: style,
        selectedCats: selectedCats,
        lat: lat,
        lon: lon,
        startDate: startDate,
        endDate: endDate
      });
    })
    .catch( err => {
      console.log(err);
    });
  }

  render() {

    const { categories, style, selectedCats, address, startDate, endDate } = this.state;
    const { type } = this.props;

    return (
      <div className="form">
        <div className="form-group">
            {type === "long"? 
              (
                <div>
                  <h4>What's your travel style?</h4>
                  <div className="travel-style">
                    <ToggleButtonGroup type="radio" name="style" defaultValue={style} onChange={this.handleStyleChange}>
                      <ToggleButton value={"Loose"} variant="outline-primary">
                        Relaxed
                      </ToggleButton>
                      <ToggleButton value={"Moderate"} variant="outline-primary">
                        Moderate
                      </ToggleButton>
                      <ToggleButton value={"Compact"} variant="outline-primary">
                        Compact
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                  <br />
                  <h4>What interests you?</h4>
                  <div className="button-group">
                    {categories.map( category => (
                      <span key={category}>
                        <Button 
                          variant="outline-primary" 
                          className="mb-1"
                          size="sm" 
                          active={selectedCats.includes(category)}
                          onClick={() => this.handleClickCategory(category)}>
                            {this.capitalizeWords(category.toLowerCase().split("_").join(" "))}
                        </Button>{" "}
                      </span>
                    ))}
                  </div>
                  <br />
                </div>
              )
              :
              null 
          }
          <div>
            <h4>Address you are staying at?</h4>
            <span className="description">We can better plan routes for you if you have a starting point</span>
            <Form.Control 
              type="text" 
              value={address} 
              placeholder={this.defaultAddress}
              onChange={this.handleAddressChange} />
          </div>
          <br />
          <div className="date-row">
            <div className="date-item">
              <h4>First Day</h4>
              <DatePicker selected={startDate} onChange={this.handleChangeStartDate} />
            </div>
            <div className="date-item">
              <h4>Last Day</h4>
              <DatePicker selected={endDate} onChange={this.handleChangeEndDate} />
            </div>
          </div>        
        </div>
        <div className="buttons">
          <Button onClick={this.handleClose} variant="secondary">Cancel</Button>{' '}
          <Button onClick={this.handleSubmit} variane="primary">Generate itinerary</Button>
        </div>
        
      </div>
    );
  }
}

export default AutoForm;
