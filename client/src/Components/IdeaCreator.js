import React from 'react';
import styles from "./LoginForm.module.css";
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
            this.setState({description: arrayOfContents.description});
            this.setState({ideaTitle: arrayOfContents.Title});
            this.setState({categoryTitle: arrayOfContents.category});
            console.log(res.data) //-> use this to know the parameters we need to populate the component 
            console.log(this.state.id);
        }catch (err){
            console.log(err);
        }
      }


    render() {

      return (
        <div className ={styles.ideaDisplayerOuterBox}>
            <span/>
            <span/>
            <h1> <b> Submit Your Idea  </b></h1>
            <div className = {styles.textfieldTitle}>
                <label className ={styles.labelCreator}>Title:</label>
                <TextField
                    id="idea-title"
                    label="Idea Title "
                    variant="filled"
                    onChange={this.ideaTitleChangeHandler}
                />
            </div>
            <div className = {styles.categoryTitle}>
                <label className = {styles.labelCreator}>Category: </label>
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
                    variant = "filled"
                    onChange = {this.descriptionChangeHandler}
                />
            </div>
            <div className={styles.checkboxAnonymousSubmission}>
              <label>Anonymos submission:</label>
              <Checkbox></Checkbox>
            </div>
            <Button variant="contained" 
                    size="medium" 
                    color="primary" 
                    onClick = {this.onSubmit}

            >
                Submit 
            </Button>
        </div>
      );
    }

  }
