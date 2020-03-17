import React, { Component, Fragment } from "react";
import {
  Message,
  Divider,
  Header,
  Form,
  Input,
  Select,
  Checkbox,
  Dropdown,
  Button
} from "semantic-ui-react";
import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

class UserEditPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      successMessage: "",
      apiErrors: [],
      departmentSelected: "",
      roleSelected: "",
      name: "",
      password: "",
      confirmPassword: "",
      changePassword: false,
      email: "",
      disabled: 0,
      hideActivities: 0,
      ID: -1,
      selectedUser: null,
      panelVisible: false,
      users: this.props.users
    };
  }

  onChangeDropdown = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  onCheckboxChange = (e, data) => {
    this.setState(prevState => ({
      ...prevState,
      [data.name]: prevState[data.name] === 1 ? 0 : 1
    }));
  };
  onChangePasswordChange = (e, data) => {
    this.setState(prevState => ({
      ...prevState,
      [data.name]: !prevState[data.name]
    }));
  };

  onUserSelected = (e, data) => {
    const { departments, roles, users } = this.props;
    const user = users.find(x => x.ID === data.value) || users[0];
    if (user)
      this.setState({
        ID: data.value,
        selectedUser: user,
        hideActivities: user.hideActivities,
        disabled: user.disabled,
        password: "",
        confirmPassword: "",
        email: user.email,
        name: user.name,
        roleSelected: roles.find(x => x.id === user.role_id).role,
        departmentSelected: departments.find(x => x.id === user.department_id)
          .department,
        panelVisible: true
      });
  };

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClearChanges = () => {
    const user = this.state.selectedUser;
    const { roles, departments } = this.props;
    this.setState({
      hideActivities: user.hideActivities,
      disabled: user.disabled,
      password: "",
      confirmPassword: "",
      email: user.email,
      name: user.name,
      roleSelected: roles.find(x => x.ID === user.role_id).role,
      departmentSelected: departments.find(x => x.ID === user.department_id)
        .department
    });
  };
  onSubmit = async e => {
    e.preventDefault();
    const {
      email,
      roleSelected,
      departmentSelected,
      name,
      password,
      hideActivities,
      disabled,
      confirmPassword,
      changePassword,
      users
    } = this.state;
    const { departments, roles } = this.props;
    const emailError = !(
      email.endsWith("@gre.ac.uk") || email.endsWith("@greenwich.ac.uk")
    );
    const roleError = !roles.some(x => x.role === roleSelected) || false;
    const departmentError =
      !departments.some(x => x.department === departmentSelected) || false;
    const nameError = name.length < 5;
    let passwordError = false,
      confirmPasswordError = false;
    if (changePassword) {
      const re = new RegExp(/^.*(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/);
      passwordError = !re.test(password);
      confirmPasswordError = password !== confirmPassword;
    }

    if (
      emailError || roleError || departmentError || nameError || changePassword
        ? passwordError || confirmPasswordError
        : changePassword
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
        axios.defaults.headers.common["x-auth-token"] = cookies.get("token");
        const res = await axios.post(
          "/api/management/update-user/" + this.state.ID,
          {
            name,
            email,
            password: changePassword ? password : "",
            department: departmentSelected,
            role: roleSelected,
            hideActivities,
            disabled
          }
        );
        const changedUser = {
          ...this.state.selectedUser,
          name,
          email,
          hideActivities,
          disabled,
          roleSelected,
          departmentSelected
        };
        let newUsers = users.map(x => {
          if (x.ID === changedUser.ID) {
            return changedUser;
          } else {
            return x;
          }
        });
        this.setState(prevState => ({
          selectedUser: {
            ...changedUser
          },
          users: newUsers,
          name,
          email,
          password: "",
          confirmPassword: "",
          hideActivities,
          disabled,
          roleSelected,
          departmentSelected,
          success: true,
          successMessage: "Successfully submitted"
        }));
        this.props.updateValues("users", newUsers);
        setTimeout(
          () => this.setState({ success: false, successMessage: "" }),
          5000
        );
      } catch (err) {
        if (err.response) {
          this.setState({
            apiErrors: err.response.data.errors
          });
        } else {
          console.log(err);
        }
      }
    }
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
      success,
      successMessage,
      departmentSelected,
      roleSelected,
      email,
      confirmPassword,
      disabled,
      hideActivities,
      name,
      password,
      changePassword,
      panelVisible,
      users
    } = this.state;
    const { departments, roles } = this.props;
    const isActivityHiddenProps = {
      onChange: this.onCheckboxChange,
      label: "Activity hidden",
      name: "hideActivities"
    };

    const isUserDisabledProps = {
      onChange: this.onCheckboxChange,
      label: "Disabled",
      name: "disabled"
    };

    const changePasswordCheckboxProps = {
      onChange: this.onChangePasswordChange,
      label: "Change password",
      name: "changePassword"
    };

    const emailInputProps = {
      label: "Email",
      name: "email",
      value: email,
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
      label: "Name",
      name: "name",
      value: name,
      icon: "user",
      iconPosition: "left",
      placeholder: "Name min 5 characters",
      onChange: this.onChangeInput,
      required: true
    };
    if (nameError)
      nameInputProps.error = {
        content: "Please enter a valid first name",
        pointing: "below"
      };
    const passwordInputProps = {
      label: "Password",
      name: "password",
      value: password,
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
        content: "Please enter a password, minimum 8 characters",
        pointing: "below"
      };

    const confirmPasswordInputProps = {
      label: "Confirm Password",
      name: "confirmPassword",
      value: confirmPassword,
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
      value: roleSelected && roles[0].role,
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
      value: departmentSelected || departments[0].department,
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
        <Header size="medium" style={{ textAlign: "center" }}>
          {"Users"}
        </Header>
        <br />
        {apiErrors.length > 0 && (
          <Message negative>
            <Message.Header>
              There were some errors with your submission
            </Message.Header>
            <Message.List items={apiErrors} />
          </Message>
        )}
        {success && <Message success header={successMessage} />}
        <Divider horizontal>Select user</Divider>
        <div style={{ textAlign: "center" }}>
          <Dropdown
            placeholder="Select user"
            search
            selection
            onChange={this.onUserSelected}
            options={users.map(el => ({
              key: el.ID,
              value: el.ID,
              text: el.name
            }))}
          />
        </div>

        <br />
        {panelVisible && (
          <Fragment>
            <Divider horizontal>Edit User details</Divider>
            <Form style={{ textAlign: "left" }}>
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
                control={Checkbox}
                toggle
                checked={changePassword}
                {...changePasswordCheckboxProps}
              />
              {changePassword && (
                <Fragment>
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
                </Fragment>
              )}
              {departments.length > 0 && roles.length > 0 && (
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

                  <Form.Field
                    control={Checkbox}
                    toggle
                    checked={disabled === 1}
                    {...isUserDisabledProps}
                  />
                  <Form.Field
                    control={Checkbox}
                    toggle
                    checked={hideActivities === 1}
                    {...isActivityHiddenProps}
                  />
                </Fragment>
              )}
              <div style={{ textAlign: "center" }}>
                <Button.Group>
                  <Button negative onClick={this.onClearChanges}>
                    Clear changes
                  </Button>
                  <Button.Or />
                  <Button positive onClick={this.onSubmit}>
                    Save changes
                  </Button>
                </Button.Group>
              </div>
            </Form>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

UserEditPanel.defaultProps = {
  users: [
    {
      department_id: -1,
      role_id: -1,
      name: "Not found",
      password: "Not found",
      email: "Not found",
      disabled: 0,
      hideActivities: 1,
      ID: -1
    }
  ],
  departments: [{ ID: -1, department: "Not found" }],
  roles: [{ ID: -1, role: "Not found" }]
};

export default UserEditPanel;
