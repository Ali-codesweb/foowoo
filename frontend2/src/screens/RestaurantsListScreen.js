import { Button, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { ListRestaurants } from '../actions/RestaurantActions'
import rs_bg from '../allImages/rs_bg.png'
import Restaurant from '../components/Restaurant'
function RestaurantsListScreen() {

    const [restaurantListState, setRestaurantListState] = React.useState([])
    const restaurantList = useSelector(state => state.restaurantList)
    const { restaurants } = restaurantList
    // const pageNumber = restaurants?.next == null ?
    //     null : parseInt(restaurants?.next?.split('=')[1]) - 1
    // const ApiUrl = restaurants?.previous == null ? 'http://127.0.0.1:8000' : `http://127.0.0.1:8000/api/${pageNumber}`
    

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(ListRestaurants())
    }, [dispatch])

    React.useEffect(() => {
        setRestaurantListState(restaurants?.results ? restaurants.results : restaurants)
    })

    console.log(restaurants)
    console.log(restaurantListState)
    const useStyles = makeStyles(theme => ({
        image: {
            position: 'fixed',
            width: '100%',
            zIndex: '-100',
            minHeight: '200px'
        },
        title: {
            position: 'relative',
            ...theme.typography.content,
            textAlign: 'center',
            fontSize: '3rem',
            top: '50px',
            color: 'black',

        }
    }))

    const classes = useStyles()

    return (
        <div>
            <img src={rs_bg} alt='bg-green' className={classes.image} ></img>
            <h1 className={classes.title} >ALL RESTAURANTS LIST</h1>
            <Button color='black' component={Link} to='/' variant='outlined' style={{ marginLeft: '30px' }}  >GO BACK</Button>
            <Grid xs={12} direction='row' container justify='space-evenly'
                style={{
                    marginTop: '70px',
                }}  >

                {restaurantListState?.map(item => (
                    <Grid xs={6} direction='column' justify='space-evenly' spacing={6} md={4} item >
                        <Restaurant
                            name={item.name}
                            address={item.address}
                            city={item.city}
                            state={item.state}
                            pincode={item.pincode}
                            image={item.image}
                            id={item.id}
                        />
                    </Grid>
                ))}

            </Grid>
            <Grid container justify='space-between' >
                <div style={{ paddingLeft: '30px', paddingRight: '30px', marginTop: '30px' }} >
                    {restaurants?.previous ? (
                        <Button color='primary' variant='outlined' onClick={() => {
                            dispatch(ListRestaurants(restaurants?.previous ? restaurants.previous : 'https://foowoo1.herokuapp.com/'))
                        }} >Previous  page</Button>
                    ) : null}
                    {restaurants?.next ? (<Button color='primary' variant='outlined' onClick={() => {
                        // setPagination(prevState => prevState + 1)
                        dispatch(ListRestaurants(restaurants?.next ? restaurants.next : 'https://foowoo1.herokuapp.com/'))
                    }} >Next page</Button>) : null}
                </div>
            </Grid>
        </div>
    )
}
//next button with a state defaulted to 1, then on the button click we send a dispatch with parameter of state+1
//then we get the data of the next page and render it

//initially we dispatch the state with 1 param,then on the click of the button next...we increment the state by 1
//and get next page's data

export default RestaurantsListScreen
