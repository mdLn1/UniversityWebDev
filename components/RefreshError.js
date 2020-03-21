import React, { Component } from 'react'
import { Message } from "semantic-ui-react";
import Link from "next/link"

class RefreshError extends Component {
    onRefresh = () => {
        window.location.reload();
    }
    render() {
        return (
            <Message negative>
                <Message.Header>
                    Sorry the connection to the server was interrupted
            </Message.Header>
                <p>Request failed</p>
                <p>Would you like to <span style={{ color: "blue", cursor: "pointer" }} onClick={this.onRefresh}>refresh</span> this page?</p>
            </Message>
        )
    }
}
RefreshError.defaultProps = {
    pathname: "You-Forgot-The-Path"
}
export default RefreshError;