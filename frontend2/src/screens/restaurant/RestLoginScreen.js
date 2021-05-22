import React from 'react'
import { restLogin } from '../../actions/RestaurantActions'
import LoginScreenComp from '../../components/LoginScreenComp'

function RestLoginScreen(props) {
    
    return (
       <LoginScreenComp loginAction={restLogin} >
           
       </LoginScreenComp>
    )
}

export default RestLoginScreen
