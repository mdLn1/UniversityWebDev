import React, { Component, Fragment } from "react";
import { Header, Pagination, Message } from "semantic-ui-react";
import axios from "axios";
import cookies from "next-cookies";
import jwt_decode from "jwt-decode";
import MyIdeasList from "../components/MyIdeasList";
import NotAuthenticated from "../components/NotAuthenticated";
import { AuthContext } from "../context/AuthenticationContext";
import RefreshError from '../components/RefreshError'

class MyIdeas extends Component {
  state = {
    ideas: this.props.ideas || [],
    apiErrors: [],
    connectionError: false,
    selectedPage: 1,
    numberOfPages: this.props.numberOfPages || 1,
    countDownTimer: 5
  };

  static async getInitialProps(props) {
    try {
      const { token } = cookies(props);
      if (token) {
        let decoded = jwt_decode(token);
        let userID = decoded.user.id;
        const config = {
          headers: {
            "x-auth-token": token
          }
        };
        let res = await axios.get(
          `/api/ideas/user/${userID}?itemsCount=5&pageNo=${1}`,
          config
        );
        let ideas = res.data.userIdeas;
        let totalIdeas = res.data.totalIdeas;
        return {
          ideas,
          numberOfPages: Math.ceil(totalIdeas / 5)
        };
      } else {
        return { connectionError: "connection failed" };
      }
    } catch (err) {
      return { connectionError: "connection failed" };
    }
  }

  async componentDidMount() {
    if (this.context.authenticated) {
      try {
        const res = await axios.get(
          `/api/ideas/user/${this.context.user.id}`
        );
        const { userIdeas, totalIdeas } = res.data;
        this.setState({
          ideas: userIdeas,
          totalPages: Math.ceil(totalIdeas / 5),
          selectedPage: 1
        });
      } catch (err) {
        if (err.response) console.log(err.response.data);
      }
    }
    // if (this.props.connectionError) {
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 6000);
    //   setInterval(
    //     () =>
    //       this.setState((prevState, props) => ({
    //         ...prevState,
    //         countDownTimer:
    //           prevState.countDownTimer > 0 ? prevState.countDownTimer - 1 : 0
    //       })),
    //     1000
    //   );
    // }
  }

  async updateListOfIdeas(activePage = 1) {
    try {
      const res = await axios.get(
        `/api/ideas/user/${this.context.user.id}?itemsCount=5&pageNo=${activePage}`
      );
      let ideas = res.data.userIdeas;
      let totalIdeas = res.data.totalIdeas;
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
    if (!this.context.authenticated) {
      return <NotAuthenticated />;
    }
    const { selectedPage, numberOfPages, connectionError, ideas, countDownTimer } = this.state;
    return (
      <Fragment>
        {connectionError && (
          <RefreshError />
        )}
        <Header as="h2" color="teal" textAlign="center">
          My Ideas
        </Header>

        {!connectionError && (
          <Fragment>
            <MyIdeasList ideas={ideas} />
            <div style={{ margin: "2rem auto", textAlign: "center" }}>
              <Pagination
                activePage={selectedPage}
                totalPages={numberOfPages}
                siblingRange={1}
                onPageChange={this.setPageNum}
              />
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}
MyIdeas.contextType = AuthContext;
export default MyIdeas;
