import React, {Component} from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';


class Search extends Component {
    render() {
        return (
            <div>
                <InputGroup className="search-bar">
                    <FormControl
                        placeholder="Search interested places by keywords"
                        aria-label="Search interested places by keywords"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
}

export default Search;