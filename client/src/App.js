import React from 'react';
import './App.css';
import { Switch, BrowserRouter as Router, NavLink, Route} from "react-router-dom";
import {Authentication} from './Pages/Authentication';
import {Dashboard} from './Components/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard/>
          </Route>
          <Route to="/login"> 
              <Authentication/>
          </Route>
          <Route to = "/Dashboard">
            <Dashboard/>
          </Route>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
