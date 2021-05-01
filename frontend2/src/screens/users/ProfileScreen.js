import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userProfileUpdate } from '../../actions/userActions'
import FormDiv from '../../components/FormDiv'

function ProfileScreen(props) {
    const [username, setUsername] = React.useState('')
    const [name, setName] = React.useState('')
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const user = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    console.log(user)
    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }
    const nameHandler = (e) => {
        setName(e.target.value)
    }
    const firstNameHandler = (e) => {
        setFirstName(e.target.value)
    }
    const lastNameHandler = (e) => {
        setLastName(e.target.value)
    }
    const data = [
        {
            name: 'Username',
            textFieldDisable: false,
            placeholder: user.username,
            value: username,
            onChange: usernameHandler
        },
        {
            name: 'Name',
            textFieldDisable: false,
            placeholder: user.name,
            value: name,
            onChange: nameHandler
        },
        {
            name: 'First Name',
            textFieldDisable: false,
            placeholder: user.first_name,
            value: firstName,
            onChange: firstNameHandler
        },
        {
            name: 'Last Name',
            textFieldDisable: false,
            placeholder: user.last_name,
            value: lastName,
            onChange: lastNameHandler
        },

    ]

    const updateProfile = () => {
        console.log('user profile update')
        dispatch(userProfileUpdate(username, firstName, lastName))
        props.history.push('/')
    }

    const useStyles = makeStyles(theme => ({
        mainDiv: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
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
        btnser: {
            ...theme.buttonDef,
            marginRight: '20px'
        },
    }))
    const classes = useStyles()
    return (
        <div className={classes.mainDiv} >
            <h1 className={classes.heading} >This is the profile screen</h1>
            <Button className={classes.btnLeft} variant='outlined'
                color='primary' component={Link} to='/'  >GO BACK</Button>
            <h1 >Logged in as {user.name}</h1>
            <div style={{display:'flex'}} >
            <Button color='secondary' variant='contained' component={Link} to='/restaurants'
                className={classes.btnser} >Donate</Button>
            <Button color='secondary' variant='contained' component={Link} to='/my-donations'
                className={classes.btnser} >My Donations</Button>
            <Button color='secondary' variant='contained' component={Link} to='/my-requests'
                className={classes.btnser} >My Requests</Button>
            </div>
            <FormDiv
                data={data}
                actionTaken={updateProfile}
                actionName='Update Profile'
            >
                <Link to='/rest/password-change' style={{ marginTop: '20px', marginBottom: '20px' }} >Change Password</Link>
            </FormDiv>
        </div>
    )
}

export default ProfileScreen
