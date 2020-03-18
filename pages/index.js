import React, { Component } from "react";
import Layout from "../components/Layout";
import { Header, Menu, Dropdown, Message } from "semantic-ui-react";
import axios from "axios";
import { Pagination } from "semantic-ui-react";
import { Cookies } from "react-cookie";
import IdeasList from "../components/IdeasList";

const cookies = new Cookies();

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
      registrationSuccess: false,
      currentDeadline: null,
      queryLink: "MostRecentIdeas",
      currentSort: 1,
      countDownTimer: 5
    };
  }

  static async getInitialProps({ query }) {
    try {
      let res = await axios.get("api/stats/MostRecentIdeas");
      const { ideas, totalIdeas } = res.data;
      res = await axios.get("/api/management/deadlines");
      const { deadlines } = res.data;
      return {
        query,
        ideas,
        deadlines,
        numberOfPages: Math.ceil(totalIdeas / 5)
      };
    } catch (err) {
      return { query, connectionError: "Failed to fetch data" };
    }
  }

  componentDidMount() {
    const { query, deadlines } = this.props;
    if (query && query.loginSuccess) {
      this.setState({ loginSuccess: true });
      setTimeout(() => this.setState({ loginSuccess: false }), 3000);
    }
    if (deadlines && deadlines.length > 0) {
      const currDeadline = deadlines.find(
        x => new Date(x.CommentsSubmissionEnd.split("T")[0]) > new Date()
      );
      if (currDeadline) {
        this.setState({ currentDeadline: currDeadline });
      }
    }
    if (query && query.registrationSuccess) {
      this.setState({ registrationSuccess: true });
      setTimeout(() => this.setState({ registrationSuccess: false }), 3000);
    }
    if (this.props.connectionError) {
      setTimeout(() => {
        window.location.reload();
      }, 6000);
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

  onDropdownChange = async (e, data) => {
    if (this.state.currentSort !== data.value) {
      let newQuery;
      switch (data.value) {
        case 2:
          newQuery = "OldestIdeas";
          break;
        case 3:
          newQuery = "HighestRatedIdeas";
          break;
        case 4:
          newQuery = "MostViewedIdeas";
          break;
        default:
          newQuery = "MostRecentIdeas";
      }
      try {
        const res = await axios.get(
          `/api/stats/${newQuery}?itemsCount=5&pageNo=${1}`
        );
        const { ideas, totalIdeas } = res.data;
        this.setState(prevState => ({
          ...prevState,
          ideas,
          queryLink: newQuery,
          selectedPage: 1,
          currentSort: data.value,
          numberOfPages: Math.ceil(totalIdeas / 5),
          connectionError: false
        }));
      } catch (err) {
        this.setState({ connectionError: err });
      }
    }
  };

  async updateListOfIdeas(activePage = 1) {
    try {
      const res = await axios.get(
        `/api/stats/${this.state.queryLink}?itemsCount=5&pageNo=${activePage}`
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
      registrationSuccess,
      countDownTimer,
      currentDeadline,
      currentSort
    } = this.state;
    const sortOptions = [
      { key: 1, text: "Date (new to old)", value: 1 },
      { key: 2, text: "Date (old to new)", value: 2 },
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
        {currentDeadline && (
          <Message warning>
            <Message.Header>The current deadlines are</Message.Header>
            <p>
              For ideas submission:{" "}
              {new Date(currentDeadline.IdeasSubmissionEnd).toUTCString()}
            </p>
            <p>
              For comments submission:{" "}
              {new Date(currentDeadline.CommentsSubmissionEnd).toUTCString()}
            </p>
          </Message>
        )}
        {!currentDeadline && !connectionError && (
          <Message success>
            <Message.Header>
              There is no deadline available, you can submit anything
            </Message.Header>
          </Message>
        )}
        <div>
          <Header as="h2" color="teal" textAlign="center">
            Ideas Portal Dashboard
          </Header>
          <div>
            <Menu compact>
              <Dropdown
                selection
                onChange={this.onDropdownChange}
                options={sortOptions}
                value={currentSort}
              />
            </Menu>
          </div>
          {registrationSuccess && name && (
            <Message
              success
              header="Registration successful"
              content={"You are now logged in as " + name}
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
