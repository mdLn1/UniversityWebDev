import React, { Component, Fragment } from "react";
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
import cookies from "next-cookies";

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
      countDownTimer: 11,
      loadingForm: false,
      ideaSubmissionAllowed: false,
      selectedFile: [],
      fileUploadsErrors: []
    };
  }

  static async getInitialProps(ctx) {
    try {
      const { token } = cookies(ctx);
      let resp = await axios.get("/api/categories");
      const { categories } = resp.data;
      resp = await axios.get("api/management/deadlines");
      const { deadlines } = resp.data;
      return { categories, deadlines, token, connectionError: false };
    } catch (error) {
      return { connectionError: "Failed to connect to the server" };
    }
  }

  componentDidMount() {
    const { deadlines } = this.props;
    if (deadlines && deadlines.length > 0) {
      const currDeadline = deadlines.find(
        x => new Date(x.CommentsSubmissionEnd.split("T")[0]) > new Date()
      );
      if (currDeadline) {
        if (new Date(currDeadline.IdeasSubmissionEnd) > new Date()) {
          this.setState({
            currentDeadline: currDeadline,
            ideaSubmissionAllowed: true
          });
        } else {
          this.setState({ currentDeadline: currDeadline });
        }
      }
    }
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
    this.setState(prevState => ({ ...prevState, loadingForm: true }));
    const {
      description,
      title,
      category,
      categories,
      termsAgreed,
      isAnonymous,
      selectedFile
    } = this.state;
    const descriptionError = description.length < 20;
    const titleError = title.length < 5;
    const categoryError = !categories.find(x => x.tag === category);
    const termsAgreedError = !termsAgreed;
    let fileUploadsErrors = [];
    const allowedFileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
      "text/plain"
    ];
    if (selectedFile.length > 5)
      fileUploadsErrors.push("You can upload maximum 5 files");

    for (let x = 0; x < selectedFile.length; x++) {
      if (
        !(
          selectedFile[x].type.startsWith("image/") ||
          selectedFile[x].type.startsWith("audio/") ||
          allowedFileTypes.includes(selectedFile[x].type)
        )
      ) {
        fileUploadsErrors.push(
          "You can upload only images, audio files or .pdf, .csv, .docx, .txt type of files"
        );
        break;
      }
    }
    for (let x = 0; x < selectedFile.length; x++) {
      if (selectedFile[x].size > 4194304) {
        fileUploadsErrors.push(
          "You cannot upload any file larger than 4 megabytes"
        );
        break;
      }
    }
    if (
      descriptionError ||
      titleError ||
      categoryError ||
      termsAgreedError ||
      fileUploadsErrors.length > 0
    ) {
      this.setState(prevState => ({
        ...prevState,
        titleError,
        descriptionError,
        categoryError,
        termsAgreedError,
        fileUploadsErrors
      }));
    } else {
      try {
        const config = {
          headers: {
            "x-auth-token": this.props.token,
            "Content-Type": "multipart/form-data"
          }
        };

        const data = new FormData();

        for (let x = 0; x < selectedFile.length; x++) {
          console.log(selectedFile[x]);
          data.append("files", selectedFile[x]);
        }
        data.append("description", description);
        data.append("title", title);
        data.append("termsAgreed", termsAgreed);
        data.append("isAnonymous", isAnonymous);
        data.append("category", category);

        const res = await axios.post("/api/ideas/", data, config);
        this.setState({ loadingForm: false });
        Router.push("/ideas/[id]", `/ideas/${res.data.ideaId}`);
      } catch (err) {
        console.log(err);
        if (err.response) {
          this.setState({ apiErrors: err.response.data.errors });
        }
      }
      this.setState(prevState => ({ ...prevState, loadingForm: false }));
    }
  };

  onFileUploadHandler = event => {
    this.setState({
      selectedFile: event.target.files
    });
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
      countDownTimer,
      fileUploadsErrors,
      loadingForm,
      ideaSubmissionAllowed,
      currentDeadline
    } = this.state;
    const formProps = {
      name: "createIdeaForm",
      style: {
        border: "1px solid black",
        padding: "1.5rem",
        borderRadius: "1rem"
      }
    };
    if (loadingForm) {
      formProps.loading = true;
    } else {
      formProps.loading = false;
    }
    if (ideaSubmissionAllowed) {
      formProps.onSubmit = this.onSubmit;
    }
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
        <div
          style={{ maxWidth: "32rem", margin: "auto", padding: ".5rem 2rem" }}
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
          {!currentDeadline && !connectionError && (
            <Message success>
              <Message.Header>
                There is no deadline available, you can submit anything
              </Message.Header>
            </Message>
          )}
          {!ideaSubmissionAllowed && (
            <Message negative>
              <Message.Header>
                You can no longer submit ideas, the deadline has passed
              </Message.Header>
            </Message>
          )}
          {ideaSubmissionAllowed && (
            <Message warning>
              <Message.Header>
                Once idea submitted you cannot make changes anymore
              </Message.Header>
              <p>
                Please make sure your grammar is right and you did not forget
                anything
              </p>
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

          <Form id="form" {...formProps}>
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
            {fileUploadsErrors.length > 0 && (
              <ul>
                {fileUploadsErrors.map((el, index) => (
                  <li key={index}>{el}</li>
                ))}
              </ul>
            )}
            <br></br>
            {ideaSubmissionAllowed ? (
              <Fragment>
                <Form.Input
                  type="file"
                  multiple
                  onChange={this.onFileUploadHandler}
                />
                <Button color="teal" type="submit" fluid size="large">
                  Submit
                </Button>
              </Fragment>
            ) : (
              <Button color="red" fluid size="large">
                No idea can be submitted
              </Button>
            )}
          </Form>
        </div>
      </Layout>
    );
  }
}

export default submitIdea;
