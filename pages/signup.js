import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import Head from "next/head";
import axios from "axios";
import Layout from "../components/Layout";

class LoginForm extends Component {
  state = {
    departments: [],
    roles: []
  };

  async componentDidMount() {
    try {
      const dptResponse = await axios.get("http://localhost:5000/api/departments");
      this.setState({ departments: dptResponse.data.departments });
      const rolesResponse = await axios.get("http://localhost:5000/api/roles");
      this.setState({ roles: rolesResponse.data.roles });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const dptOptions = this.state.departments.map(dpt => ({
      key: dpt.department,
      text: dpt.department,
      value: dpt.department
    }));

    const rolesOptions = this.state.roles.map(role => ({
      key: role.role,
      text: role.role,
      value: role.role
    }));
    return (
      <Layout>
        <Head>
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
        </Head>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="top"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Signup to the Idea Portal
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  required
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                />
                <Form.Input
                  required
                  fluid
                  icon="address card"
                  iconPosition="left"
                  placeholder="E-mail address"
                />
                <Form.Input
                  required
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <Form.Input
                  required
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Repeat Password"
                  type="password"
                />
                <Form.Dropdown
                  required
                  placeholder="Select Department"
                  fluid
                  selection
                  options={dptOptions}
                />
                <Form.Dropdown
                  required
                  placeholder="Select Role"
                  fluid
                  selection
                  options={rolesOptions}
                />

                <Button color="teal" fluid size="large">
                  Register
                </Button>
              </Segment>
            </Form>
            <Message>
              Already Registred? <a href="/login">Login</a>
            </Message>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default LoginForm;
