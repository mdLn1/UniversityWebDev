import React, { Component } from "react";
import Layout from "../components/Layout";
import { Header, Menu, Dropdown, Message } from "semantic-ui-react";
import axios from "axios";
import { Pagination } from "semantic-ui-react";
import IdeasList from "../components/IdeasList";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPage: 1,
      ideas: this.props.ideas || [],
      selectedPage: 1,
      numberOfPages: this.props.numberOfPages || 1,
      connectionError: this.props.connectionError,
      loginSuccess: false,
      registrationSuccess: false
    };
  }
  static async getInitialProps({ query }) {
    try {
      const res = await axios.get("api/ideas?itemsCount=5&pageNo=1");
      const { ideas, totalIdeas } = res.data;
      return { query, ideas, numberOfPages: Math.ceil(totalIdeas / 5) };
    } catch (err) {
      return { query, connectionError: "Failed to fetch data" };
    }
  }
  componentDidMount() {
    const { query } = this.props;
    if (query && query.loginSuccess) {
      this.setState({ loginSuccess: true });
      setTimeout(() => this.setState({ loginSuccess: false }), 3000);
    }
    if (query && query.registrationSuccess) {
      this.setState({ registrationSuccess: true });
      setTimeout(() => this.setState({ registrationSuccess: false }), 3000);
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
  async updateListOfIdeas(activePage) {
    try {
      const res = await axios.get(
        `/api/ideas?itemsCount=5&pageNo=${activePage}`
      );
      const { ideas, totalIdeas } = res.data;
      this.setState(prevState => ({
        ...prevState,
        ideas,
        numberOfPages: Math.ceil(totalIdeas / 5),
        connectionError: false
      }));
    } catch (err) {
      this.setState({ connectionError: err });
    }
  }

  setPageNum = async (event, { activePage }) => {
    this.setState({ selectedPage: activePage });
    await this.updateListOfIdeas(activePage);
  };

  render() {
    const {
      selectedPage,
      numberOfPages,
      connectionError,
      loginSuccess,
      registrationSuccess
    } = this.state;
    const sortOptions = [
      { key: 1, text: "Date (new to old)", value: 1 },
      { key: 2, text: "Date (old to new", value: 2 },
      { key: 3, text: "Most Liked", value: 3 },
      { keu: 4, text: "Most Viewed", value: 4 }
    ];
    let name = null;
    if (typeof Storage !== "undefined") {
      name = localStorage.getItem("username");
    }

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
        <div>
          <Header as="h2" color="teal" textAlign="center">
            Ideas Portal Dashboard
          </Header>
          <div>
            <Menu compact>
              <Dropdown text="Sort by" options={sortOptions} simple item />
            </Menu>
          </div>
          {registrationSuccess && name && (
            <Message
              success
              header="Registration successful"
              content={"You are now logged in as " + name}
            />
          )}
          {this.state.connectionError && name && (
            <Message
              negative
              header="Request failed, connection lost"
              content="Please refresh the page in few seconds"
            />
          )}
          {loginSuccess && name && (
            <Message
              success
              header="Login Successful"
              content={"You are now logged in as " + name}
            />
          )}

          <br></br>
          <IdeasList ideas={this.state.ideas} />

          <br></br>
          <div style={{ margin: "2rem auto", textAlign: "center" }}>
            <Pagination
              activePage={selectedPage}
              totalPages={numberOfPages}
              siblingRange={1}
              onPageChange={this.setPageNum}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default Dashboard;
