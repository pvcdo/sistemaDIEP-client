import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {api} from '../api/api'

import { AxiosError } from 'axios'
import { AlertColor } from '@mui/material'

interface objLogin {
  email: string,
  senha: string
}

export default function useAuth() {
  
  const [authenticated, setAuthenticated] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    console.log('executando useeffect de userAuth')
    const token = localStorage.getItem('token')
    if(token){
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
    if(!token){
      navigate('/login')
    }
    // eslint-disable-next-line
  },[])

  async function register(user: any) {

    try {
      const data = await api.post('/users/register', user)
        .then((response) => {
          return response.data
        })

      await authUser(data)
    } catch (error) {
      console.error("Erro em register " + error)
    }

  }

  function logout(){

    setAuthenticated(false)
    setTimeout(() => {
      localStorage.removeItem('token')
      api.defaults.headers.Authorization = null
      navigate('/login')
    }, 3000); 
    

  }

  async function login(login: objLogin){

    try {
      const obj_token = await api.post('/users/login', {...login})
      authUser(obj_token.data)
      
      return ({msg: 'Login efetuado com sucesso', type_msg: 'success' as AlertColor})
    } catch (e) {
      console.log('erro no bagulho')
      const err = e as AxiosError
      //@ts-ignore
      console.error(err.response?.data.message)
      //@ts-ignore
      const err_msg = err.response?.data.message

      return ({msg: err_msg, type_msg: 'error' as AlertColor})

    }

  }

  async function authUser(data: any){
    setAuthenticated(true)
    localStorage.setItem('token', JSON.stringify(data.token))
    setTimeout(() => {
      navigate('/')
    }, 3000); 
  }

  return { register, authenticated, logout, login }
}
