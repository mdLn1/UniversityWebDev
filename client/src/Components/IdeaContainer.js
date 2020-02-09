import Tab from '@material-ui/core/Tab';
import React from 'react';
import styles from "./LoginForm.module.css";
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Axios from "axios";

import { Button } from '@material-ui/core';


export class IdeaContainer extends React.Component {
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
            var http = require("http");

            var options = {
              "method": "POST",
              "hostname": [
                "localhost"
              ],
              "port": "5000",
              "path": [
                "api",
                "ideas",
                ":id"
              ],
              "headers": {
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.20.1",
                "Accept": "*/*",
                "Cache-Control": "no-cache",
                "Postman-Token": "1a4b560d-1525-47bb-a087-0a0532b4dec6,11e01ad8-e8be-4c54-a6b8-33f8a7587923",
                "Host": "localhost:5000",
                "Accept-Encoding": "gzip, deflate",
                "Content-Length": "161",
                "Connection": "keep-alive",
                "cache-control": "no-cache"
              }
            };
            
            var req = http.request(options, function (res) {
              var chunks = [];
            
              res.on("data", function (chunk) {
                chunks.push(chunk);
              });
            
              res.on("end", function () {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
              });
            });
            
            req.write(JSON.stringify({ id: '1',
              description: 'something like this is a desc',
              isAnonymous: 'true',
              categoryId: '1',
              userId: '1',
              title: 'Somett' }));
            req.end();


        }catch (err){
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