import React from 'react';
import styles from "./LoginForm.module.css";


export class IdeaBar extends React.Component {
    constructor(props) {
        super(props);
        
      }
         


    render() {
      return (
        <div className ={styles.displayDiv}>
            <div> 
                <label className =  {styles.labelTitle}> {this.props.title} </label>

            </div>
        </div>
      );
    }
}

export default IdeaBar;