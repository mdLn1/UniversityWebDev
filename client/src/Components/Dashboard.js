import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from 'react';
import styles from "./LoginForm.module.css";
import {IdeaContainer} from './IdeaContainer';
import {IdeaDisplayer} from './IdeaDisplayer';
import axios from "axios";
import { Button } from '@material-ui/core';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    //Gets all ideas and displayes their title
    onClick = async e => {
      try {
          const res = await axios.get("/api/ideas");
          const ideasTitleList = [];
          const ideasCategoryList = [];

          console.log(res.data);

          res.data.forEach(idea => ideasTitleList.push(idea.Title) );
          res.data.forEach(idea => ideasCategoryList.push(idea.category) );

          for (let index = 0; index < ideasTitleList.length; index++) {
            
            var newElement = document.createElement('div');
            //styling
            newElement.style.backgroundColor = 'pink'; 
            newElement.style.borderRadius = '20px';

            //--------end styling-----------
            newElement.id = ideasTitleList[index];
            newElement.className = styles.displayDiv;
            newElement.innerText= ideasTitleList[index];
            let component = "<div> <label>  </label </div>"
            newElement.innerHTML = "<div> <label> Idea Title: " +  ideasTitleList[index] + " </label><br/><br/><label>Idea Category:" +ideasCategoryList[index] + " </label> <br/><br/><br/></div>";
            document.body.appendChild(newElement);
          }

      }catch (err){
          console.log(err);
      }
    }

      
    render() {
      return (
        <div >
            <div className = {styles.dashboardNavigationBar}>
              
              <Button> Home </Button>
              <Button onClick = {this.onClick}> Ideas </Button>
              <Button> Help </Button>

            </div>
            <span> </span>
            <span></span>
            <div>
              {/* <IdeaContainer/>
              <IdeaDisplayer/> */}
            </div>
        </div>
      );
    }

  }