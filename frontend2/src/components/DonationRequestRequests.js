import { Button, Grid, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CustomContainer from './CustomContainer'

function DonationRequestRequests({ type }) {
    const user = useSelector(state => state.user.userInfo)
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
        },
        params: {
            'type': type
        }

    }
    const [requests, setRequests] = React.useState([])
    const myDonationRequests = async () => {
        const { data } = await axios.get('https://foowoo1.herokuapp.com/api/restaurant/donation-or-request-requests/', config)
        setRequests(data)
    }

    React.useEffect(() => {
        myDonationRequests()
    }, [])

    const useStyles = makeStyles(theme => ({
        img: {
            width: '16vw',
            minWidth: '180px',
            borderRadius: '10px',
        },
        container: {
            alignItems: 'center',
        },
        username: {
            ...theme.typography.title,
        },
        title: {
            ...theme.typography.content,
            fontSize: '2.5rem',
            marginTop: '20px'
        }
    }))
    const classes = useStyles()
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        }} >
            <h1 className={classes.title} >{type} Requests</h1>
            <Button color='secondary' variant='contained'
                style={{ position: 'absolute', left: '50px', top: '50px' }}
                component={Link} to={'/rest/profile/' + user.id}
            >Back</Button>
            {requests.length <= 0 ? (
                <h1>No {type} to show</h1>
            ) :
                requests.map((item, index) => {
                    const acceptDeclineHandler = async (command) => {
                        const { data } = await axios.post('https://foowoo1.herokuapp.com/api/restaurant/accept-decline-donation-requests/', {
                            'id': item.id,
                            'serving_id': item.serving_id,
                            'quantity': item.quantity,
                            'message': command,

                        }, config)
                        console.log(data)
                        const newArr = requests.filter(e => e.id != item.id)
                        setRequests(newArr)
                    }
                    return (
                        <CustomContainer style={{
                            width: '70%',
                            paddingTop: '20px',
                            paddingBottom: '20px',
                        }} >
                            <Grid container className={classes.container} >
                                <Grid item xs={12} md={3} >
                                    <IconButton>
                                        <img src={item.image} alt='lll' className={classes.img}  ></img>
                                    </IconButton>
                                </Grid>
                                <Grid item justify='center' alignItems='center' xs={12} md={2} >
                                    <p className={classes.username} >{item.serving}</p>
                                </Grid>
                                <Grid item justify='center' alignItems='center' xs={12} md={2} >
                                    <p className={classes.username} >{item.username}</p>
                                </Grid>
                                <Grid item justify='center' alignItems='center' xs={12} md={2} >
                                    <p className={classes.username} >{item.quantity}</p>
                                </Grid>
                                <Grid item justify='space-between' alignItems='center' xs={12} md={3} >
                                    <Button color='secondary' variant='outlined'
                                        onClick={() => acceptDeclineHandler('accept')}
                                    >Accept</Button>
                                    <Button color='primary' variant='outlined'
                                        onClick={() => acceptDeclineHandler('decline')}
                                    >Decline</Button>
                                </Grid>
                            </Grid>
                        </CustomContainer>
                    )
                }

                )}
        </div>
    )
}

export default DonationRequestRequests
