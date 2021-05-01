import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React from 'react'
import greenBg from '../allImages/green-bg.png'
import givingHand from '../allImages/givingHand.png'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions';
import { Link } from 'react-router-dom'
import LoginScreenComp from '../components/LoginScreenComp'

function LoginScreen(props) {

    return (
        <LoginScreenComp loginAction={login} >
            <p>Don't have an account ?</p><Link to='signup' >Click here to create one</Link>
        </LoginScreenComp>
    )
}

export default LoginScreen
