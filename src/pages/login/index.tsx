import React, {  useState } from "react";
import * as style from './style'

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

import useAuth from "../../hooks/useAuth";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [pass, setPass] = useState('')
  const [email, setEmail] = useState('')

  const [messageOpen, setMessageOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [typeMessage, setTypeMsg] = useState<AlertColor>('error')

  const {login} = useAuth()

  const handleChange = (e: any) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    }
    if (e.target.name === 'pass') {
      setPass(e.target.value)
    }
  }

  const handleSubmit = async () => {

    /* try {
      const obj_token = await api.post('/users/login', { email, senha: pass })
      //console.log(obj_token.data)
      localStorage.setItem('token', JSON.stringify(obj_token.data.token))
    } catch (e) {
      console.log('erro no bagulho')
      const err = e as AxiosError
      //@ts-ignore
      console.error(err.response?.data.message)
      //@ts-ignore
      const err_msg = err.response?.data.message

    } */

    const res_login = await login({email, senha: pass})

    setMessage(res_login.msg)
    setTypeMsg(res_login.type_msg)
    setMessageOpen(true)

  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessageOpen(false);
  };

  return (
    <>
      < Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open = { messageOpen }
        autoHideDuration = {2000}
        onClose={handleClose}
      >
        <Alert severity={typeMessage} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
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
    </>
  )
}

export default Login;