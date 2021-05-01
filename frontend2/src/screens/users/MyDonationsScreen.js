import { Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { myDonationOrRequestRequests } from '../../actions/userActions'
import CustomContainer from '../../components/CustomContainer'
import UserDonationRequestScreenComp from '../../components/UserDonationRequestScreenComp'

function MyDonationsScreen() {

   
    return (
        <UserDonationRequestScreenComp
            type='Donation'
        />
    )
}

export default MyDonationsScreen
