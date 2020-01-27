import React from 'react';
import styles from './LoginForm.module.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

export class RegisterForm extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        email: "",
        text: 'Login'
      }
  }

  onClick = async (e) => {
      try {
        let obj = {name: 'mdln', password: 'password'};
        let config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        let result = await axios.post("http://localhost:5000/api/auth/register/", obj, config);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
  }
  
  onChangeEmail(e){

  }
  

  render(){
    let {email} = this.state;
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
                value={email}
                onChange = {this.onChangeEmail}
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

export default RegisterForm;

