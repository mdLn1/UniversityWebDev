import React, { Component } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import { Router } from "../../routes";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import axios from "axios";
import { handleAuthSSR } from "../../utilsNext/authSSR";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

class submitIdea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      ideaTitle: "",
      categoryTitle: "-1",
      isAnonymous: false,
      termsAgreed: false,
      categories: this.props.categories || [],
      connectionError: this.props.connectionError
    };
  }

  static async getInitialProps() {
    try {
      const res = await axios.get("/api/categories");
      const { categories } = res.data;
      return { categories, connectionError: false };
    } catch (error) {
      return { connectionError: error };
    }
  }

  onChangeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSelectChange = e => {
    this.setState({ categoryTitle: e.target.id });
  };

  onSubmit = async e => {
    e.preventDefault();
    const form = document.forms[0];
    try {
      const config = {
        headers: {
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

      const res = await axios.post("/api/ideas/", obj, config);

      Router.push("/ideas/[id]", `/ideas/${res.data.ideaId}`);
    } catch (err) {
      this.setState({ apiErrors: err.response.data.errors });
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
                  label="Post Anonymously"
                  name="isAnonymous"
                  defaultChecked={false}
                />
                <br></br>
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
