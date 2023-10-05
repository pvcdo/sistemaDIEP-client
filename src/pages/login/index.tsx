import React, { useContext, useEffect, useState } from "react";
import { api } from "../../api/api";
import * as style from './style'
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../../hooks/useFlashMessage";
import { Context } from "../../context/UserContext";
import Snackbar from "@mui/material/Snackbar";

const Login = () => {
  const [pass, setPass] = useState('')
  const [email, setEmail] = useState('')
  const [logado, setLogado] = useState(false)

  const [token] = useState(localStorage.getItem('token') || '')

  //const {login} = useContext(Context)

  useEffect(() => {

  }, [token])

  const navigate = useNavigate()

  const handleChange = (e: any) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    }
    if (e.target.name === 'pass') {
      setPass(e.target.value)
    }
  }

  const handleSubmit = async () => {

    try {
      const obj_token = await api.post('/users/login', { email, senha: pass })
      console.log(obj_token.data)
      localStorage.setItem('item', obj_token.data.token)
    } catch (e) {
      console.log('erro no bagulho')
      console.error(e)

        
      }

  }

  return (
    <>
      {/* < Snackbar
        open = { open }
        autoHideDuration = { 6000}
        onClose = { handleClose }
        message = "Note archived"
        action = { action }
      /> */}
      <style.Limiter>
        <style.FormLogin>
          <style.Title>
            {/*aqui virá um ícone*/}
          </style.Title>

          <style.Title>
            Login
          </style.Title>

          <style.Wrapper>
            <input onChange={handleChange} type='email' name="email" placeholder="E-mail" />

          </style.Wrapper>

          <style.Wrapper>
            <input onChange={handleChange} type="password" name="pass" placeholder="Password" />
          </style.Wrapper>

          <style.ContainerButton>
            <style.ButtonForm onClick={handleSubmit}>
              Logar
            </style.ButtonForm>
          </style.ContainerButton>
        </style.FormLogin>
      </style.Limiter>
      {logado && <p>Usuário logado</p>}
    </>
  )
}

export default Login;