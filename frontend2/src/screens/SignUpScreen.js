import { Button, Grid, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions'
import greenBg from '../allImages/green-bg.png'

function SignUpScreen(props) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')

    const userSignup = useSelector(state => state.userSignup)
    const dispatch = useDispatch()


    const useStyles = makeStyles(theme => ({
        background: {
            width: '100%',
            height: '105%',

        },
        image: {
            position: 'absolute',
            width: '100%',
            height: '101%',
            zIndex: '-100',
            [theme.breakpoints.down('sm')]: {
                position: 'fixed'
            }
        },
        centerItem: {
            alignItems: 'center',
            display: 'flex',
            [theme.breakpoints.down('xs')]: {
                justifyContent: 'center'
            },
            [theme.breakpoints.down('sm')]: {
                justifyContent: 'center'
            }
        },
        givingHandImage: {
            height: '300px',
            [theme.breakpoints.down('sm')]: {
                display: 'none'
            }
        },
        mainHeading: {
            position: 'relative',
            ...theme.typography.content,
            fontSize: '3rem',
            textAlign: 'center',
            top: '20px',
            marginBottom: '70px',
        },
        loginBackground: {
            height: '420px',
            width: '450px',
            backgroundColor: theme.palette.primary.light,
            borderRadius: '10px',
            boxShadow: '0px 8px 0px #333333',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                marginLeft: '190px',
                marginTop: '20px',
                marginBottom: '20px',
                width: '400px'
            },
            [theme.breakpoints.down('xs')]: {
                marginLeft: '20px',
                marginTop: '20px',
                marginBottom: '20px'
            },

        },
        signinText: {
            ...theme.typography.content,
            color: 'black',
            fontSize: '2.5rem',
            textAlign: 'center',
            paddingTop: '15px'
        },
        textField: {
            backgroundColor: theme.palette.common.white,
            borderRadius: '10px',
            border: 0,
            padding: '5px',
            width: '350px',
            marginTop: '20px',
        },
        form: {
            with: '100%',
            textAlign: 'center',

        },
        button: {
            ...theme.typography.content2,
            position: 'relative',
            right: -130,
            top: 20,
        },
        signupText: {
            ...theme.typography.title,
            color: 'black',
            textDecoration: 'none'
        },
        signupBg: {
            width: '100%',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
        }
    }))

    const submitLoginHandler = (e) => {
        e.preventDefault()
        dispatch(register(email, firstName, lastName, password))
        props.history.push('/signup')
        console.log(userSignup)
        
    }



    const classes = useStyles()
    return (
        <div className={classes.background} >
            <img src={greenBg} alt='bg-green' className={classes.image} ></img>
            <p className={classes.mainHeading} >JOIN HANDS WITH US</p>
            <Button component={Link} to='/login'
                color='secondary' variant='outlined'
                style={{ marginLeft: '30px' }} >Go Back</Button>
            <p className={classes.signupText} >{userSignup?.error ? userSignup?.error : null}</p>
            <Grid direction='row' container xs={12} >
                <Grid item xs={12} >
                    <div className={classes.signupBg} >
                        <div className={`${classes.loginBackground}`} >
                            <p className={classes.signinText} >SIGN UP</p>
                            <form className={classes.form} onSubmit={submitLoginHandler}>
                                <TextField onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email" value={email} inputProps={{ 'aria-label': 'description' }}
                                    type='email' className={classes.textField} />
                                <TextField onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First Name" value={firstName} inputProps={{ 'aria-label': 'description' }}
                                    type='text' className={classes.textField} />
                                <TextField onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name" value={lastName} inputProps={{ 'aria-label': 'description' }}
                                    type='text' className={classes.textField} />
                                <TextField onChange={(e) => setPassword(e.target.value)} value={password}
                                    type='password' placeholder="password" inputProps={{ 'aria-label': 'description' }}
                                    className={classes.textField} />
                                <div>
                                    <Button type='submit' color='secondary' className={classes.button} variant='contained' >Sign Up</Button>
                                    <p className={classes.signupText} >Already have an account ?</p><Link to='login' >Click here to create one</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>

        </div>
    )
}

export default SignUpScreen
