import React from 'react';
import styles from "./LoginForm.module.css";
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios";
import { Button } from '@material-ui/core';

export class IdeaDisplayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 11
        }
        
      }
            
      onSubmit = async e => {
        try {
            const res = await axios.get("/api/ideas/" + this.state.value);
            console.log(res);
        }catch (err){
            console.log(err);
        }
      }


    render() {

      return (
        <div className ={styles.ideaDisplayerOuterBox}>
            <span/>
            <span/>
            <h1> <b> IDEA DISPLAYER  </b></h1>
            <div className = {styles.ideaTitle}>
                <label className ={styles.titleLabel}>Title:</label>
                <TextField
                    id="idea-title"
                    label="Idea Title "
                    variant="filled"
                    onChange={this.ideaTitleChangeHandler}
                    InputProps={{
                      readOnly: true,
                    }}
                />
            </div>
            <div className = {styles.categoryTitle}>
                <label>Category: </label>
                <TextField
                    id="category-title"
                    label="Category Title "
                    variant="filled"
                    onChange={this.categoryTitleChangeHandler}
                    InputProps={{
                      readOnly: true,
                    }}
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
                    InputProps={{
                      readOnly: true,
                    }}
                />
            </div>
            <div>
            <Button variant="contained" 
                    size="medium" 
                    color="primary" 
                    onClick = {this.onSubmit}
            >
                Retrieve 
            </Button>
            </div>
        </div>
      );
    }

  }