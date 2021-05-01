import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React from 'react'
import greenBg from '../../allImages/green-bg.png'
import givingHand from '../../allImages/givingHand.png'
import { useDispatch, useSelector } from 'react-redux'
import { restLogin } from '../../actions/RestaurantActions';
import { Link } from 'react-router-dom'
import LoginScreenComp from '../../components/LoginScreenComp'

function RestLoginScreen(props) {
    
    return (
       <LoginScreenComp loginAction={restLogin} >
           
       </LoginScreenComp>
    )
}

export default RestLoginScreen
