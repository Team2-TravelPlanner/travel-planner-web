NY Travel Planner is a smart planner for the city of New York.

# Setup
1. After cloning, go to your project directory and run `npm install` to download project dependencies.
2. To run the app in the development mode, use `npm start`. Open http://localhost:3000 to view it in the browser.

# Component Structure [WIP]
```
<App>
  <Login>              --> a modal for login or register form (shown as modal)
  <SavedTrips>         --> a modal for listing saved trips (shown as modal)
  <Header>             --> with links to open login, logout, view saved trips
  <Main>               --> switches between sub components
    <Home>             --> Navigation to SelftPlanner or AutoPlanner
    <Explorer>         --> map to search, browse, select POIs
        <Map>          --> Google map showing markers of places
    <Form>             --> interactive form of questions (shown as modal)
    <Trip>             --> map and schedule of generated trip or existing trip
        <Map>
  <Footer>
```

# UI Library
We use [React-Bootstrap](https://react-bootstrap.github.io/) library for our UI components.

# Google API
These Google APIs need to be enabled.
* Places API
* Geocoding API
* Maps Javascript API
