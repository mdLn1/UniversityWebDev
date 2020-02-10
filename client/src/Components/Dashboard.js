import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from 'react';
import styles from "./LoginForm.module.css";
import {IdeaContainer} from './IdeaContainer';
import {IdeaDisplayer} from './IdeaDisplayer';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          tab: "something",
        };
        this.styles = {
          width: '5%'
        }
      }
      
    render() {
        const handleChange = (event, newValue) => {
        };


      return (
        <div >
            <Paper>
                <Tabs
                    //value={}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Home" />
                    <Tab label="Ideas" />
                    <Tab label="Personal Area" />
                </Tabs>
            </Paper>
            <span> </span>
            <span></span>
            <div>
              <IdeaContainer/>
              <IdeaDisplayer/>
            </div>
        </div>
      );
    }

  }