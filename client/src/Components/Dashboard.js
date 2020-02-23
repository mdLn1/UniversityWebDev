import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from 'react';
import styles from "./LoginForm.module.css";
import {IdeaContainer} from './IdeaContainer';
import {IdeaDisplayer} from './IdeaDisplayer';
import axios from "axios";
import { Button } from '@material-ui/core';
import IdeaBar from "./IdeaBar";
export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          areIdeasDisplayed:false,
          listOfDescriptions: [],
          listOfIdeas:[]
        };
    }


    //Gets all ideas and displayes their title
    onClick = async e => {


      this.setState({
        areIdeasDisplayed: true
      });
      try {
          const res = await axios.get("/api/ideas");
          const descriptionsList = [];

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
              <div className = {styles.dashboardNavigationBar}>
                {this.props.children}
                <Button> Home </Button>
                <Button> Ideas </Button>
                <Button> Help </Button>
              </div>
              <span> </span>
              <span> </span>
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