import React from "react";
import styles from "./LoginForm.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { Redirect } from "react-router-dom";

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      role: "",
      department: "",
      roles: [],
      departments: [],
      loggedIn: false,
      errorName: false,
      errorEmail: false,
      errorPassword: false,
      errorRepeatPassword: false,
      errorRole: false,
      errorDepartment: false
    };
    this.changeForm = this.props.changeForm;
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.roleChangeHandler = this.roleChangeHandler.bind(this);
    this.departmentChangeHandler = this.departmentChangeHandler.bind(this);
  }

  async componentDidMount() {
    try {
      const dptResponse = await axios.get('/api/departments');
      this.setState({ departments: dptResponse.data.departments })
      const rolesResponse = await axios.get('/api/roles');
      this.setState({ roles: rolesResponse.data.roles })
    } catch (error) {
      console.error(error);
    }
  }

  nameChangeHandler = e => {
    this.setState({ name: e.target.value });
    this.setState({ errorName: false })
  };

  emailChangeHandler = e => {
    this.setState({ email: e.target.value });
    this.setState({ errorEmail: false })
  };

  passwordChangeHandler = e => {
    this.setState({ password: e.target.value });
    this.setState({ errorPassword: false })
  };

  repeatPasswordChangeHandler = e => {
    this.setState({ repeatPassword: e.target.value });
    this.setState({ errorRepeatPassword: false })
  };

  departmentChangeHandler = e => {
    this.setState({ department: e.target.value });
    this.setState({ errorDepartment: false })
  };

  roleChangeHandler = e => {
    this.setState({ role: e.target.value });
    this.setState({ errorRole: false })
  };

  registerUserHandler = async e => {
    try {
      let {
        name,
        email,
        password,
        repeatPassword,
        department,
        role
      } = this.state;

      if (!name) {
        this.setState({ errorName: true });
      }

      if (!email) {
        this.setState({ errorEmail: true });
      }

      if (!password) {
        this.setState({ errorPassword: true });
      }

      if (!repeatPassword) {
        this.setState({ errorRepeatPassword: true });
      }

      if (!role) {
        this.setState({ errorRole: true });
      }

      if (!department) {
        this.setState({ errorDepartment: true });
      }

      if (!name || !email || !password || !repeatPassword || !role || !department){
        return;
      }
      
      //Basic validation - please user better checks
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
        localStorage.setItem("token", result.data.token);
        this.setState({ loggedIn: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const loggedIn = this.state.loggedIn;
   
    
    let {
      name,
      email,
      password,
      repeatPassword,
      department,
      role
    } = this.state;
    if (loggedIn) return <Redirect to="/dashboard" />;
    else
    return (
      <div className={styles.page}>
        <div className={styles.registerDivContainer}>
          <img
          className = {styles.loginImage}
            src="https://www.nicepng.com/png/full/335-3355144_seller-registration-icon-class-register-icon-png.png"
            alt={"Person and Locker"}
          />
          <h1>Register</h1>
          <TextField
            required
            id="name-input"
            label="Name"
            variant="filled"
            value={name}
            onChange={this.nameChangeHandler}
            error={this.state.errorName}
          />
          <span>  </span>
          <TextField
            required
            id="email-input"
            label="Email"
            type="email"
            value={email}
            onChange={this.emailChangeHandler}
            variant="filled"
            error={this.state.errorEmail}
          />
          <br/>
          <br/>
          <TextField
            required
            id="password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={this.passwordChangeHandler}
            variant="filled"
            error={this.state.errorPassword}
          />
          <span>  </span>
          <TextField
            required
            id="repeat-password-input"
            label="Re-type your password"
            type="password"
            autoComplete="current-password"
            onChange={this.repeatPasswordChangeHandler}
            value={repeatPassword}
            variant="filled"
            error={this.state.errorRepeatPassword}
          />
          <br />
          <br />
          <TextField
            select
            id = "role-input"
            label = "Role"
            helperText = "Please select a role"
            variant = "filled"
            value={role}
            onChange={this.roleChangeHandler}
            error={this.state.errorRole}
          >
            <MenuItem value="">
              <em></em>
            </MenuItem>
            {this.state.roles.map((role, index) =>(
              <MenuItem key = {index} value = {role.role}>
                {role.role}
              </MenuItem>
            ))};
          </TextField>
          <span>  </span>
          <TextField
            select
            id = "department"
            label = "Department"
            helperText = "Please select a department"
            variant = "filled"
            value={department}
            onChange={this.departmentChangeHandler}
            error={this.state.errorDepartment}
          >
            <MenuItem value="">
              <em></em>
            </MenuItem>
            {this.state.departments.map((dpt, index) =>(
              <MenuItem key = {index} value = {dpt.department}>
                {dpt.department}
              </MenuItem>
            ))};
          </TextField>
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
          color="default"
          className={styles.button}
          >
            <a
              onClick={e => {
                e.preventDefault();
                this.changeForm(true);
              }}
            >
              Back
            </a>

          </Button>
          <span>  </span>
          <span>  </span>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            className={styles.button}
            onClick={this.registerUserHandler}
          >
            Register
          </Button>
          <br/>
          <br/>
        </div>
      </div>
    );
  }
}

export default RegisterForm;