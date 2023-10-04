import axios from 'axios'

export const api = axios.create({
  baseURL: "https://sistema-diep-server.vercel.app/" || 'http://localhost:8080/' ,
  headers: {
    'Accept' : '*/*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://sistema-diep-server.vercel.app/',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
})