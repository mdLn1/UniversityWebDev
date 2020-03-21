import "semantic-ui-css/semantic.min.css";
import React, { Component } from "react";
import axios from "axios";
import "../custom.css";
import { AuthContext } from "../context/AuthenticationContext";
import { Container } from "semantic-ui-react";
import Navbar from "../components/Navbar";
axios.defaults.baseURL = "http://localhost:3000/";

export default class _app extends Component {
  state = {
    user: null,
    authenticated: false,
    token: "",
    loginUser: (user, token) => {
      this.setState({ authenticated: true, user: user, token: token });
    },
    logoutUser: () => {
      this.setState({ authenticated: false, user: null, token: "" });
    }
  };

  async componentDidMount() {
    if (typeof Storage !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        const config = { headers: { "x-auth-token": token } };
        try {
          const res = await axios.get("http://localhost:3000/api/auth/authenticate", config);
          axios.defaults.headers.common["x-auth-token"] = token;
          this.setState({
            user: res.data.user,
            authenticated: true,
            token: token
          });
        } catch (err) {
          if (err.response) {
            console.log(err.response.data);
          } else {
            console.log(err);
          }
        }
      }
    }
  }

  render() {
    const { Component, pageProps, router } = this.props;
    const { user, authenticated } = this.state;
    return (
      <React.Fragment>
        <AuthContext.Provider value={this.state}>
          <Container>
            <Navbar
              role={user?.role ? user.role : ""}
              name={user?.name ? user.name : ""}
              authenticated={authenticated}
            />
            <Component {...pageProps} router={router} />
          </Container>
        </AuthContext.Provider>
      </React.Fragment>
    );
  }
}
