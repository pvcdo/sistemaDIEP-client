import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {api} from '../api/api'

import useFlashMessage from './useFlashMessage'

export default function useAuth() {
  
  const [authenticated, setAuthenticated] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    console.log('executando useeffect de userAuth')
    const token = localStorage.getItem('token')
    if(token){
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }else{
      navigate('/login')
    }
  },[])

  async function register(user: any) {
    let message = "Usuário registrado com sucesso!"
    let type = "success"

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
    const msg = "Usuário deslogado com êxito"
    const type = "success"

    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = null
    navigate('/')


  }

  async function login(user: any){
    let msg = 'Usuário logado com sucesso!'
    let type = 'success'

    try {
      const data = await api.post('/users/login', user).then((response) => {
        return response.data
      })
      await authUser(data)
    } catch (error) {
      console.error("Erro em login " + error)
    }

  }

  async function authUser(data: any){
    setAuthenticated(true)
    localStorage.setItem('token',JSON.stringify(data.token))
    navigate('/')
  }

  return { register, authenticated, logout, login }
}
