import React from "react";
import { ToggleButtonGroup, ToggleButton, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
 
import "react-datepicker/dist/react-datepicker.css";

class AutoForm extends React.Component {

  static propTypes = {
    close: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired // short or long
  }

  today = new Date();
  defaultAddress = "5th Avenue at, Central Park S, New York, NY 10022";

  state = {
    style: "moderate",
    selectedCats: [],
    address: "",
    startDate: this.today,
    endDate: new Date().setDate(this.today.getDate() + 5)
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
    const { style, selectedCats, address, startDate, endDate } = this.state;
    // validate address, start and end date

    this.props.submit({
      style: style,
      selectedCats: selectedCats,
      address: address? address : this.defaultAddress,
      startDate: startDate,
      endDate: endDate
    });
    
  }

  render() {

    const { style, selectedCats, address, startDate, endDate } = this.state;
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
                      <ToggleButton value={"relaxed"} variant="outline-primary">
                        Relaxed
                      </ToggleButton>
                      <ToggleButton value={"moderate"} variant="outline-primary">
                        Moderate
                      </ToggleButton>
                      <ToggleButton value={"packed"} variant="outline-primary">
                        Packed
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                  <br />
                  <h4>What interests you?</h4>
                  <div className="button-group">
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      active={selectedCats.includes("parks")}
                      onClick={() => this.handleClickCategory("parks")}>
                      Parks
                    </Button>{" "}
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      active={selectedCats.includes("museums")}
                      onClick={() => this.handleClickCategory("museums")}>
                      Museums
                    </Button>{" "}
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      active={selectedCats.includes("plaza")}
                      onClick={() => this.handleClickCategory("plaza")}>
                      Plaza
                    </Button>{" "}
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      active={selectedCats.includes("architecture")}
                      onClick={() => this.handleClickCategory("architecture")}>
                      Architecture
                    </Button>{" "}
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      active={selectedCats.includes("buildings")}
                      onClick={() => this.handleClickCategory("buildings")}>
                      Buildings
                    </Button>{" "}
                  </div>
                  <div className="button-group">
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      active={selectedCats.includes("food")}
                      onClick={() => this.handleClickCategory("food")}>
                      Food
                    </Button>{" "}
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      active={selectedCats.includes("nightlife")}
                      onClick={() => this.handleClickCategory("nightlife")}>
                      Night life
                    </Button>{" "}
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      active={selectedCats.includes("music")}
                      onClick={() => this.handleClickCategory("music")}>
                      Music
                    </Button>{" "}
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      active={selectedCats.includes("art")}
                      onClick={() => this.handleClickCategory("art")}>
                      Art
                    </Button>{" "}
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      active={selectedCats.includes("shopping")}
                      onClick={() => this.handleClickCategory("shopping")}>
                      Shopping
                    </Button>{" "}
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      active={selectedCats.includes("kids")}
                      onClick={() => this.handleClickCategory("kids")}>
                      Kids
                    </Button>{" "}
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
