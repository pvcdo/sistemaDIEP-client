import React, { useState } from "react";
import { api } from "../../api/api";
import * as style from './style'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [pass, setPass] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    const handleChange = (e: any) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
        if(e.target.name === 'pass'){
            setPass(e.target.value)
        }
    }

    const handleSubmit = async () => {

        console.log("email:" + email)
        console.log("pass:" + pass)

        try {
            const obj_token = await api.post('/users/login',{email,senha: pass})
            console.log(obj_token)
        } catch (e) {
            console.error(e)
        }
        
    }

    return (
        <style.Limiter>
            <style.FormLogin>
                <style.Title>
                    {/*aqui virá um ícone*/}
                </style.Title>

                <style.Title>
                    Registro de usuário
                </style.Title>

                <style.Wrapper>
                    <input onChange={handleChange} type='email' name="email" placeholder="E-mail" />

                </style.Wrapper>

                <style.Wrapper>
                    <input onChange={handleChange} type="password" name="pass" placeholder="Password" />
                </style.Wrapper>

                <style.ContainerButton>
                    <style.ButtonForm onClick={handleSubmit}>
                        Registre
                    </style.ButtonForm>
                </style.ContainerButton>
            </style.FormLogin>
        </style.Limiter>
    )
}

export default Login;