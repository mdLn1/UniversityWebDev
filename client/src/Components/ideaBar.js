import React from 'react';
import styles from "./LoginForm.module.css";


export class IdeaBar extends React.Component {
    constructor(props) {
        super(props);
      }


    updateVote = e => {

    }

    processReport = event => {

    }
         


    render() {
      return (
        <div className ={styles.displayDiv}>
            <div className = {styles.ideaTitleContainer}> 
                <label className =  {styles.labelTitle}> <strong> {this.props.title} </strong> </label>
                <label className = {styles.labelDate}> Posted on: {this.props.date}</label>
                <br/>
                <br/>
                <div className = {styles.ideaDescriptionContainer}>
                  <textarea className={styles.descriptionTextArea} readOnly>{this.props.description}</textarea>
                </div>
                <br/>
                <div className ={styles.likes}>
                  <label className ={styles.likesLabel}>Likes: {this.props.likes}</label>
                  <span className ={styles.likeButtons}></span>
                  <button value='upvote' onClick = {this.updateVote} >upvote</button>
                  <span className ={styles.likeButtons}> </span>
                  <button value='downvote' onClick = {this.updateVote}>downvote</button>
                  <label className = {styles.labelAuthor}>Author:{this.props.author}</label>
                  <button value='report' className ={styles.commentButton}><strong> Report </strong></button>
                  <button className ={styles.commentButton}>Check out the comments({this.props.comments})</button>
                </div>
                <div>
                  
                </div>
            </div>
        </div>
      );
    }
}

export default IdeaBar;