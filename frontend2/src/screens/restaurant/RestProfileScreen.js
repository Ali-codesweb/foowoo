import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { restProfile, restProfileUpdate } from '../../actions/RestaurantActions';
import FormDiv from '../../components/FormDiv';
function RestProfileScreen(props) {
    const details = useSelector(state => state?.restaurantDetails?.details)

    const [textFieldDisable, setTextFieldDisable] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [restaurantName, setRestaurantName] = React.useState('')
    const [country, setCountry] = React.useState('')
    const [city, setCity] = React.useState('')
    const [state, setState] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [pincode, setPincode] = React.useState(details?.pincode)

    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }
    const restaurantNameHandler = (e) => {
        setRestaurantName(e.target.value)
    }
    const countryHandler = (e) => {
        setCountry(e.target.value)
    }
    const cityHandler = (e) => {
        setCity(e.target.value)
    }
    const stateHandler = (e) => {
        setState(e.target.value)
    }
    const addressHandler = (e) => {
        setAddress(e.target.value)
    }
    const pincodeHandler = (e) => {
        setPincode(e.target.value)
    }
    const dispatch = useDispatch()

    const user = useSelector(state => state.user.userInfo)

    React.useEffect(() => {
        dispatch(restProfile())
        if (props.match.params.id != user.id) {
            props.history.push('/rest/profile/' + user.id)
        }
    }, [])

    const updateProfile = () => {
        dispatch(restProfileUpdate(username, restaurantName, country, city, state, address, pincode))
        dispatch(restProfile())
    }

    const useStyles = makeStyles(theme => ({
        heading: {
            ...theme.typography.content,
            fontSize: '2.5rem',
            textAlign: 'center'
        },
        btnser: {
            ...theme.buttonDef,
            marginLeft: 'auto',
            marginRight: '20px'
        },
        btnLeft: {
            poaition: 'relative',
            marginRight: 'auto',
            marginLeft: '20px'
        },
        title: {
            ...theme.typography.content,
            textAlign: 'center',
            fontSize: '2.5rem',
            marginTop: '20px'
        },
    }))

    const data = [
        {
            name: 'Username',
            textFieldDisable: textFieldDisable,
            placeholder: user.name,
            value: username,
            onChange: usernameHandler
        },
        {
            name: 'Name',
            textFieldDisable: textFieldDisable,
            placeholder: details?.name,
            value: restaurantName,
            onChange: restaurantNameHandler
        },
        {
            name: 'Address',
            textFieldDisable: textFieldDisable,
            placeholder: details?.address,
            value: address,
            onChange: addressHandler
        },
        {
            name: 'City',
            textFieldDisable: textFieldDisable,
            placeholder: details?.city,
            value: city,
            onChange: cityHandler
        },
        {
            name: 'Country',
            textFieldDisable: textFieldDisable,
            placeholder: details?.country,
            value: country,
            onChange: countryHandler
        },
        {
            name: 'State',
            textFieldDisable: textFieldDisable,
            placeholder: details?.state,
            value: state,
            onChange: stateHandler
        },
        {
            name: 'Pincode',
            textFieldDisable: textFieldDisable,
            placeholder: details?.pincode,
            value: pincode,
            onChange: pincodeHandler
        }
    ]

    const classes = useStyles()
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }} >
            <h1 className={classes.heading} >My Profile</h1>
            <Button className={classes.btnLeft} variant='outlined'
                color='primary' component={Link} to='/'  >GO BACK</Button>
                <h1 >Logged in as {user.name}</h1>
            <div style={{ display: 'flex', marginTop: '20px' }} >
                <Button color='secondary' variant='contained' component={Link} to='/rest/donation-requests'
                    className={classes.btnser} >Donation Requests</Button>
                <Button color='secondary' variant='contained' component={Link} to='/rest/donators-list'
                    className={classes.btnser} >All Donators</Button>
                <Button color='secondary' variant='contained' component={Link} to='/rest/my-servings'
                    className={classes.btnser} >My servings</Button>
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }} >
                <Button color='secondary' variant='contained' component={Link} to='/rest/add-new-serving'
                    className={classes.btnser} >Add New Serving</Button>
                <Button color='secondary' variant='contained' component={Link} to='/rest/meal-requests'
                    className={classes.btnser} >Meal Requests</Button>
            </div>
            <FormDiv
                data={data}
                actionTaken={updateProfile}
                actionName='Update Profile'
            >
                <Link to='/rest/password-change' style={{ marginTop: '20px',marginBottom:'20px' }} >Change Password</Link>
            </FormDiv>


        </div>
    )
}

export default RestProfileScreen
