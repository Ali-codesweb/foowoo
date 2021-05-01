import { makeStyles, Grid, Button } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListRestaurants } from '../actions/RestaurantActions'
import rsd_bg from '../allImages/rsd-bg.png'
import { Link } from 'react-router-dom';

function RestaurantDetails(props) {
    const dispatch = useDispatch()
    const restaurantList = useSelector(state => state.restaurantList)
    const user = JSON.parse(localStorage.getItem('userInfo'))
    const { restaurants } = restaurantList
    const restaurant = restaurants?.results?.find(rest => rest.id == props.match.params.id)
    console.log(JSON.stringify(restaurants))
    //if number <= 0 || number <= 1:
    //  main api
    //if number <=2:
    // next api


    //if 1, then the main api
    React.useEffect(() => {
        if (restaurants.length > 0) {
            return
        } else {
            const number = props.match.params.id / 2
            const roundedNumber = Math.round(props.match.params.id / 2)

            if (number <= 1) {
                dispatch(ListRestaurants())
            }
            else if (number <= roundedNumber) {
                dispatch(ListRestaurants(`http://127.0.0.1:8000/api/?page=${roundedNumber}`))
            }
            console.log('triggered')
        }
    }, [props.match.params.id])

    const useStyles = makeStyles(theme => ({
        image: {
            position: 'fixed',
            width: '100%',
            zIndex: '-100',
            height: '100%'
        },
        dummyImage: {
            height: '45vh',
            width: '25vw',
            minWidth: '230px',
            minHeight: '25vh',
            backgroundColor: 'grey',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: '90px',
            borderRadius: '5px'
        },
        title: {
            ...theme.typography.content,
            color: '#333333',
            textAlign: 'center',
            fontSize: '3.5rem',
            marginBottom: '30px'
        },
        infoDiv: {
            marginTop: '50px',
            marginBottom: '50px'
        },
        info: {
            ...theme.typography.title,
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '30px',
            lineHeight: '52px',

        },
        btn: {
            ...theme.buttonDef,
        },
        btnDiv: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: '30px',
            paddingRight: '30px'
        }
    }))

    const classes = useStyles()
    return (
        <Grid container xs={12}>
            <img src={rsd_bg} className={classes.image} alt='rsd_bg' ></img>
            <Grid item direction='column' xs={12} md={5} >
                <div className={classes.dummyImage} >
                </div>
            </Grid>
            <Grid item direction='coulmn' xs={12} md={6} >
                <div className={classes.infoDiv} >
                    <h1 className={classes.title} >{restaurant?.name}</h1>

                    <p className={classes.info} >{restaurant?.address}, {restaurant?.city},
                    {restaurant?.state} ,{restaurant?.country}, {restaurant?.pincode}</p>

                    <p className={classes.info} >Description Description Description
                    Description Description Description Description
                    Description Description Description Description Description</p>

                    <div className={classes.btnDiv} >
                        <Button component={Link} to='/restaurants' color='primary'
                            className={classes.btn} variant='contained' >GO TO RESTAURANTS PAGE</Button>
                        <Button color='secondary' className={classes.btn} component={Link} to={`/meals/${props.match.params.id}`}
                            variant='contained' >Meals</Button>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default RestaurantDetails

//parameter when mathematically formulated by two it should be the current api from which the parameter id==restaurant id
//when parameter is mathematically formulated by two it should give how many multiples of two are below that parameter number
//when we get that number:
//              if it is 0;then the home api will be called
                // if it is greater than zero;then add 1 and call that api
