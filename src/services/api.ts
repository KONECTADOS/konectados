import axios from "axios";

export const api = axios.create({
  params:{
    token: process.env.TINY_TOKEN,
    formato: 'json',
  },
  baseURL: process.env.TINY_API_URL,
})