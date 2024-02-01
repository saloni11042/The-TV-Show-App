import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.tvmaze.com/shows",
});

export default instance;
