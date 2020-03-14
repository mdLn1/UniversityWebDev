import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Router } from "../../routes";
import {
  Button,
  Form,
  Message,
  Header,
  Select,
  Checkbox,
  TextArea
} from "semantic-ui-react";
import axios from "axios";
import { handleAuthSSR } from "../../utilsNext/authSSR";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

class submitIdea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      descriptionError: false,
      title: "",
      titleError: false,
      category: "",
      categoryError: false,
      apiErrors: [],
      isAnonymous: false,
      termsAgreed: false,
      termsAgreedError: false,
      categories: this.props.categories || [],
      connectionError: this.props.connectionError,
      countDownTimer: 11
    };
  }

  static async getInitialProps() {
    try {
      const res = await axios.get("/api/categories");
      const { categories } = res.data;
      return { categories, connectionError: false };
    } catch (error) {
      return { connectionError: "Failed to connect to the server" };
    }
  }

  componentDidMount() {
    if (this.props.connectionError) {
      setTimeout(() => {
        window.location.reload();
      }, 10000);
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

  onChangeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSelectChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };
  onCheckboxChange = (e, data) => {
    this.setState(prevState => ({
      ...prevState,
      [data.name]: !prevState[data.name]
    }));
  };

  onSubmit = async e => {
    e.preventDefault();
    const {
      description,
      title,
      category,
      categories,
      termsAgreed
    } = this.state;
    const descriptionError = description.length < 20;
    const titleError = title.length < 5;
    const categoryError = !categories.find(x => x.tag === category);
    const termsAgreedError = !termsAgreed;
    if (descriptionError || titleError || categoryError || termsAgreedError) {
      this.setState(prevState => ({
        ...prevState,
        titleError,
        descriptionError,
        categoryError,
        termsAgreedError
      }));
    } else {
      try {
        const config = {
          headers: {
            "x-auth-token": cookies.get("token")
          }
        };
        const obj = {
          description,
          title,
          termsAgreed,
          isAnonymous,
          category
        };

        const res = await axios.post("/api/ideas/", obj, config);

        Router.push("/ideas/[id]", `/ideas/${res.data.ideaId}`);
      } catch (err) {
        this.setState({ apiErrors: err.response.data.errors });
      }
    }
  };

  render() {
    const {
      connectionError,
      termsAgreedError,
      categoryError,
      descriptionError,
      categories,
      titleError,
      apiErrors,
      countDownTimer
    } = this.state;

    const titleInputProps = {
      required: true,
      label: "Title",
      placeholder: "Title",
      name: "title",
      onChange: this.onChangeText
    };
    if (titleError) {
      titleInputProps.error = {
        content: "Please enter at least 5 characters for title",
        pointing: "below"
      };
    }

    const descriptionInputProps = {
      required: true,
      label: "Description",
      placeholder: "Your idea in detail",
      name: "description",
      onChange: this.onChangeText
    };
    if (descriptionError) {
      descriptionInputProps.error = {
        content: "Please enter at least 20 characters for your idea",
        pointing: "below"
      };
    }
    const categoryDropdownProps = {
      required: true,
      label: "Category",
      placeholder: "Please select a category",
      name: "category",
      onChange: this.onSelectChange,
      options: categories.map((el, index) => ({
        key: index,
        text: el.tag,
        value: el.tag
      }))
    };
    if (categoryError) {
      categoryDropdownProps.error = {
        content: "Please select one of the existing categories",
        pointing: "below"
      };
    }

    const termsAgreedCheckboxProps = {
      required: true,
      label: "Terms and Conditions",
      name: "termsAgreed",
      onChange: this.onCheckboxChange
    };
    if (termsAgreedError) {
      termsAgreedCheckboxProps.error = {
        content: "Please accept terms and conditions",
        pointing: "below"
      };
    }
    return (
      <Layout>
        <Form>
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
              name="createIdeaForm"
              style={{
                border: "1px solid black",
                padding: "1.5rem",
                borderRadius: "1rem"
              }}
              onSubmit={this.onSubmit}
              id="form"
            >
              <Header as="h2" color="teal" textAlign="center">
                Create an Idea
              </Header>
              <Form.Input required fluid {...titleInputProps} />
              <Form.Field
                control={Select}
                fluid
                {...categoryDropdownProps}
                search
                searchInput={{ id: "form-select-control-categories" }}
              />
              <Form.Field control={TextArea} {...descriptionInputProps} />
              <Form.Field
                control={Checkbox}
                toggle
                {...termsAgreedCheckboxProps}
              />
              <Form.Field
                control={Checkbox}
                label="Anonymous idea"
                name="isAnonymous"
                toggle
                onChange={this.onCheckboxChange}
              />
              <br></br>
              <Button color="teal" type="submit" fluid size="large">
                Submit
              </Button>
            </Form>
          </div>
        </Form>
      </Layout>
    );
  }
}

export default submitIdea;
