import axios from "axios";

export default axios.create({
  baseURL: "https://multi-factor-authentication-d9gn.vercel.app/api",
  // headers: {
  //   "Content-type": "application/json",
  // },
});
