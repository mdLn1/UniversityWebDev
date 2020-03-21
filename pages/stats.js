import React, { Component, Fragment } from "react";
import { Header, Message } from "semantic-ui-react";
import axios from "axios";
import cookies from "next-cookies";
import PieChart from "../components/PieChart";
import NotAuthorized from "../components/NotAuthorized";
import { AuthContext } from "../context/AuthenticationContext";
import RefreshError from '../components/RefreshError'

class Stats extends Component {
  static contextType = AuthContext;
  state = {
    browserData: this.props.browserData || [],
    osData: this.props.osData || [],
    mostViewedIdeas: this.props.mostViewedIdeas || [],
    highestRatedIdeas: this.props.highestRatedIdeas || [],
    mostUserSubmitIdeas: this.props.mostUserSubmitIdeas || [],
    countDownTimer: 6,
    connectionError: this.props.connectionError || false
  };

  static async getInitialProps(props) {
    try {
      const { token } = cookies(props);
      axios.defaults.headers.common["x-auth-token"] = token;
      const resBrowser = await axios.get(`/api/userDevice/browser`);
      const { browserData } = resBrowser.data;
      const resOs = await axios.get(`/api/userDevice/os`);
      const { osData } = resOs.data;
      const mostViewed = await axios.get(`/api/stats/MostViewedIdeas`);
      const mostViewedIdeas = mostViewed.data.ideas;
      const highestRated = await axios.get(`/api/stats/HighestRatedIdeas`);
      const highestRatedIdeas = highestRated.data.ideas;
      const mostUserIdeas = await axios.get(`/api/stats/IdeasPerUser`);
      const mostUserSubmitIdeas = mostUserIdeas.data;
      return {
        browserData,
        osData,
        mostViewedIdeas,
        highestRatedIdeas,
        mostUserSubmitIdeas
      };
    } catch (err) {
      console.log(err)
      return { connectionError: "Connection failed" }
    }
  }

  // componentDidMount() {
  //   if (this.props.connectionError) {
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 6000);
  //     setInterval(
  //       () =>
  //         this.setState((prevState, props) => ({
  //           ...prevState,
  //           countDownTimer:
  //             prevState.countDownTimer > 0 ? prevState.countDownTimer - 1 : 0
  //         })),
  //       1000
  //     );
  //   }
  // }

  render() {
    if (
      !this.context.authenticated ||
      !this.context.user?.role ||
      this.context.user.role !== "QA Manager"
    ) {
      return <NotAuthorized />;
    }

    const { connectionError, countDownTimer } = this.state;

    return (
      <Fragment>
        {connectionError && (
          <RefreshError pathname="/stats" />
        )}
        <Header as="h2" color="teal" textAlign="center">
          Portal Statistics
        </Header>{!connectionError && <Fragment>
          <PieChart type={"mostViewed"} data={this.state.mostViewedIdeas} />
          <PieChart type={"highestRated"} data={this.state.highestRatedIdeas} />
          <PieChart type={"mostUser"} data={this.state.mostUserSubmitIdeas} />
          <PieChart type={"browser"} data={this.state.browserData} />
          <PieChart type={"os"} data={this.state.osData} /></Fragment>}
      </Fragment>
    );
  }
}

export default Stats;
