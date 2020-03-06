import React, { Component } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import {
  Button,
  Form,
  Grid,
  Header,
  Checkbox,
  Message,
  TextArea,
  Segment
} from "semantic-ui-react";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies()

class submitIdea extends Component {
  state = {
    description: "",
    ideaTitle: "",
    categoryTitle: "",
    isAnonymous: false,
    termsAgreed: false
  };

  descriptionChangeHandler = event => {
    this.setState({ description: event.target.value });
  };

  categoryChangeHandler = event => {
    this.setState({ categoryTitle: event.target.value });
  };

  titleChangeHandler = event => {
    this.setState({ ideaTitle: event.target.value });
  };

  termsChangeHandler = () => {
    this.setState({ termsAgreed: !this.termsAgreed });
    console.log(this.state.termsAgreed)
  };

  anonymousChangeHandler = () => {
    this.setState({ isAnonymous: !this.isAnonymous });
    console.log(this.state.isAnonymous);
    
  }

  onSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": cookies.get('token')
        }
      };
      const obj = {
        description: this.state.description,
        isAnonymous: false,
        title: this.state.ideaTitle,
        categoryId: this.state.categoryTitle,
        termsAgreed: true
      };
      const res = await axios.post(
        "http://localhost:5000/api/ideas/", obj, config
      );
    
    } catch (err) {
      console.log(err);
    }
  }

  render() {

    // rendering goes here

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
              Create an Idea
            </Header>
            <Form size="large" onSubmit={this.onSubmit}>
              <Segment stacked>
                <Form.Input
                  required
                  fluid
                  placeholder="Title"
                  onChange={this.titleChangeHandler}
                />
                <Form.Input
                  required
                  fluid
                  placeholder="Category"
                  onChange={this.categoryChangeHandler}
                />
                <Form.TextArea
                  required
                  placeholder="Type your Idea"
                  onChange={this.descriptionChangeHandler}
                />
                <Form.Checkbox
                  required
                  label="Terms and Conditions"
                  defaultChecked= {false}
                  onClick={this.termsChangeHandler}
                />
                <Checkbox
                  label="Post Anonimously"
                  onClick = { this.anonymousChangeHandler}
                  defaultChecked={false}
                />
                <br></br>
                <br></br>

                {/* <Form.Dropdown
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
                /> */}

                <Button color="teal" fluid size="large">
                  Submit
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default submitIdea;