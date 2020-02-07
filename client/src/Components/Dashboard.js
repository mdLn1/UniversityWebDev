import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from 'react';
import styles from "./LoginForm.module.css";
import { StreamApp, NotificationDropdown, FlatFeed, LikeButton, Activity, CommentList, CommentField, StatusUpdateForm } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';


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
          <h1>Something</h1>
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
            <span />
            <span />
            <div>
            <StreamApp
              apiKey="du8he7epvp94"
              appId="45206"
              token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOWI1MzdiOWItY2M5OC00N2FjLWI5Y2MtZDIzOGEwNjQxNjJiIn0.ycF2JIO1MaCCDNEojPXnx5RPG4UGf-MiJfLh8iOFBOM"
            >
              <NotificationDropdown notify />
              <StatusUpdateForm
                feedGroup="timeline"
                userId="9b537b9b-cc98-47ac-b9cc-d238a064162b" />
              <FlatFeed
                options={ {reactions: { recent: true } } }
                notify
                Activity={(props) =>
                    <Activity {...props}
                      Footer={() => (
                        <div className = {styles.likeButtonDiv}>
                            <LikeButton  {...props} />
                          <CommentField
                            activity={props.activity}
                            onAddReaction={props.onAddReaction} />
                          <CommentList activityId={props.activity.id} />
                        </div>
                      )}
                    />
                  }
                />
            </StreamApp>
            </div>
        </div>
      );
    }

  }