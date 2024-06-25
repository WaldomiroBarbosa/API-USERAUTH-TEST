import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Register() 
{
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})

    const validateForm = () => 
    {
        const newErrors = {}

        if (!username) newErrors.username = "Nome de usuário é obrigatório"
        
        if (!email) newErrors.email = "E-mail é obrigatório"
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "E-mail inválido"
        
        if (!password) newErrors.password = "Senha é obrigatória"
        else if (password.length < 6) newErrors.password = "Senha deve ter pelo menos 6 caracteres"

        return newErrors
    }

    const registerUser = (e) => 
    {
        e.preventDefault()

        const formErrors = validateForm()
        if (Object.keys(formErrors).length > 0) 
        {
            setErrors(formErrors)
            return
        }

        Axios.post('http://localhost:3001/register', {
            username: username,
            email: email,
            password: password
        })
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.error("There was an error registering the user!", error)
        })
    }

    return (
        <div className="auth-form-container">
            <form className="user_reg_form" onSubmit={ registerUser }>

                <h1 className="title">Registrar-se</h1>
                <div className="form_row">

                    <label htmlFor="username">
                        <div>Nome de usuário:</div>
                    </label>
                    <input
                        type = "text" 
                        value = { username } 
                        name ="username"
                        onChange = {e => setUsername(e.target.value)} 
                    />

                    <label htmlFor="email">
                        <div>E-Mail:</div>
                    </label>
                    <input
                        type = "text" 
                        value = { email } 
                        name ="email"
                       onChange = {e => setEmail(e.target.value)} 
                    />

                    <label htmlFor="password">
                        <div>Senha:</div>
                    </label>
                        <input 
                        type = "password"
                        value = { password } 
                        name = "password" 
                        onChange = {e => setPassword(e.target.value)}
                        />

                </div>
                <button className="reg_user" type="submit">Registrar</button>
            </form>
        
            <div>
                <label htmlFor="create_user">Já tem cadastro?</label>
                <Link to="/login" className="link-btn">
                    <button className="create_user">Logar</button>
                </Link>
            </div>
        </div>
    )
}

export default Register