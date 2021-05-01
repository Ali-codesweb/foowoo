import { Button, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import apple from '../allImages/apple.png';
import arrow from '../allImages/arrow.png';
import banner from '../allImages/banner.jpg';
import logo from '../allImages/logo.png';
import restaurant from '../allImages/restaurant.png';
import truck from '../allImages/truck.png';
import Box from '../components/Box';
import Footer from '../components/Footer';
import Section from '../components/Section';

function HomeScreen() {
        
    const user = useSelector(state=>state.user.userInfo)
    const dispatch = useDispatch()
    console.log(user)
    const logoutHandler = () => {
        dispatch(logout())
    }

    const useStyles = makeStyles(theme => ({
        button: {
            ...theme.buttonDef,

            marginRight: '20px',
            [theme.breakpoints.down('xs')]: {
                height: '40px',
                fontSize: '12px',
                padding: '3px',
            }
        },
        mainImage: {
            position: 'absolute',
            boxShadow: '0px 0px 100px grey',
            borderBottomLeftRadius: '90px',
            borderBottomRightRadius: '90px',
            width: '98.7vw',
            minHeight: '520px',
            zIndex: '-100',
            [theme.breakpoints.down('xs')]: {
                borderBottomLeftRadius: '50px',
                borderBottomRightRadius: '50px',
            }
        },
        navBar: {
            display: 'flex',
            justifyContent: 'space-between',
            [theme.breakpoints.down('xs')]: {

            }
        },
        navButtons: {
            marginTop: '60px',
            marginRight: '180px',
            display: 'flex'
        },
        mainTitle: {
            ...theme.importantHeader,
            color: theme.palette.common.white,

        },
        ctaBtn: {
            ...theme.buttonDef,
            marginTop: '50px'
        },
        sectionDiv: {
            textAlign: 'center'
        },
        apple: {
            hieght: '302px',
            width: '302px'
        },
        title: {
            ...theme.typography.content,
            fontSize: '59px',

        },
    }))
    const classes = useStyles()
    return (
        <div

        >
            <div className='main' >
                <img src={banner} className={classes.mainImage} alt='' ></img>
                <div className={classes.navBar} >
                    <img src={logo} className='logo' alt='' ></img>
                    {!user ? (
                        <div className={classes.navButtons} >
                            <div
                            ><Button variant='contained' color='primary'
                                className={classes.button} component={Link} to='/rest/login'  >Login as Restaurant</Button></div>
                            <div><Button variant='contained'
                                component={Link} to='/login'
                                color='primary' className={classes.button} >Login as User</Button></div>
                        </div>
                    ) : (
                        <div className={classes.navButtons} >
                            <div><Button variant='contained' color='primary'
                                onClick={logoutHandler}
                                className={classes.button}  >Logout</Button>
                                <Button variant='contained' component={Link}
                                    to={user?.is_user ? '/profile' : '/rest/profile/' + user?.id} color='primary'
                                    className={classes.button}  >Profile</Button>
                            </div>
                        </div>
                    )}

                </div>

                <Grid container xs={12} direction='column' style={{ alignItems: 'center' }} >
                    <Typography variant='h2' className={classes.mainTitle} >Because Everyone </Typography>
                    <Typography variant='h2' className={classes.mainTitle} >Deserves Free</Typography>
                    <Typography variant='h2' className={classes.mainTitle} >Food</Typography>
                    <Button className={classes.ctaBtn} component={Link} to='restaurants' variant='contained' color='primary' >View Restaurants</Button>
                </Grid>
            </div>
            <Section
                title='OUR MOTIVE'
                content='We beleive that food must be free for all, and we see a vision where every individual on earth doesnt sleep a night with hunger.'
            />
            <Section
                title='OUR PLAN'
                content='We plan on taking the food from the ones who have
                 excess and give it to the needy ones.Since we are taking this
                 initiative for public service, there will be no charges from the donator or the receiver !'
            />
            <div style={{
                textAlign: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <img src={apple} alt='apple' className={classes.apple} ></img>
            </div>
            <Container style={{ textAlign: 'center', marginTop: '169px' }} >
                <Typography variant='p' className={classes.title}  >
                    OUR SERVICES
                </Typography>
                <Grid container >
                    <Grid direction='column' xs={12} md={5} lg={3} >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingLeft: '50px'
                        }} >
                            <div>
                                <Box
                                    image={truck}
                                    content='Pick up from the Donator'
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={1} >
                        <div style={{ marginTop: '200px', marginLeft: '40px' }} >
                            <img src={arrow} alt='arrow' ></img>
                        </div>
                    </Grid>
                    <Grid direction='column' xs={12} md={5} lg={3} >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingLeft: '50px'
                        }} >
                            <div>
                                <Box
                                    image={restaurant}
                                    content='Store it in a restaurant'
                                />
                            </div>

                        </div>
                    </Grid>
                    <Grid xs={1} >
                        <div style={{ marginTop: '200px', marginLeft: '40px' }} >
                            <img src={arrow} alt='arrow' ></img>
                        </div>
                    </Grid>
                    <Grid direction='column' xs={12} md={6} lg={4} >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingLeft: '50px'
                        }} >
                            <div>
                                <Box
                                    image={restaurant}
                                    content='Pick up from the Donator'
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    )
}

export default HomeScreen
