import React, { Component } from "react";
import cookies from "next-cookies";

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
      const resp = await axios.get("/api/categories");
      const { categories } = resp.data;
      return { categories, token, connectionError: false };
    } catch (error) {
      return { connectionError: "Failed to connect to the server" };
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
      </Layout>
    );
  }
}
