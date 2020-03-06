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

const cookies = new Cookies();

class submitIdea extends Component {
  state = {
    description: "",
    ideaTitle: "",
    categoryTitle: "-1",
    isAnonymous: false,
    termsAgreed: false,
    categories: []
  };

  async componentWillMount() {
    try {
      const categoriesRes = await axios.get(
        "http://localhost:5000/api/categories"
      );
      this.setState({ categories: categoriesRes.data.categories });
    } catch (error) {
      console.error(error);
    }
  }

  onChangeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSelectChange = e => {
    this.setState({ categoryTitle: e.target.id });
  };
  // you do not need to create method for all
  // descriptionChangeHandler = event => {
  //   this.setState({ description: event.target.value });
  // };

  // categoryChangeHandler = event => {
  //   this.setState({ categoryTitle: event.target.value });
  // };

  // titleChangeHandler = event => {
  //   this.setState({ ideaTitle: event.target.value });
  // };

  // not needed
  // termsChangeHandler = () => {
  //   this.setState({ termsAgreed: !this.termsAgreed });
  //   console.log(this.state.termsAgreed)
  // };

  // anonymousChangeHandler = () => {
  //   this.setState({ isAnonymous: !this.isAnonymous });
  //   console.log(this.state.isAnonymous);

  // }

  onSubmit = async (e) => {
    e.preventDefault();
    const form = document.forms[0];
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": cookies.get("token")
        }
      };

      const obj = {
        description: this.state.description,
        title: this.state.ideaTitle,
        categoryId: this.state.categoryTitle,
        isAnonymous: !!form[3].checked,
      termsAgreed: !!form[2].checked
      };

      const res = await axios.post(
        "http://localhost:5000/api/ideas/",
        obj,
        config
      );
    } catch (err) {
      console.log(err.response.data);
    }
  };

  render() {
    // rendering goes here
    const categoriesOptions = this.state.categories.map(category => ({
      key: category.id,
      text: category.tag,
      value: category.id,
      id: category.id
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
              Create an Idea
            </Header>
            <Form size="large" onSubmit={this.onSubmit} id="form">
              <Segment stacked>
                <Form.Input
                  required
                  fluid
                  placeholder="Title"
                  name="ideaTitle"
                  onChange={this.onChangeText}
                />
                <Form.Dropdown
                  required
                  placeholder="Select Category"
                  fluid
                  selection
                  name="categoryTitle"
                  onChange={this.onSelectChange}
                  options={categoriesOptions}
                />
                <Form.TextArea
                  required
                  placeholder="Type your Idea"
                  name="description"
                  onChange={this.onChangeText}
                />
                <Form.Checkbox
                  required
                  label="Terms and Conditions"
                  name="termsAgreed"
                  defaultChecked={false}
                />
                <Form.Checkbox
                  label="Post Anonimously"
                  name="isAnonymous"
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

                <Button color="teal" type="submit" fluid size="large">
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
