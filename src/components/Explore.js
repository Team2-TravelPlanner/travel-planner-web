import React, {Component} from 'react';
import {Card, ListGroup, Form, Button, Modal} from 'react-bootstrap'
import NewYorkMap from "./NewYorkMap";
import plus from "../assets/images/plus.svg";
import checked from "../assets/images/checked.svg";
import del from "../assets/images/delete.svg";
import searchResults from "../data/SearchResults.js";
import { URL } from "../constants";
import { GoogleKey } from "./Constants";
import SelfPlanForm from "./Form";


class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            result: [],
            selected: [],
            activeCategory: null,
            placeToView: null,
            showForm: false,
            isLoading: false,
            categories: ["TOURIST_ATTRACTION", "PARK", "MUSEUM", "ZOO", "UNIVERSITY", "ART_GALLERY", "POINT_OF_INTEREST"]
        }
    }

    componentDidMount() {
      this.searchAllPlaces();
    }

    capitalizeWords = (str) => {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    searchAllPlaces = () => {
      fetch(`${URL}/search/getAllPlace`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPageNumber: 1,
          displayItemLimit: 40
        })
      }).then( res => {
        return res.json();
      }).then( data => {
        this.setState({
          result:  data.placeInfoModels? data.placeInfoModels : []
        });
      }).catch ( err => {
        console.log(err);
      });
    }

    searchByCategory = (cat) => {
      fetch(`${URL}/search/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPageNumber: 1,
          displayItemLimit: 40,
          category: cat // need to be able to use a list
        })
      }).then( res => {
        return res.json();
      }).then( data => {
        console.log(data);
        this.setState({
          result:  data.placeInfoModels? data.placeInfoModels : []
        });

        
      }).catch ( err => {
        console.log(err);
      });
    }

    searchByKeyword = (keyword) => {
      fetch(`${URL}/search/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPageNumber: 1,
          displayItemLimit: 40,
          keyword: keyword
        })
      }).then( res => {
        return res.json();
      }).then( data => {
        console.log(data);
        this.setState({
          result:  data.placeInfoModels? data.placeInfoModels : []
        });
      }).catch ( err => {
        console.log(err);
      });
    }

    onChangeKeyword = (event) => {
        this.setState({
                keyword: event.target.value
            },
            () => console.log(this.state.keyword))

    }

    // 1. if a category is selected and search box is empty, show all the places in that category.
    // 2. if a category is selected and search box is not empty, show all the places that matches the search keyword in that category.
    // 3. if no category is selected and search box is empty, show everything.
    // 4. if no category is selected and search box not empty, show everything based on the keyword in all the categories.
    // 5. Result is dynamically changed based on category selections.

    findResult = () => {
        let results = [];
        const { activeCategory, keyword } = this.state;
        searchResults["places"].map(place => {
            // check whether the place is in the category
            let matchCategory = activeCategory.some(category =>
                place["category"].toLowerCase().includes(category.toLowerCase())
            );
            // check whether the name of place matches the user's input keyword
            let matchKeyword = place["name"].toLowerCase().includes(keyword.toLowerCase());

            // console.log(matchCategory)
            if((activeCategory.length === 0 || matchCategory) &&
                (keyword === '' || matchKeyword)) {
                results.push(place);
            }
        })
        return results;
    }

    onSearch = () => {
      this.setState({
        activeCategory: null
      })
      if (this.state.keyword)
        this.searchByKeyword(this.state.keyword);
      else
        this.searchAllPlaces();
    }

    showResult = () => {
        let list = [];
        let i;
        const {result, selected} = this.state;
        for (i = 0; i < result.length; i++) {
            let cur_place = result[i];
            let cur_id = cur_place.id;
            list.push(<ListGroup.Item
                    key={i}
                    className="search-item-select"
                    action
                    onClick={() => this.viewPlaceDetail(cur_id)}>
                {cur_place.name}
                {
                    selected.some(entry => entry.id === cur_id)
                        ?
                        <img
                            className="add-btn"
                            src={checked}
                            alt="book"
                            title="Bootstrap"/>
                        :
                        <img
                            className="add-btn"
                            src={plus}
                            alt="book"
                            title="Bootstrap"
                            data-place={cur_id}
                            onClick={this.onSelect} />
                }
            </ListGroup.Item>)
        }
        return list
    }

    showSelected = () => {
        let list = [];
        let i;
        const {selected} = this.state;
        for (i = 0; i < selected.length; i++) {
            let cur_place = selected[i];
            let cur_id = cur_place.id;
            list.push(<ListGroup.Item
                                    key={i}
                                    className="search-item-select"
                                    action
                                    onClick={() => this.viewPlaceDetail(cur_id)}>
                {cur_place.name}
                <img className="add-btn"
                     src={del}
                     alt="book"
                     title="Bootstrap"
                     data-place={cur_id}
                     onClick={this.onDeselect}
                />
            </ListGroup.Item>)
        }
        return list
    }

    viewPlaceDetail = (placeId) => {
        console.log(placeId);
        this.setState({
           placeToView: placeId,
        })
    }

    onSelect = (e) => {
        const {selected, result} = this.state;
        const selectedItemId = e.target.dataset.place;
        const selectedItem = result.filter(place => place.id === selectedItemId)[0];
        const addBefore = selected.some(entry => entry.id === selectedItemId);
        this.setState({
            selected: addBefore ? selected : [...selected, selectedItem],
        })
    }


    onDeselect = (e) => {
        const {selected} = this.state;
        const deselectedItemId = e.target.dataset.place;
        this.setState({
            selected: selected.filter(selected => selected.id !== deselectedItemId),
        })
    }

    handleClickedCategory = (cat) => {

      // changed category
      if (this.state.activeCategory !== cat) {
        this.setState({
          activeCategory: cat
        });
        this.searchByCategory(cat);
      } else {
        this.setState({
          activeCategory: null
        });
        this.searchAllPlaces();
      }

    }

    handleKeyPress = (target) => {
        if(target.key === "Enter"){
          target.preventDefault()
          this.onSearch();
        }
    }

    openForm = () => {
        this.setState({
            showForm: true
        });
    }

    closeForm = () => {
        this.setState({
            showForm: false
        });
    }

    generateItinerary = (options) => {
      const url = `${URL}/plan/customized`;
      const { style,
        lat,
        lon,
        startDate,
        endDate
      } = options;

      let placeIds = this.state.selected.map( place => place.id);
      console.log(placeIds);
  
      this.setState({
        isLoading: true
      });
  
      fetch(url, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          placeIds: placeIds,
          settings: {
            endDate: endDate.toJSON(),
            lat: lat,
            lon: lon,
            startDate: startDate.toJSON(),
            travelStyle: style
          }
        })
      })
      .then(response => response.json())
      .then(plan => {
        console.log(plan);
        this.setState({
          isLoading: false
        });
  
        this.props.openTripByPlan(plan);
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
        console.log('error', error);
      });
  
      this.setState({
        showForm: false
      });
  
    }

    render() {
        const { result, showForm, categories, activeCategory } = this.state;


        const places = result.map( item => {
          return {
            id: item.id,
            name: item.name,
            address: item.address,
            lat: item.lat,
            lon: item.lon,
            categories: item.categories,
            info: "",
            imageUrl: `${item.imageLink}${GoogleKey}`,
            website: item.website
          }
        });

        return (
            <div className="explorer">
                <div className="left-side">
                    <div className="button-group">
                    {categories.map( category => (
                      <span key={category}>
                        <Button 
                          variant="outline-primary" 
                          className="mb-1"
                          size="sm" 
                          active={activeCategory === category}
                          onClick={() => this.handleClickedCategory(category)}>
                            {this.capitalizeWords(category.toLowerCase().split("_").join(" "))}
                        </Button>{" "}
                      </span>
                    ))}
                    </div>

                    <div className="search-items">
                        <Form className="search-bar">
                            <Form.Control type="text" placeholder="Search" className='mr-sm-2' style={{width: '30em'}}
                                         onChange={this.onChangeKeyword} onKeyPress = {this.handleKeyPress}/>
                            <Button variant="primary" onClick={this.onSearch} >Search</Button>
                        </Form>
                        <br/>
                        <Card style={{width: '30em'}}>
                            <ListGroup className="search-result">
                                {this.showResult()}
                            </ListGroup>
                        </Card>
                    </div>

                    <div className="selected-items">
                        <Card style={{width: '30em'}}>
                            <ListGroup className="select-result">
                                {this.showSelected()}
                            </ListGroup>
                        </Card>
                    </div>

                    <div className="generate-btn">
                        <Button onClick={this.openForm}>
                            Generate Your Plan
                        </Button>
                    </div>
                </div>

                <div className="right-side">
                    <NewYorkMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        places={places}
                        selectedPlaceId={this.state.placeToView}
                    />
                </div>

                <Modal
                    show={showForm}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Body>
                      <SelfPlanForm
                            close={this.closeForm}
                            submit={this.generateItinerary}
                            type="short"
                            />

                    </Modal.Body>
                </Modal>

            </div>
        );
    }
}

export default Explore;
