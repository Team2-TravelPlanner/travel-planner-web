import React, {Component} from 'react';
import { InputGroup, Button, FormControl, ListGroup } from 'react-bootstrap';

import searchResults from "../data/SearchResults";


class Search extends Component {

    render() {
        const places = searchResults.places;
        return (
            <div>
                {/*keyword search*/}
                <InputGroup className="search-bar">
                    <FormControl
                        placeholder="Search interested places by keywords"
                        aria-label="Search interested places by keywords"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" className="search-button">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search"
                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                                <path fill-rule="evenodd"
                                      d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                            </svg>
                        </Button>
                    </InputGroup.Append>
                </InputGroup>

                <ListGroup className="browse-list">

                </ListGroup>

                <div className="browse-item">
                    <img src={places[0].imageUrl} className="place-image" />
                    <div className="place-meta">
                        <div className="place-name">
                            <h3> {places[0].name} </h3>
                            <Button className="add-btn" variant="outline-light" onChange={this.onChange}>
                                <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-plus-circle"
                                     fill="#0F0" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                                    <path fill-rule="evenodd"
                                          d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                                    <path fill-rule="evenodd"
                                          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                </svg>
                            </Button>
                        </div>
                        <h className="place-info"> {places[0].info} </h>
                    </div>
                </div>

            </div>
        );
    }

    onChange = () => {
        console.log('items added');
    }
}

export default Search;