import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Cookies } from "react-cookie";
import axios from "axios";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Checkbox
} from "semantic-ui-react";

const cookies = new Cookies();

export default class manageCategories extends Component {
  state = {
    categoryTitle: "",
    categoryDescription: "",
    availability: true
  };

  handleCategoryTitleChange = event => {
    this.setState({ categoryTitle: event.target.value });
  };

  handleCategoryDescriptionChange = event => {
    this.setState({ categoryDescription: event.target.value });
  };

  handleAvailabilityChange = () => {
    this.setState({ availability: !this.state.availability });
    console.log(this.state.availability);
  };

  createCategory = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": cookies.get("token")
        }
      };

      const obj = {
        tag: this.state.categoryTitle,
        description: this.state.categoryDescription,
        isSelectable: this.state.availability
      };
      const res = await axios.post(
        "http://localhost:5000/api/categories",
        obj,
        config
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  submitCategory() {}

  render() {
    return (
      <Layout>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="top"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Manage categories
            </Header>
            <Form size="large" onSubmit={this.createCategory}>
              <Segment stacked>
                <label style={{ float: "left" }}> Brief Description</label>
                <Form.Input
                  required
                  fluid
                  icon="tags"
                  iconPosition="left"
                  placeholder="Category Title"
                  onChange={this.handleCategoryTitleChange}
                />
                <label style={{ float: "left" }}> Brief Description</label>
                <Form.TextArea
                  required
                  fluid
                  icon="list"
                  iconPosition="left"
                  placeholder="Category Description"
                  onChange={this.handleCategoryDescriptionChange}
                />
                <label
                  style={{ paddingBottom: "4%", fontSize: 15 }}
                  value="availability"
                >
                  Would you like to make this category available ?
                </label>
                <div>
                  <Checkbox
                    style={{ paddingTop: "4%" }}
                    onChange={this.handleAvailabilityChange}
                    toggle
                  />
                </div>
                <Button style={{ marginTop: "3%" }} color="teal">
                  {" "}
                  Create Category
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}
