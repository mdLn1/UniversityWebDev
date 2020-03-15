import "semantic-ui-css/semantic.min.css";
import "../custom.css";
import axios from "axios";
export default function App({ Component, pageProps }) {
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.headers.post["Content-Type"] = "application/json";
  return <Component {...pageProps} />;
}
