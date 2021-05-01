import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CustomContainer from '../../components/CustomContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

function DonatorsList(props) {
    const user = useSelector(state => state.user.userInfo)
    const [donators, setDonators] = React.useState([])
    const [newdonators, setnewDonators] = React.useState([])
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
        }
    }
    async function donatorsListHandler(command) {
        const { data } = await axios.get('http://127.0.0.1:8000/api/restaurant/donators-list/', config)
        console.log(data)
        setDonators(data)
    }
    React.useEffect(() => {
        donatorsListHandler()
    }, [])

    const useStyles = makeStyles(theme => ({
        text: {
            ...theme.typography.title,
            flex: '0.35',
            fontSize: '1.3rem'
        },
        container: {
            width: '80%'
        },
        title: {
            ...theme.typography.content,
            fontSize: '2.5rem',
            textAlign: 'center'
        },
        btnLeft: {
            poaition: 'relative',
            marginRight: 'auto',
            marginLeft: '20px'
        }
    }))


    const classes = useStyles()

    for (var i in donators) {
        if (newdonators?.length >= 1) {
            for (var j in newdonators) {
                if (newdonators[j]?.username == donators[i]?.username) {
                    newdonators[j].quantity += donators[i].quantity
                } else {
                    newdonators.push(donators[i])
                }
            }
        } else {
            newdonators?.push(donators[i])
        }
    }
    // component={Link} to={`profile/${user?.id}`}
    return (
        <div>
            <h1 className={classes.title} >All DONATORS</h1>
            <Button className={classes.btnLeft} variant='outlined'
                color='primary'  onClick={()=>props.history.goBack()} >GO BACK</Button>
            {newdonators.length <= 0 ? (<h1>No donators</h1>) : newdonators?.map(item => {
                return (
                    <Grid container xs={12} justify='center' >
                        <CustomContainer style={{
                            width: '79vw',
                            paddingTop: '20px',
                            paddingBottom: '20px',
                        }} >
                            <div style={{
                                display: 'flex',
                                width: '80%',
                                alignItems: 'center'
                            }} >
                                <div style={{ flex: '0.3' }} >
                                    <FontAwesomeIcon icon={["fas", "coffee"]} />
                                </div>
                                <p className={classes.text} >{item.username}</p>
                                <p className={classes.text} >{item.quantity}</p>
                            </div>

                        </CustomContainer>
                    </Grid>
                )

            })}

        </div>
    )
}

export default DonatorsList
