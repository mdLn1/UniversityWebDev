import React, { Fragment } from "react";
import styles from "./LoginForm.module.css";
import axios from "axios";
import { Button } from "@material-ui/core";
import IdeaBar from "./IdeaBar";
import CreateLogo from "../icons/create.png";
import EditLogo from "../icons/save.png";
import DeleteLogo from "../icons/delete.png";
//import Pagination from '@material-ui/Pagination';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }


  render() {
      return (
          <Fragment>
            <div className={styles.dashboardNavigationBar}>
                {this.props.children}
                <Button> Home </Button>
                <Button> Ideas </Button>
                <Button> Help </Button>
            </div>
            <div className = {styles.row}>
                <div className={styles.column}>
                {/* add here where to redirect */}
                    <a> 
                        <view>
                            <img src={CreateLogo}></img>
                        </view>
                    </a>
                </div>
                <div className={styles.column}>
                    <a>
                        <view>
                            <img src={EditLogo}></img>
                        </view>
                    </a>
                </div>
                <div className={styles.column}>
                    <a>    
                        <view>
                            <img src={DeleteLogo}></img>
                        </view>
                    </a>
                </div>
            </div>
        </Fragment>
      );
    }
}
