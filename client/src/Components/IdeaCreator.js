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
          id: 11
        }
        
      }

      ideaTitleChangeHandler = e => {
        this.setState({ ideaTitle: this.state.ideaTitle });
      };

      descriptionChangeHandler = e => {
        this.setState({ description: this.state.description });
      };

      categoryTitleChangeHandler = e => {
        this.setState({ categoryTitle: this.state.categoryTitle });
      };


            
      onSubmit = async e => {
        try {
            const res = await axios.get("/api/ideas/" + this.state.id);
            const arrayOfContents = res.data[0];
            console.log(arrayOfContents)
            this.setState({description: arrayOfContents.description});
            this.setState({ideaTitle: arrayOfContents.Title});
            this.setState({categoryTitle: arrayOfContents.category});

          }catch (err){
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
                  color="primary">
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
