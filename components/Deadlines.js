import React, { Component, Fragment } from "react";
import {
  Message,
  Divider,
  Header,
  Form,
  Input,
  Button
} from "semantic-ui-react";
import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

export default class Deadlines extends Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    const fullDate =
      currentDate.getFullYear() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getDate();
    let date1 = fullDate,
      date2 = fullDate;
    if (this.props.currDeadline) {
      date1 = this.props.currDeadline.IdeasSubmissionEnd.split("T")[0];
      date2 = this.props.currDeadline.CommentsSubmissionEnd.split("T")[0];
    }
    this.state = {
      success: false,
      successMessage: "",
      errors: [],
      commentsDateError: "",
      ideasDateError: "",
      currentIdeasSubmissionEnd: date1,
      currentCommentsSubmissionEnd: date2
    };
  }
  onResetValue = () => {
    const { IdeasSubmissionEnd, CommentsSubmissionEnd } = this.props.currDeadline;
    const currentDate = new Date();
    const fullDate =
      currentDate.getFullYear() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getDate();
    let date1 = fullDate,
      date2 = fullDate;
    if (this.props.currDeadline) {
      date1 = IdeasSubmissionEnd.split("T")[0];
      date2 = CommentsSubmissionEnd.split("T")[0];
    }
    this.setState({
      currentIdeasSubmissionEnd: date1,
      currentCommentsSubmissionEnd: date2
    });
  };

  onSelectChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  onSubmitForm = async e => {
    e.preventDefault();
    this.setState({ ideasDateError: "", commentsDateError: "" });
    const {
      currentCommentsSubmissionEnd,
      currentIdeasSubmissionEnd
    } = this.state;
    const ideasDate = new Date(currentIdeasSubmissionEnd);
    const commentsDate = new Date(currentCommentsSubmissionEnd);
    let currentEvalIdeas = "",
      currentEvalComments = "";
    if (commentsDate <= new Date()) {
      currentEvalComments = "Comments submission date must be in future";
    }
    if (ideasDate <= new Date()) {
      currentEvalIdeas = "Ideas submission date must be in future";
    } else if (commentsDate <= ideasDate) {
      currentEvalIdeas = "Ideas submission date must come before comments one";
    }
    if (currentEvalComments || currentEvalIdeas) {
      this.setState({
        ideasDateError: currentEvalIdeas,
        commentsDateError: currentEvalComments
      });
    } else {
      try {
        axios.defaults.headers.common["x-auth-token"] = cookies.get("token");
        const res = await axios.post(
          "/api/management/deadlines/" + this.props.currDeadline.ID,
          {
            ideasSubmissionEnd: currentIdeasSubmissionEnd,
            commentsSubmissionEnd: currentCommentsSubmissionEnd
          }
        );
        this.setState({
          successMessage: "Deadline was updated",
          success: true
        });
      } catch (err) {
        if (err.response) {
          this.setState({ errors: err.response.data.errors });
        } else {
          this.setState({ errors: ["unexpected error"] });
        }
      }
    }

    setTimeout(
      () =>
        this.setState({
          ideasDateError: "",
          commentsDateError: "",
          success: false,
          successMessage: ""
        }),
      5000
    );
  };
  render() {
    const {
      errors,
      success,
      successMessage,
      currentIdeasSubmissionEnd,
      currentCommentsSubmissionEnd,
      ideasDateError,
      commentsDateError
    } = this.state;

    const ideasSubmissionEndProps = {
      value: currentIdeasSubmissionEnd
    };
    const commentsSubmissionEndProps = {
      value: currentCommentsSubmissionEnd
    };
    if (ideasDateError) {
      ideasSubmissionEndProps.error = {
        content: ideasDateError,
        pointing: "below"
      };
    }

    if (commentsDateError) {
      commentsSubmissionEndProps.error = {
        content: commentsDateError,
        pointing: "below"
      };
    }

    return (
      <Fragment>
        <Header size="medium" style={{ textAlign: "center" }}>
          {"Current deadline"}
        </Header>
        {errors.length > 0 && (
          <Message negative>
            <Message.Header>
              There were some errors with your submission
            </Message.Header>
            <Message.List items={errors} />
          </Message>
        )}
        {success && <Message success header={successMessage} />}
        <br />
        <Divider horizontal>Edit deadline</Divider>
        <Form>
          
          <label>Ideas Deadline</label>
          <Form.Field
            type="date"
            control={Input}
            name="currentIdeasSubmissionEnd"
            {...ideasSubmissionEndProps}
            fluid
            onChange={this.onSelectChange}
          />
          
          <label>Comments Deadline</label>
          <Form.Field
            control={Input}
            type="date"
            name="currentCommentsSubmissionEnd"
            {...commentsSubmissionEndProps}
            fluid
            onChange={this.onSelectChange}
          />
          <div style={{ textAlign: "right" }}>
            <Button content="Save" color="green" onClick={this.onSubmitForm} />
            <Button content="Reset" color="red" onClick={this.onResetValue} />
          </div>
        </Form>
      </Fragment>
    );
  }
}
