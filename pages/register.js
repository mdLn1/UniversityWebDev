import React, { Component, Fragment } from "react";
import Link from "next/link";
import axios from "axios";
import { Form, Input, Select, Message, Header } from "semantic-ui-react";
import isPasswordValid from "../utils/isPasswordValid";
import Router from "next/router";
import {AuthContext} from "../context/AuthenticationContext"

export default class Register extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      departmentSelected: -1,
      roleSelected: -1,
      name: "",
      password: "",
      confirmPassword: "",
      emailError: false,
      departmentError: false,
      roleError: false,
      nameError: false,
      passwordError: false,
      confirmPasswordError: false,
      countDownTimer: 3,
      apiErrors: []
    };
  }
  static async getInitialProps(props) {
    try {
      let res = await axios.get("/api/departments");
      const { departments } = res.data || [];
      res = await axios.get("/api/roles");
      const { roles } = res.data || [];
      return {
        departments: departments.filter(x => x.isSelectable),
        roles: roles.filter(x => x.isSelectable)
      };
    } catch (err) {
      console.log(err);
      return {
        connectionError: "Could not connect to server"
      };
    }
  }
  componentDidMount() {
    if (this.props.connectionError) {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      setInterval(
        () =>
          this.setState((prevState, props) => ({
            ...prevState,
            countDownTimer:
              prevState.countDownTimer > 0 ? prevState.countDownTimer - 1 : 0
          })),
        1000
      );
    }
  }

  onSubmit = async e => {
    e.preventDefault();
    const {
      email,
      roleSelected,
      departmentSelected,
      name,
      password,
      confirmPassword
    } = this.state;
    const { departments, roles } = this.props;
    const emailError = !(
      email.endsWith("@gre.ac.uk") || email.endsWith("@greenwich.ac.uk")
    );
    const roleError = !roles.some(x => x.role === roleSelected) || false;
    const departmentError =
      !departments.some(x => x.department === departmentSelected) || false;
    const nameError = name.length < 5;
    const passwordError = !isPasswordValid(password);
    const confirmPasswordError = password !== confirmPassword;

    if (
      emailError ||
      roleError ||
      departmentError ||
      nameError ||
      passwordError ||
      confirmPasswordError
    ) {
      this.setState((prevState, props) => ({
        ...prevState,
        emailError,
        roleError,
        departmentError,
        nameError,
        passwordError,
        confirmPasswordError
      }));
    } else {
      try {
        const res = await axios.post("/api/auth/register", {
          email,
          password,
          role: roleSelected,
          department: departmentSelected,
          name
        });
        localStorage.setItem("username", name);
        localStorage.setItem("email", email);
        localStorage.setItem("token", res.data.token);
        this.context.loginUser(res.data.user, res.data.token);
        Router.replace(
          { pathname: "/", query: { registrationSuccess: true } },
          "/"
        );
      } catch (err) {
        this.setState({
          apiErrors: err.response.data.errors
        });
      }
    }
  };

  onChangeDropdown = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      emailError,
      roleError,
      departmentError,
      nameError,
      passwordError,
      confirmPasswordError,
      apiErrors,
      countDownTimer
    } = this.state;
    const { departments, connectionError, roles } = this.props;
    const submitButtonProps = {
      color: "teal",
      type: "submit"
    };
    if (connectionError) {
      (submitButtonProps.color = "red"), (submitButtonProps.disabled = true);
    }

    const emailInputProps = {
      label: "Email",
      name: "email",
      onChange: this.onChangeInput,
      icon: "address card",
      iconPosition: "left",
      placeholder: "example@gre.ac.uk or example@greenwich.ac.uk",
      required: true
    };
    if (emailError) {
      emailInputProps.error = {
        content: "Please enter a valid email address",
        pointing: "below"
      };
    }

    const nameInputProps = {
      label: "Username",
      name: "name",
      icon: "user",
      iconPosition: "left",
      placeholder: "Username min 5 characters",
      onChange: this.onChangeInput,
      required: true
    };
    if (nameError)
      nameInputProps.error = {
        content: "Please enter a valid username, min 5 characters",
        pointing: "below"
      };
    const passwordInputProps = {
      label: "Password",
      name: "password",
      icon: "lock",
      iconPosition: "left",
      placeholder:
        "Password must contain at least 1 uppercase, 1 lowercase and 1 digit",
      type: "password",
      onChange: this.onChangeInput,
      required: true
    };
    if (passwordError)
      passwordInputProps.error = {
        content: "Password must be 8 characters long and contain at least 1 uppercase, 1 lowercase and 1 digit",
        pointing: "below"
      };

    const confirmPasswordInputProps = {
      label: "Confirm Password",
      name: "confirmPassword",
      icon: "lock",
      iconPosition: "left",
      placeholder: "It must be identical to password",
      type: "password",
      onChange: this.onChangeInput,
      required: true
    };
    if (confirmPasswordError)
      confirmPasswordInputProps.error = {
        content: "Confirm your password",
        pointing: "below"
      };

    const rolesDropdownProps = {
      name: "roleSelected",
      label: {
        children: "Role",
        htmlFor: "form-select-control-roles"
      },
      onChange: this.onChangeDropdown,
      placeholder: "Please select a role",
      required: true
    };

    if (roleError) {
      rolesDropdownProps.error = {
        content: "Please choose one of the existing roles",
        pointing: "below"
      };
    }

    const departmentsDropdownProps = {
      name: "departmentSelected",
      label: {
        children: "Department",
        htmlFor: "form-select-control-departments"
      },
      onChange: this.onChangeDropdown,
      placeholder: "Please select a department",
      required: true
    };
    if (departmentError) {
      departmentsDropdownProps.error = {
        content: "Please choose one of the existing departments",
        pointing: "below"
      };
    }

    return (
      <Fragment>
        <div
          style={{ maxWidth: "32rem", margin: "auto", padding: "5rem 2rem" }}
        >
          {connectionError && (
            <Message negative>
              <Message.Header>
                Sorry the connection to the server was interrupted
              </Message.Header>
              <p>{connectionError}</p>
              <p>Refreshing automatically in {countDownTimer} seconds</p>
            </Message>
          )}
          {apiErrors.length > 0 && (
            <Message negative>
              <Message.Header>
                There were some errors with your submission
              </Message.Header>
              <Message.List items={apiErrors} />
            </Message>
          )}
          <Form
            name="registrationForm"
            style={{
              border: "1px solid black",
              padding: "1.5rem",
              borderRadius: "1rem"
            }}
            onSubmit={this.onSubmit}
          >
            <Header as="h2" color="teal" textAlign="center">
              Register
            </Header>

            <Form.Field
              id="form-input-control-user-name"
              control={Input}
              {...nameInputProps}
            />
            <Form.Field
              id="form-input-control-success-email"
              control={Input}
              {...emailInputProps}
            />
            <Form.Field
              id="form-input-control-user-password"
              control={Input}
              {...passwordInputProps}
            />
            <Form.Field
              id="form-input-control-user-confirmPassword"
              control={Input}
              {...confirmPasswordInputProps}
            />
            {departments && roles && (
              <Fragment>
                <Form.Field
                  control={Select}
                  options={departments.map((el, index) => ({
                    key: index,
                    text: el.department,
                    value: el.department
                  }))}
                  {...departmentsDropdownProps}
                  search
                  searchInput={{ id: "form-select-control-department" }}
                />
                <Form.Field
                  control={Select}
                  options={roles.map((el, index) => ({
                    key: index,
                    text: el.role,
                    value: el.role
                  }))}
                  {...rolesDropdownProps}
                  search
                  searchInput={{ id: "form-select-control-roles" }}
                />
              </Fragment>
            )}

            <Form.Button {...submitButtonProps} fluid size="large">
              Submit
            </Form.Button>
            <Message>
              Already Registered?{" "}
              <Link href="/login">
                <a>Login</a>
              </Link>
            </Message>
          </Form>
        </div>
      </Fragment>
    );
  }
}
