import React, {Component} from 'react';
import {Card, ListGroup, FormControl, Form, Button, Modal} from 'react-bootstrap'
import NewYorkMap from "./NewYorkMap";
import plus from "../assets/images/plus.svg"
import checked from "../assets/images/checked.svg"
import del from "../assets/images/delete.svg"
import Axios from "axios";
import {URL} from "../constants";


class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            result: [],
            selected: [],
            activeCategory: [],
            placeToView: null,
            showForm: false,
            Trans: "outline-primary",
            Museum: "outline-primary",
            Plaza: "outline-primary",
        }
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
        // let results = [];
        // const { activeCategory, keyword } = this.state;
        // searchResults["places"].map(place => {
        //     // check whether the place is in the category
        //     let matchCategory = activeCategory.some(category =>
        //         place["category"].toLowerCase().includes(category.toLowerCase())
        //     );
        //     // check whether the name of place matches the user's input keyword
        //     let matchKeyword = place["name"].toLowerCase().includes(keyword.toLowerCase());
        //
        //     // console.log(matchCategory)
        //     if((activeCategory.length === 0 || matchCategory) &&
        //         (keyword === '' || matchKeyword)) {
        //         results.push(place);
        //     }
        // })
        }

    onSearch = () => {
        const url = `${URL}/search/query`
        Axios({
            method: 'POST',
            url: url,
            data: {
                keyword: this.state.keyword,
                category: this.state.activeCategory.toString()
            }
        })
            .then(
                response => {
                    this.setState({
                        result: response.data["placeInfoModels"]
                    })
                }
            )
          //  () => console.log(this.state.result[0]["name"])
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

    selectCategory = (event) => {
        if (this.state[event.target.value] === "outline-primary") {
            this.setState(
                {
                    [event.target.value]: "primary",
                    activeCategory: [...this.state.activeCategory, event.target.value]
                },
                //() => console.log(this.state.activeCategory),
                this.onSearch

            )
        } else {
            this.setState(
                {
                    [event.target.value]: "outline-primary",
                    activeCategory: this.state.activeCategory.filter(function (category) {
                        return category !== event.target.value
                    })
                },
                //() => console.log(this.state.activeCategory),
                this.onSearch
            )


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
        this.setState({
            showForm: false
        });

        console.log(options);
        // send data to backend
    }

    render() {
        const { result, selected, showForm } = this.state;
        return (
            <div className="explorer">
                <div className="left-side">
                    <div className="buttons">
                        <Button variant={this.state.Park} size="sm" value="Park"
                                onClick={this.selectCategory}>Park </Button>{" "}
                        <Button variant={this.state.Museum} size="sm" value="Museum"
                                onClick={this.selectCategory}>Museum </Button>{" "}
                        <Button variant={this.state.Plaza} size="sm" value="Plaza"
                                onClick={this.selectCategory}>Plaza </Button>{" "}
                    </div>

                    <div className="search-items">
                        <Form className="search-bar">
                            <FormControl type="text" placeholder="Search" className='mr-sm-2' style={{width: '30em'}}
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
                        containerElement={<div style={{ height: `760px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        places={result}
                        selectedPlaceId={this.state.placeToView}
                    />
                </div>

                <Modal
                    show={showForm}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Body>
                        <Form close={this.closeForm} submit={this.generateItinerary} type="long"/>
                    </Modal.Body>
                </Modal>

            </div>
        );
    }
}

export default Explore;
