Travel Planner is a smart planner for the city of New York.

# Setup
1. After cloning, go to your project directory and run `npm install` to download project dependencies.
2. To run the app in the development mode, use `npm start`. Open http://localhost:3000 to view it in the browser.

# Component Structure [WIP]
```
<App>
  <Header>             --> handles login, logout, open saved plans
  <Main>               --> switches between sub components
    <CityExplorer>     --> search, browse, select POIs
    <AutoPlanner>      --> form
    <Plan>             --> generated plan or existing plan
  <Footer>
```
