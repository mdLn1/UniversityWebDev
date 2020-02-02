import React from 'react';
import './App.css';
import { Switch, BrowserRouter as Router, NavLink, Route} from "react-router-dom";
import {Authentication} from './Pages/Authentication';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavLink to="/login">Authentication</NavLink>
          <NavLink to="/">Home</NavLink>
          
        </div>
        <Switch>
          <Route exact path="/">
            <div>Home</div>
          </Route>
          <Route to="/login"> 
              <Authentication/>
          </Route>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
