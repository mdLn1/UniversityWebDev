import "semantic-ui-css/semantic.min.css";
import React, { Component } from "react"
import "../custom.css";
import axios from "axios";
const defaultVal = { authenticated: false, user: {}, token: "" }

export const MainContext = React.createContext(defaultVal)


// export default function App({ Component, pageProps }) {
//   axios.defaults.headers.post["Content-Type"] = "application/json";
//   return (<MainContext.Provider value={}><Component {...pageProps} /></MainContext.Provider>;
// }
export default class _app extends Component {
  onRedirectCallback = appState => {
    console.log('appState', appState)
    router.push(appState && appState.targetUrl ? appState.targetUrl : '/')
  }
  render() {
    const { Component, pageProps, router } = this.props
    return (
      <React.Fragment>
        <MainContext.Provider value={defaultVal} onRedirectCallback={this.onRedirectCallback}>
          <Component {...pageProps} router={router} />
        </MainContext.Provider>
      </React.Fragment>
    )
  }
}
