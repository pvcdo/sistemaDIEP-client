import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:5000/' ,
  // headers: {
  //   'Accept' : '*/*',
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': 'https://sistema-diep-server.vercel.app/',
  //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  //   'Access-Control-Allow-Headers': 'Content-Type'
  // }
})