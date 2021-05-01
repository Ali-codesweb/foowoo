import { Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { myDonationOrRequestRequests } from '../actions/userActions'
import CustomContainer from '../components/CustomContainer'

function UserDonationRequestScreenComp(props) {
    const dispatch = useDispatch()
    const userDonationList = useSelector(state => state.userDonations)
    React.useEffect(() => {
        dispatch(myDonationOrRequestRequests(props.type))
    }, [])
    console.log(userDonationList.donations)

    const useStyles = makeStyles(theme => ({
        heading: {
            ...theme.typography.content,
            fontSize: '2.5rem',
            textAlign: 'center'
        },
        btnLeft: {
            position: 'relative',
            marginRight: 'auto',
            marginLeft: '20px'
        },
    }))
    const classes = useStyles()
    return (
        <div>
            <h1 className={classes.heading}>
                My {props.type}
            </h1>
            <Button className={classes.btnLeft} variant='outlined'
                color='primary' component={Link} to='/profile'  >GO BACK</Button>
            {userDonationList?.donations?.map(item => {
                return (
                    <div style={{ width: '80%', marginRight: 'auto', marginLeft: 'auto' }} >
                        <CustomContainer>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '10vw', paddingRight: '10vw', paddingTop: '20px', paddingBottom: '20px' }} >
                                <Typography variant='h6' noWrap >{item.serving}</Typography>
                                <Typography variant='h6' noWrap >{item.quantity}</Typography>
                                <Typography variant='h6' noWrap >{item.restaurant}</Typography>
                            </div>
                        </CustomContainer>
                    </div>
                )
            })}
        </div>
    )
}

export default UserDonationRequestScreenComp
