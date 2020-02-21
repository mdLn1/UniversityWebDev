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
          listOfTitles: [],
          listOfCategories:[],
          listOfDescriptions: []
        };
    }

    //Gets all ideas and displayes their title
    onClick = async e => {


      this.setState({
        areIdeasDisplayed: true
      });
      try {
          const res = await axios.get("/api/ideas");
          const ideasTitleList = [];
          const ideasCategoryList = [];
          const descriptionsList = [];


          console.log(res.data);

          res.data.forEach(idea => ideasTitleList.push(idea.Title) );
          res.data.forEach(idea => ideasCategoryList.push(idea.category) );
          res.data.forEach(idea => descriptionsList.push(idea.description) );
          
          this.setState({listOfTitles:ideasTitleList})
          this.setState({listOfCategories: ideasCategoryList})
          this.setState({listOfDescriptions:descriptionsList})

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
                this.state.listOfTitles.map(function(idea, ideax){
                  return (<IdeaBar title={idea}> </IdeaBar> )
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