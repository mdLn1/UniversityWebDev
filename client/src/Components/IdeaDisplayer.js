import React from 'react';
import styles from "./LoginForm.module.css";
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Axios from "axios";

import { Button } from '@material-ui/core';


export class IdeaDisplayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anonymousSubmission: "",
            ideaTitle: "",
            ideaDescription: "",
            category:"",
            value: 1
        }
        
      }
      ideaTitleChangeHandler = e => {
        this.setState({ ideaTitle: e.target.value });
      };

      categoryTitleChangeHandler = e => {
        this.setState({ category: e.target.value });
      };

      descriptionChangeHandler = e => {
        this.setState({ ideaDescription: e.target.value });
      };

      anonymousCheckboxChangeHandler = e => {
        this.setState({ anonymousSubmission: e.target.value });
      };
      
      onSubmit = async e => {
        try {
            const config = {
              headers: {
                "Content-Type": "application/json"
              }
            };
            const obj = { email: this.state.username, password: this.state.password };
            const res = await Axios.post("/api/auth/login/", obj, config);
            localStorage.setItem("token", res.token);
            this.setState({ loggedIn: true });
          } catch (err) {
            console.log(err);
          }
      }


    render() {

      return (
        <div className ={styles.ideaOuterBox}>
            <span/>
            <span/>
            <div className = {styles.ideaTitle}>
                <label className ={styles.titleLabel}>Title:</label>
                <TextField
                    id="idea-title"
                    label="Idea Title "
                    variant="filled"
                    onChange={this.ideaTitleChangeHandler}
                />
            </div>
            <div className = {styles.categoryTitle}>
                <label>Category: </label>
                <TextField
                    id="category-title"
                    label="Category Title "
                    variant="filled"
                    onChange={this.categoryTitleChangeHandler}
                />
            </div>
            <div className = {styles.categoryTitle}>
                <label className={styles.titleLabel}>Idea Description:</label>
                <TextField
                    id="standard-multiline-static"
                    label="Description"
                    multiline
                    rows="4"
                    onChange = {this.descriptionChangeHandler}
                />
            </div>
            <div className = {styles.anonymousButton}>
                <FormControlLabel
                    className = {styles.anonymousCheckboxChangeHandler}
                    value={'anonymous submission'}
                    checked = {this.state.anonymousSubmission}
                    control={<Checkbox color="primary" />}
                    label="Anonymous post"
                    labelPlacement="start"
                    onChange = {this.anonymousCheckboxChangeHandler}
                />

            </div>
            <div>
            <Button variant="contained" 
                    size="medium" 
                    color="primary" 
                    onClick = {this.onSubmit}
            >
                Submit
            </Button>
            </div>
        </div>
      );
    }

  }