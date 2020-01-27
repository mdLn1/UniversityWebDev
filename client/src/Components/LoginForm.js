import React from 'react';
import styles from './LoginForm.module.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
import RegisterForm from "./RegisterForm";


export class LoginForm extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: ""
      }
      this.onClick = this.onClick.bind(this);
      this.handleUserNameChange = this.handleUserNameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  onClick(e){
    console.log(this.state.username)
    console.log(this.state.password)
  }

  handleUserNameChange = event => {
    this.setState({username: event.target.value});
  }

  handlePasswordChange = event => {
    this.setState({password: event.target.value});
  }

  handleSubmit = async (e) => { 
     const config = {
        headers: {
            "Content-Type": "application/json"
        }
      }
      const obj = {name: this.state.username, password: this.state.password};
      const res = await Axios.post("/api/auth/login/", obj, config);
      console.log(res.data);

  }

  render(){
      return(
        <div className = {styles.page}>
          <Router exact path = "/LoginForm">
            <div className = {styles.divcontainer}>
                <img src = "https://domw.gov.in/assets/frontend/img/team/user-login.png" alt={"Person and Locker"}/>
                <h1>Login Details</h1>
                <TextField 
                  id="username" 
                  label="Username" 
                  variant="filled" 
                  onChange = {this.handleUserNameChange}
                />
                <br/>
                <br/>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant ="filled"
                  onChange = {this.handlePasswordChange}
                />  
                <br/>
                <br/>
                <label className = {styles.label}>New to us ?<a href="/RegisterForm"> Join now</a> </label>
                <br></br>
                <br></br>
                <Button variant="outlined" size="large" color='primary' className={styles.button} onClick={this.handleSubmit}>
                    Login
                </Button>
                <Route path="/RegisterForm" component={RegisterForm}/>
                
            </div>
          </Router>
        </div>
      );

  }
}
