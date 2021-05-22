import { Button, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import givingHand from '../allImages/givingHand.png'
import greenBg from '../allImages/green-bg.png'

function LoginScreenComp(props) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.userInfo)

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
            height: '300px',
            width: '450px',
            backgroundColor: theme.palette.primary.light,
            borderRadius: '10px',
            boxShadow: '0px 8px 0px #333333',
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
        }
    }))

    const submitLoginHandler = (e) => {
        e.preventDefault()
        dispatch(props.loginAction(email, password))
        history.push('/')
    }



    const classes = useStyles()
    return (
        <div className={classes.background} >
            <img src={greenBg} alt='bg-green' className={classes.image} ></img>
            <p className={classes.mainHeading} >WE ARE THANKFUL FOR YOUR CONTRIBUTION</p>
            {user?.error ? (<p>{user.error}</p>) : null}
            <Button component={Link} to='/'
                color='secondary' variant='outlined'
                style={{ marginLeft: '30px' }} >Go Back</Button>
            <Grid direction='row' container xs={12} >
                <Grid item xs={12} md={6} >
                    <div className={classes.centerItem} >
                        <img src={givingHand} alt='givingHand' className={classes.givingHandImage} ></img>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} >
                    <div className={`${classes.loginBackground}`} >
                        <p className={classes.signinText} >SIGN IN</p>
                        <form className={classes.form} onSubmit={submitLoginHandler}>
                            <TextField onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter username or email" value={email}
                                inputProps={{ 'aria-label': 'description' }}
                                className={classes.textField} />
                            <TextField onChange={(e) => setPassword(e.target.value)}
                                value={password} type='password' placeholder="password"
                                inputProps={{ 'aria-label': 'description' }}
                                className={classes.textField} />
                            <div>
                                <Button type='submit' color='secondary' className={classes.button} variant='contained' >Sign in</Button>
                                {props.children}
                            </div>
                        </form>
                    </div>
                </Grid>
            </Grid>

        </div>
    )
}

export default LoginScreenComp
