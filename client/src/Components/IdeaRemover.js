import React, { Fragment } from "react";
import styles from "./LoginForm.module.css";
import axios from "axios";
import { Button } from "@material-ui/core";
import IdeaBar from "./IdeaBar";
import { Redirect } from "react-router-dom";

//import Pagination from '@material-ui/Pagination';

export class IdeaRemover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areIdeasDisplayed: true,
      listOfDescriptions: [],
      listOfIdeas: [],
      creatorMode: false,
      selectedPage: "",
      totalIdeas: ""
    };
  }

  //Gets all ideas and displayes their title
  onClick = async e => {
    this.setState({
      areIdeasDisplayed: true
    });
    try {
      const res = await axios.get(`/api/ideas?itemsCount=5&pageNo=${this.state.selectedPage}`);
      this.setState({ listOfIdeas: res.data.ideas });
      this.setState({totalIdeas: res.data['totalIdeas']});
    } catch (err) {
      console.log(err);
    }
  };


  buttonClicked = event => {
   
  }

  render() {
    if (this.state.areIdeasDisplayed) {
      return (
        <div>
          <Fragment>
            <div className={styles.dashboardNavigationBar}>
              {this.props.children}
              <Button> Home </Button>
              <Button> Ideas </Button>
              <Button> Help </Button>
            </div>
            <span> </span>
            <span> </span>
            <div className={styles.editBar}>
              <Button value = 'create' onClick = {this.redirectToMode} > Create Idea </Button>
              <Button value = 'edit' onClick = {this.redirectToMode}> Edit Idea </Button>
              <Button value = 'remove' onClick = {this.redirectToMode}> Remove Idea </Button>
            </div>
            {this.state.listOfIdeas.map(function(idea, key) {
              return (
                <IdeaBar
                  key={key}
                  title={idea.Title}
                  description={idea.description}
                  date={idea.posted_time}
                  author={idea.author}
                  likes={idea.positiveVotes - idea.negativeVotes}
                  comments={idea.commentsCount}
                ></IdeaBar>
              );
            })}
          </Fragment>
        </div>
      );
    } else {
      return (
        <div>
          <div className={styles.dashboardNavigationBar}>
            {this.props.children}
            <Button> Home </Button>
            <Button onClick={this.onClick}> Ideas </Button>
            <Button> Help </Button>
          </div>
          <span> </span>
          <span> </span>
        </div>
      );
    }
  }
}
