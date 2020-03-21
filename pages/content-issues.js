import React, { Component, Fragment } from "react";
import { Grid, Message, Segment, Header, Card, Icon } from "semantic-ui-react";
import axios from "axios";
import cookies from "next-cookies";
import ReportedIdea from "../components/ReportedIdea";
import ReportedComment from "../components/ReportedComment";
import NotAuthorized from "../components/NotAuthorized";
import { AuthContext } from "../context/AuthenticationContext";
import RefreshError from '../components/RefreshError'

export default class ContentIssues extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      connectionError: this.props.connectionError || false,
      reportedComments: this.props.reportedComments,
      reportedIdeas: this.props.reportedIdeas,
      countDownTimer: 5,
      apiErrors: []
    };
  }
  static async getInitialProps(ctx) {
    const { token } = cookies(ctx);
    try {
      axios.defaults.headers.common["x-auth-token"] = token;
      let resp = await axios.get(
        "/api/management/reported-ideas"
      );
      const { reportedIdeas } = resp.data;
      resp = await axios.get(
        "/api/management/reported-comments"
      );
      const { reportedComments } = resp.data;
      return {
        reportedIdeas: reportedIdeas || [],
        token,
        reportedComments: reportedComments || [],
        connectionError: false
      };
    } catch (error) {
      return {
        reportedIdeas: [],
        reportedComments: [],
        token,
        connectionError: "Failed to connect to the server"
      };
    }
  }
  // componentDidMount() {
  //   if (
  //     this.context.authenticated &&
  //     this.context.user?.role &&
  //     this.context.user.role === "QA Manager"
  //   ) {
  //     if (this.props.connectionError) {
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 5000);
  //       setInterval(
  //         () =>
  //           this.setState((prevState, props) => ({
  //             ...prevState,
  //             countDownTimer:
  //               prevState.countDownTimer > 0 ? prevState.countDownTimer - 1 : 0
  //           })),
  //         1000
  //       );
  //     }
  //   }
  // }

  deleteCommentAction = async commentId => {
    try {
      const res = await axios.delete(
        "/api/management/delete-comment/" + commentId
      );
      this.setState(prevState => ({
        ...prevState,
        reportedComments: prevState.reportedComments.filter(
          x => x.comment_id !== commentId
        )
      }));
      return true;
    } catch (err) {
      if (err.response) {
        this.setState({ apiErrors: err.response.data.errors });
      }
    }
    return false;
  };

  blockUserAction = async (userId, disabled) => {
    try {
      const linkRest = disabled === 0 ? "disable-user" : "enable-user";
      const res = await axios.get(`/api/management/${linkRest}/` + userId);
      this.setState(prevState => ({
        ...prevState,
        reportedIdeas: prevState.reportedIdeas.map(x => {
          if (x.authorId === userId) {
            return {
              ...x,
              disabled: disabled === 1 ? 0 : 1
            };
          } else return x;
        })
      }));
      return true;
    } catch (err) {
      if (err.response) {
        this.setState({ apiErrors: err.response.data.errors });
      }
    }
    return false;
  };

  hideUserActivityAction = async (userId, isActivityHidden) => {
    try {
      const linkRest = isActivityHidden === 1
        ? "show-user-activity"
        : "hide-user-activity";
      const res = await axios.get(`/api/management/${linkRest}/` + userId);

      const newList = this.state.reportedIdeas.map(x => {
        if (x.authorId === userId) {
          return {
            ...x,
            hideActivities: isActivityHidden === 1 ? 0 : 1
          };
        } else return x;
      });
      this.setState(prevState => ({
        ...prevState,
        reportedIdeas: newList
      }));
      return true;
    } catch (err) {
      if (err.response) {
        this.setState({ apiErrors: err.response.data.errors });
      }
    }
    return false;
  };
  render() {
    if (
      !this.context.authenticated ||
      !this.context.user?.role ||
      this.context.user.role !== "QA Manager"
    ) {
      return <NotAuthorized />;
    }
    const {
      countDownTimer,
      reportedComments,
      reportedIdeas,
      connectionError
    } = this.state;
    return (
      <Fragment>
        {connectionError && (
          <RefreshError pathname="/content-issues" />
        )}
        <Header size="large" style={{ textAlign: "center" }}>
          Portal Data Management
        </Header>
        <Grid stackable columns={2}>
          <Grid.Column>
            <Header size="medium" style={{ textAlign: "center" }}>
              Reported Ideas
            </Header>

            {reportedIdeas.length > 0 ? (
              <Card.Group>
                {reportedIdeas.map((el, index) => (
                  <ReportedIdea
                    key={index}
                    idea={el}
                    blockUserAction={this.blockUserAction}
                    hideUserActivityAction={this.hideUserActivityAction}
                  />
                ))}
              </Card.Group>
            ) : (
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                  <Icon name="idea" size="huge"></Icon>
                  <Header size="small"> No ideas reported</Header>
                </div>
              )}
          </Grid.Column>
          <Grid.Column>
            <Header size="medium" style={{ textAlign: "center" }}>
              Reported Comments
            </Header>

            {reportedComments.length > 0 ? (
              <Card.Group>
                {reportedComments.map((el, index) => (
                  <ReportedComment
                    key={index}
                    passedComment={el}
                    deleteComment={this.deleteCommentAction}
                  />
                ))}
              </Card.Group>
            ) : (
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                  <Icon name="comments" size="huge"></Icon>
                  <Header size="small"> No comments reported</Header>
                </div>
              )}
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}
