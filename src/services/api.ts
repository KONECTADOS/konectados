import axios from "axios";

// export const api = axios.create({
//   params:{
//     token: process.env.TINY_TOKEN,
//     formato: 'json',
//   },
//   baseURL: process.env.TINY_API_URL,
// })

export const apiRoutes = axios.create({
  // baseURL: 'http://localhost:3000/api/auth',
  baseURL: process.env.API_URL,
})