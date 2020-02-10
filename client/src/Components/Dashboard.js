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

    onClick = async e => {
      try {
          const res = await axios.get("/api/ideas");
          console.log(res.data.length);
      }catch (err){
          console.log(err);
      }
    }
    
      
    render() {
      return (
        <div >
            {/* <Paper>
                <Tabs
                    //value={}
                    // onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Home" />
                    <Tab label="Ideas" {...a11yProps(1)}  />
                    <Tab label="Personal Area" />
                </Tabs>
            </Paper> */}
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