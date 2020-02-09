import React from 'react';
import './App.css';
import { Switch, BrowserRouter as Router, NavLink, Route} from "react-router-dom";
import {Authentication} from './Pages/Authentication';
import {Dashboard} from './Components/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
        </div>
        <Switch>
          <Route exact path="/">
            <div>Home</div>
          </Route>
          <Route path = "/login"> 
              <Authentication/>
          </Route>
          <Route path = "/dashboard">
              <Dashboard/>
          </Route>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
