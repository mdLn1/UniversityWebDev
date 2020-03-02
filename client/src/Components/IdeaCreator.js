import React from 'react';
import styles from "./LoginForm.module.css";
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import { Button } from '@material-ui/core';

export class IdeaCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          description: "",
          ideaTitle: "",
          categoryTitle: "",
          isAnonymous: false,
          termsAgreed: false
        }
      }

      ideaTitleChangeHandler = event => {
        this.setState({ ideaTitle: event.target.value});
      };

      descriptionChangeHandler = event => {
        this.setState({ description: event.target.value});
      };

      categoryTitleChangeHandler = event => {
        this.setState({ categoryTitle: event.target.value});
      };
      
      anonymousChangeHandler = event => {
        this.setState({ isAnonymous: event.target.checked});
      };  

      termsAgreedChangeHandler = event => {
        this.setState({ termsAgreed: event.target.checked});
      };
      
      onSubmit = async e => {
            console.log(this.state.description);
            console.log(this.state.ideaTitle);
            console.log("this is submission anonymous "  + this.state.isAnonymous);

            try {
              const config = {
                headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": localStorage.getItem("token")
                }
              };
              const obj = {
                description: this.state.description,
                isAnonymous: this.state.isAnonymous,
                title: this.state.ideaTitle,
                categoryId: this.state.categoryTitle,
                termsAgreed: this.state.termsAgreed
              };
                const res = await axios.post("/api/ideas/", obj, config);
            } catch (err) {
              console.log(err);
            }
      }


    render() {

      return (
        <div className ={styles.ideaDisplayerOuterBox}>
            <span/>
            <span/>
            <div className = {styles.pageTitle}>
              <h1> <b> Submit Your Idea  </b></h1>
            </div>
            <hr/>
            <div>
                <label >Title:</label>
                <TextField
                    id="idea-title"
                    label="Idea Title "
                    variant="filled"
                    onChange={this.ideaTitleChangeHandler}
                />
            </div>
            <div  >
                <label>Category: </label>
                <TextField
                    id="category-title"
                    label="Category Title "
                    variant="filled"
                    onChange={this.categoryTitleChangeHandler}
                />
            </div>
            <div >
                <label >Idea Description:</label>
                <TextField
                    id="standard-multiline-static"
                    label="Description"
                    multiline
                    rows="4"
                    variant = "filled"
                    onChange = {this.descriptionChangeHandler}
                />
            </div>
            <div className={styles.checkboxAnonymousSubmission}>
              <label>Anonymos submission:</label>
              <Checkbox 
                  color="primary"
                  onChange={this.anonymousChangeHandler}
                  defaultChecked = {false}
              >
              </Checkbox>
            </div>

            <div className={styles.checkboxTermsAgreedSubmission}>
              <label>Terms and Conditions:</label>
              <Checkbox 
                  color="primary"
                  onChange = {this.termsAgreedChangeHandler}
                  defaultChecked = {false}
                  >
              </Checkbox>
            </div>

            <div className={styles.submissionButton}>
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
