import React, {Component} from 'react';
import {Card, ListGroup, FormControl, Form, Button} from 'react-bootstrap'
import searchResults from "../data/SearchResults.js"
class Explore extends Component {
      constructor(props) {
          super(props);
          this.state = {
              keyword: '',
              result: [],
          }
      }

      onChangeKeyword = (event) => {
          this.setState({
              keyword: event.target.value
          },
          () => console.log(this.state.keyword))

      }

      onSearch = () => {
          let results = [];
          searchResults["places"].map(place => {
              if (this.state.keyword !== '' && place["name"].toLowerCase().includes(this.state.keyword.toLowerCase())) {
                  results.push(place["name"])
              }
              return results
          })
          this.setState(
              {
               result: results
              },
              () => console.log(this.state.result)
          )
      }

      showResult = () =>{
          let list = [];
          let i;
          for(i = 0; i < this.state.result.length; i++){
               list.push( <ListGroup.Item key={i} action >
                          {this.state.result[i]}
                           </ListGroup.Item>)
          }
          return list
      }

    render(){
        //console.log(searchResults['places'][0]['name'])
        return (
            <div>
            <div className="left-side">
                <div className= "search">
                <Form inline>
                    <FormControl type="text" placeholder="Search" className='mr-sm-2' style={{ width: '30em' }} onChange={this.onChangeKeyword}/>
                    <Button variant="primary" onClick = {this.onSearch}>Search</Button>
                </Form>
                <br/>
                <Card style={{ width: '30em' }}>
                <ListGroup className="search-result">
                {this.showResult()}
                </ListGroup>
                </Card>
                </div>
            </div>

            <div className="right-side" >
                 Map
            </div>
            </div>
        );
    }
}

export default Explore;
