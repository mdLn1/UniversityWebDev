import axios from "axios";
import Router from "next/router";
import { Cookies } from "react-cookie";
// set up cookies
const cookies = new Cookies();
const serverUrl = "http://localhost:3000";

export async function handleAuthSSR(ctx) {
  let token = null;

  // if context has request info aka Server Side
  if (ctx.req) {
    // ugly way to get cookie value from a string of values
    // good enough for demostration
    try {
      token = ctx.req.headers.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    // we dont have request info aka Client Side
    token = cookies.get("token");
  }

  try {
    const response = await axios.get("http://localhost:3000/api/authenticated", {
      headers: { "x-auth-token": token }
    });
    if (response.data.loginSucceeded !== true) {
      Router.push("/login");
    }
  } catch (err) {
    // in case of error
    if (err.response)
      console.log(err.response.data.msg);
    console.log("redirecting back to main page");
    // redirect to login
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: "/login"
      });
      ctx.res.end();
    } else {
      Router.push("/login");
    }
  }
}
