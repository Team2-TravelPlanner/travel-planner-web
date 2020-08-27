Travel Planner is a smart planner for the city of New York.

# Setup
1. After cloning, go to your project directory and run `npm install` to download project dependencies.
2. To run the app in the development mode, use `npm start`. Open http://localhost:3000 to view it in the browser.

# Component Structure [WIP]
```
<App>
  <Login>              --> a modal for login or register form
  <SavedTrips>         --> a modal for listing saved trips
  <Header>             --> with links to open login, logout, view saved trips
  <Main>               --> switches between sub components
    <Home>             --> Navigation to SelftPlanner or AutoPlanner
    <SelfPlanner>      --> map to search, browse, select POIs
    <AutoPlanner>      --> interactive form of questions
    <Trip>             --> map and schedule of generated trip or existing trip
  <Footer>
```

# React Bootstrap
We use [React-Bootstrap](https://react-bootstrap.github.io/) library for our UI components. Go see its documentation on specific component you are adding.
