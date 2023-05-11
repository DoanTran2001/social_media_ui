import axios, { type AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://social-media-api-k9t9.onrender.com/api/',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

const http = new Http().instance

export default http
