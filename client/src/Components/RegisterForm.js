import React from 'react';
import styles from './LoginForm.module.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export class RegisterForm extends React.Component{

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
          <div className = {styles.registerDivContainer}>
              <img src = "https://www.nicepng.com/png/full/335-3355144_seller-registration-icon-class-register-icon-png.png" alt={"Person and Locker"}/>
              <h1>Register</h1>
              <TextField 
                id="username-input" 
                label="Username" 
                variant="filled" 
              />
              <br/>
              <br/>
              <TextField
                id="email-input"
                label="Email"
                type="email"
                variant ="filled"
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
              <TextField
                id="password-input"
                label="Re-type your password"
                type="password"
                autoComplete="current-password"
                variant ="filled"
              />  
              <br/>
              <br/>
              <Button variant="outlined" size="large" color='primary' className={styles.button} onClick={this.onClick}>
                  Register
              </Button>
          </div>
        </div>
      );

  }
}
