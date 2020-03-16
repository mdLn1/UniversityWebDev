import React, { Component } from "react";
import { Grid, Message, Segment, Header, Card } from "semantic-ui-react";
import axios from "axios";
import cookies from "next-cookies";
import Layout from "../components/Layout";

export default class ContentIssues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionError: this.props.connectionError || false,
      countDownTimer: 5
    };
  }
  static async getInitialProps(ctx) {
    const { token } = cookies(ctx);
    try {
      axios.defaults.headers.common["x-auth-token"] = token;
      let resp = await axios.get("/api/management/reported-ideas");
      const { reportedIdeas } = resp.data;
      resp = await axios.get("/api/management/reported-comments");
      const { reportedComments } = resp.data;
      return {
        reportedIdeas,
        reportedComments,
        connectionError: false
      };
    } catch (error) {
      return {
        reportedIdeas: [],
        reportedComments: [],
        connectionError: "Failed to connect to the server"
      };
    }
  }
  componentDidMount() {
    if (this.props.connectionError) {
      setTimeout(() => {
        window.location.reload();
      }, 5000);
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
  render() {
    const { connectionError } = this.props;
    const { countDownTimer } = this.state;
    const { reportedComments, reportedIdeas } = this.props;
    return (
      <Layout>
        {connectionError && (
          <Message negative>
            <Message.Header>
              Sorry the connection to the server was interrupted
            </Message.Header>
            <p>{connectionError}</p>
            <p>Refreshing automatically in {countDownTimer} seconds</p>
          </Message>
        )}
        <Header size="large" style={{ textAlign: "center" }}>
          Portal Data Management
        </Header>
        <Grid stackable columns={2}>
          <Grid.Column>
            <Header size="medium" style={{ textAlign: "center" }}>
              Reported Ideas
            </Header>

            <Card.Group>
              {reportedIdeas.length > 0 &&
                reportedIdeas.map((el, index) => (
                  <Card key={index} fluid>
                    <Card.Content>
                      <Card.Header>{el.Title}</Card.Header>
                      <Card.Meta>Co-Worker</Card.Meta>
                      <Card.Description>{el.description}</Card.Description>
                    </Card.Content>
                  </Card>
                ))}
            </Card.Group>
          </Grid.Column>
          <Grid.Column>
            <Header size="medium" style={{ textAlign: "center" }}>Reported Comments</Header>

            <Card.Group>
              {reportedComments.length > 0 &&
                reportedComments.map((el, index) => (
                  <Card key={index} fluid>
                    <Card.Content>
                      <Card.Header>{el.comment_id}</Card.Header>
                      <Card.Meta>Co-Worker</Card.Meta>
                      <Card.Description>{el.comment}</Card.Description>
                    </Card.Content>
                  </Card>
                ))}
            </Card.Group>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}
