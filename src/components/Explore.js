import React, {Component} from 'react';
import {Card, ListGroup, FormControl, Form, Button} from 'react-bootstrap'
import searchResults from "../data/SearchResults.js"
class Explore extends Component {
      constructor(props) {
          super(props);
          this.state = {
              keyword: '',
              result: [],
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
      onSearch = () => {
          let results = [];

          searchResults["places"].map(place => {
              // check whether the place is in the category
              let inCategory = false;
              this.state.activeCategory.map(category =>{
                  if (place["category"].toLowerCase().includes(category.toLowerCase())){
                         inCategory = true;
                      }
                   return 0 // add this line for the purpose of removing the warning
              }

              )

              if(inCategory===true && this.state.keyword === ""){
                  results.push(place["name"])
              }

              else if (this.state.keyword !== '' && place["name"].toLowerCase().includes(this.state.keyword.toLowerCase()) && inCategory === true) {
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
               list.push( <ListGroup.Item key={i} action className = "search-item-select" >
                          {this.state.result[i]}
                           </ListGroup.Item>)
          }
          return list
      }

      selectCategory = (event) =>{
          if(this.state[event.target.value] === "outline-primary") {
              this.setState(
                  {
                      [event.target.value]: "primary",
                      activeCategory: [...this.state.activeCategory, event.target.value]
                  },
                  () => console.log(this.state.activeCategory)
              )

          }
             else{
                  this.setState(
                  {
                      [event.target.value]: "outline-primary",
                      activeCategory: this.state.activeCategory.filter(function (category){
                          return category !== event.target.value
                      })
                  },
                  () => console.log(this.state.activeCategory)
              )
              }
          }


    render(){
        return (
            <div>
            <div className="left-side">
                <div className="buttons">
                    <Button variant={this.state.Park}  size = "sm" value = "Park" onClick = {this.selectCategory} >Park </Button>{" "}
                    <Button variant={this.state.Museum}  size = "sm" value = "Museum" onClick = {this.selectCategory} >Museum </Button>{" "}
                    <Button variant={this.state.Plaza}  size = "sm" value = "Plaza" onClick = {this.selectCategory} >Plaza </Button>{" "}
                </div>
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
