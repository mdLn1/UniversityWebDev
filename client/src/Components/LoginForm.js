import React from 'react';
import styles from './LoginForm.module.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export class LoginForm extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        text: 'Login'
      }
  }

  onClick(e){
  }

  render(){
      return(
        <div className = {styles.page}>
          <div className = {styles.divcontainer}>
              <img src = "https://domw.gov.in/assets/frontend/img/team/user-login.png" alt={"Person and Locker"}/>
              <h1>Login Details</h1>
              <TextField 
                id="username-input" 
                label="Username" 
                variant="filled" 
              />
              <br/>
              <br/>
              <TextField
                id="password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant ="filled"
              />  
              <br/>
              <br/>
              <label className = {styles.label}>New to us ?<a href=""> Join now </a> </label>
              <br></br>
              <br></br>
              <Button variant="outlined" size="large" color='primary' className={styles.button} onClick={this.onClick}>
                  Login
              </Button>
          </div>
        </div>
      );

  }
}
