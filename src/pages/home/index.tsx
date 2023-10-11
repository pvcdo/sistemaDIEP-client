import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import useAuth from "../../hooks/useAuth";

interface IUser {
  name: string,
  email: string,
  _id: string,
  role?: string
}


const Home = () => {

  const [user,setUser] = useState({} as IUser)
  const token = localStorage.getItem('token') || ''

  const {logout, authenticated} = useAuth()
  
  useEffect(()=>{
    try {
      api.get('/users/checkUser',{
        headers:{
          Authorization:`Bearer ${JSON.parse(token)}`
        }
      }).then((response) => {
        console.log("resposta do checkUser")
        setUser(response.data)
      })
    } catch (error) {
      console.error("Erro na página home: " + error)
    }
    
  },[token])

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    authenticated ? 
      <>
        <button onClick={logout}>Sair</button>
        <p>Olá, {user.name}!! Estamos na home</p>
        {/* TO DO - colocar a foto do profissional como um avatar*/}
      </> 
    :
      <>
        <p>Saindo!</p>
        {/* Trocar por um loader */}
      </>
  )
}

export default Home;
