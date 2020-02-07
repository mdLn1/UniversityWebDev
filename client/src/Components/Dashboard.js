import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from 'react';
import styles from "./LoginForm.module.css";


export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          tab: "something",
        };
      }
    render() {
        

        const handleChange = (event, newValue) => {
            
        };

      return (
        <div >
            <Paper className = 'useStyles'>
                <Tabs
                    //value={}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Home" />
                    <Tab label="Ideas" />
                    <Tab label="..." />
                </Tabs>
            </Paper>
            <span />
            <span />

            <div className = {styles.dashboardContainer}>
                <label>something</label>
            </div>
        </div>
      );
    }

  }