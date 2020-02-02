import React from "react";
import styles from "./LoginForm.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

import { NavLink } from "react-router-dom";

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      role: "",
      department: ""
    };
    this.changeForm = this.props.changeForm;
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.roleChangeHandler = this.roleChangeHandler.bind(this);
    this.departmentChangeHandler = this.departmentChangeHandler.bind(this);
  }

  nameChangeHandler = e => {
    this.setState({ name: e.target.value });
  };

  emailChangeHandler = e => {
    this.setState({ email: e.target.value });
  };

  passwordChangeHandler = e => {
    this.setState({ password: e.target.value });
  };

  repeatPasswordChangeHandler = e => {
    this.setState({ repeatPassword: e.target.value });
  };

  departmentChangeHandler = e => {
    this.setState({ department: e.target.value });
  };

  roleChangeHandler = e => {
    this.setState({ role: e.target.value });
  };

  onClick = async e => {
    try {
      let {
        name: name,
        email,
        password,
        repeatPassword,
        department,
        role
      } = this.state;

      // Basic validation - please user better checks
      if (password !== repeatPassword) {
        return console.log("password do not match");
      } else {
        let obj = { name, password, email, role, department };
        let config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        console.log(obj);
        let result = await axios.post("/api/auth/register/", obj, config);
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let {
      name: name,
      email,
      password,
      repeatPassword,
      department,
      role
    } = this.state;

    return (
      <div className={styles.page}>
        <div className={styles.registerDivContainer}>
          <img
            src="https://www.nicepng.com/png/full/335-3355144_seller-registration-icon-class-register-icon-png.png"
            alt={"Person and Locker"}
          />
          <h1>Register</h1>
          <TextField
            id="name-input"
            label="Name"
            variant="filled"
            value={name}
            onChange={this.nameChangeHandler}
          />
          <br />
          <br />
          <TextField
            id="email-input"
            label="Email"
            type="email"
            value={email}
            onChange={this.emailChangeHandler}
            variant="filled"
          />
          <br />
          <br />
          <TextField
            id="password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={this.passwordChangeHandler}
            variant="filled"
          />
          <br />
          <br />
          <TextField
            id="repeat-password-input"
            label="Re-type your password"
            type="password"
            autoComplete="current-password"
            onChange={this.repeatPasswordChangeHandler}
            value={repeatPassword}
            variant="filled"
          />
          <br />
          <br />
          <TextField
            id="role-input"
            label="Role"
            type="text"
            value={role}
            onChange={this.roleChangeHandler}
            variant="filled"
          />
          <br />
          <br />
          <TextField
            id="department-input"
            label="Department"
            type="text"
            value={department}
            onChange={this.departmentChangeHandler}
            variant="filled"
          />
          <br />
          <br />
          <label className={styles.termslabel}>
            By signing up, you confirm that you've{" "}
          </label>
          <br></br>
          <label className={styles.termslabel}>
            {" "}
            read and accepted our <a>Terms and Conditions</a>.
          </label>
          <br></br>
          <br></br>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            className={styles.button}
            onClick={this.onClick}
          >
            Register
          </Button>
          <a
            onClick={e => {
              e.preventDefault();
              this.changeForm(true);
            }}
          >
            Login now
          </a>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
