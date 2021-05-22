import React from 'react'
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions'
import LoginScreenComp from '../components/LoginScreenComp'

function LoginScreen(props) {

    return (
        <LoginScreenComp loginAction={login} >
            <p>Don't have an account ?</p><Link to='signup' >Click here to create one</Link>
        </LoginScreenComp>
    )
}

export default LoginScreen
