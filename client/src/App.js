import React from 'react';
import './App.css';
import { Switch, BrowserRouter as Router, Route} from "react-router-dom";
import {Authentication} from './Pages/Authentication';
import {Dashboard} from './Components/Dashboard';
import { IdeaCreator } from './Components/IdeaCreator';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
              <Authentication/>
          </Route>
          <Route path = "/login"> 
              <Authentication/>
          </Route>
          <Route path = "/dashboard">
            {/* <Home/> */}
            <Dashboard />
            {/* <IdeaCreator/> */}
            {/* <IdeaDisplayer/> */}
          </Route>
          <Route path = "/createidea">
            <IdeaCreator/>
          </Route>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
