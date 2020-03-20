import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import Layout from "../components/Layout";
import axios from "axios";
import PieChart from "../components/PieChart";

class Stats extends Component {
  state = {
    browserData: this.props.browserData || [],
    osData: this.props.osData || [],
    mostViewedIdeas: this.props.mostViewedIdeas || [],
    highestRatedIdeas: this.props.highestRatedIdeas || [],
    mostUserSubmitIdeas: this.props.mostUserSubmitIdeas || []
  };

  static async getInitialProps(props) {
    try {
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
    } catch (err) {}
    return {};
  }

  render() {
    return (
      <Layout>
        <Header as="h2" color="teal" textAlign="center">
          Portal Statistics
        </Header>
        <PieChart type={"mostViewed"} data={this.state.mostViewedIdeas} />
        <PieChart type={"highestRated"} data={this.state.highestRatedIdeas} />
        <PieChart type={"mostUser"} data={this.state.mostUserSubmitIdeas} />
        <PieChart type={"browser"} data={this.state.browserData} />
        <PieChart type={"os"} data={this.state.osData} />
      </Layout>
    );
  }
}

export default Stats;
