import React, { Fragment } from 'react';
import styles from "./LoginForm.module.css";
import axios from "axios";
import { Button } from '@material-ui/core';
import IdeaBar from "./IdeaBar";
import { Redirect } from 'react-router-dom';
export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          areIdeasDisplayed:false,
          listOfDescriptions: [],
          listOfIdeas:[],
          creatorMode:false
        };
    }

    //Gets all ideas and displayes their title
    onClick = async e => {
      this.setState({
        areIdeasDisplayed: true
      });
      try {
          const res = await axios.get("/api/ideas");
          console.log(res.data);
          this.setState({listOfIdeas: res.data})
      }catch (err){
          console.log(err);
      }
    }
      
    render() {
      if(this.state.areIdeasDisplayed){
        return(
          <div >
            <Fragment>
              <div className = {styles.dashboardNavigationBar}>
                {this.props.children}
                <Button> Home </Button>
                <Button> Ideas </Button>
                <Button> Help </Button>
              </div>
              <span> </span>
              <span> </span>
              <div className = {styles.editBar}>
                <Button> Create Idea </Button>
                <Button> Edit Idea </Button>
                <Button> Remove Idea </Button>
              </div>
              {
                this.state.listOfIdeas.map(function(idea, key){
                  return (
                    <IdeaBar 
                      title={idea.Title} 
                      description={idea.description}
                      date={idea.posted_time}
                      author={idea.author}
                      likes={idea.positiveVotes-idea.negativeVotes}
                      comments = {idea.commentsCount}
                    > 
                    </IdeaBar> )
                })
              }
              </Fragment>
          </div>
        );
      } else {
        return (
          <div >
              <div className = {styles.dashboardNavigationBar}>
                {this.props.children}
                <Button> Home </Button>
                <Button onClick = {this.onClick}> Ideas </Button>
                <Button> Help </Button>
              </div>
              <span> </span>
              <span> </span>
              
          </div>
        );
    }
  }


}