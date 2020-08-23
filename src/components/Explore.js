import React, {Component} from 'react';
import {Card, ListGroup, FormControl, Form, Button} from 'react-bootstrap'
import plus from "../images/plus.svg"
import del from "../images/delete.svg"
import searchResults from "../data/SearchResults.js"

class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            result: [],
            selected: [],
            activeCategory: [],
            Park: "outline-primary",
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
        let results = [];
        searchResults["places"].map(place => {
            // check whether the place is in the category
            let inCategory = false;
            this.state.activeCategory.map(category => {
                    if (place["category"].toLowerCase().includes(category.toLowerCase())) {
                        inCategory = true;
                    }
                    return 0 // add this line for the purpose of removing the warning
                }
            )

            console.log(inCategory)
            if(inCategory === true) {
                if (this.state.keyword === '') {
                    results.push(place)
                } else if (this.state.keyword !== '' && place["name"].toLowerCase().includes(this.state.keyword.toLowerCase())) {
                    results.push(place)
                } else if (this.state.keyword === '') {
                    results.push(place)
                }
                // no category is selected
            }else if(this.state.activeCategory.length === 0){
                if (this.state.keyword === '') {
                    results.push(place)
                } else if (place["name"].toLowerCase().includes(this.state.keyword.toLowerCase())) {
                    results.push(place)
                }
            }
            return results
        })
        return results;
    }

    onSearch = () => {
        let results = this.findResult();
        this.setState(
            {
                result: results
            },
            () => console.log(this.state.result)
        )
    }

    showResult = () => {
        let list = [];
        let i;
        const {result} = this.state;
        for (i = 0; i < result.length; i++) {
            let cur_place = result[i];
            console.log(cur_place);
            list.push(<ListGroup.Item key={i} action className="search-item-select">
                {cur_place["name"]}
                <img className="add-btn"
                     src={plus}
                     alt="book"
                     width="32"
                     height="32"
                     title="Bootstrap"
                     data-place={cur_place.id}
                     onClick={this.onSelect}
                />
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
            list.push(<ListGroup.Item key={i} action className="search-item-select">
                {cur_place["name"]}
                <img className="add-btn"
                     src={del}
                     alt="book"
                     width="32"
                     height="32"
                     title="Bootstrap"
                     data-place={cur_place.id}
                     onClick={this.onDeselect}
                />
            </ListGroup.Item>)
        }
        return list
    }

    onSelect = (e) => {
        let selectedItem = this.state.result.filter(place => place.id === e.target.dataset.place)[0];
        const {selected, result} = this.state;
        this.setState({
            selected: [...selected, selectedItem],
            result: result.filter(unselect =>
                (unselect.id !== selectedItem.id)
            ),
        })
    }


    onDeselect = (e) => {
        let deselectedItem = this.state.selected.filter(place => place.id === e.target.dataset.place)[0];
        const {selected, result} = this.state;
        this.setState({
            selected: selected.filter(selected => selected.id !== deselectedItem.id),
            result: [...result, deselectedItem],
        },
        () => {
                console.log(selected);
                console.log(result);
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


    render() {
        return (
            <div>
                <div className="left-side">
                    <div className="buttons">
                        <Button variant={this.state.Park} size="sm" value="Park"
                                onClick={this.selectCategory}>Park </Button>{" "}
                        <Button variant={this.state.Museum} size="sm" value="Museum"
                                onClick={this.selectCategory}>Museum </Button>{" "}
                        <Button variant={this.state.Plaza} size="sm" value="Plaza"
                                onClick={this.selectCategory}>Plaza </Button>{" "}
                    </div>

                    <div className="search">
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className='mr-sm-2' style={{width: '30em'}}
                                         onChange={this.onChangeKeyword}/>
                            <Button variant="primary" onClick={this.onSearch}>Search</Button>
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
                </div>

                <div className="right-side">
                    Map
                </div>
            </div>
        );
    }
}

export default Explore;
