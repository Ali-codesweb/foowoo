import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Button, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { RestaurantServings } from '../../actions/RestaurantActions';
function MealsScreen(props) {
    const dispatch = useDispatch()
    const restaurantServings = useSelector(state => state.restaurantServings)
    console.log(restaurantServings.servings)

    const { servings } = restaurantServings

    React.useEffect(() => {
        dispatch(RestaurantServings(props.match.params.id))
    }, [dispatch])

    const useStyles = makeStyles(theme => ({
        title: {
            ...theme.typography.content,
            textAlign: 'center',
            fontSize: '3rem'

        },
        main: {
            width: '13vw',
            minWidth: '180px',
            borderColor: theme.palette.primary.light,
            borderRadius: '10px',
            border: '3px solid',
            marginTop: '30px',
            backgroundColor: 'white',
            marginRight: 'auto',
            marginLeft: 'auto',
            textAlign: 'center',
            boxShadow: '0px 5px 5px grey',
            height: '300px',
        },
        image: {
            height: '150px',
            width: '11vw',
            minWidth: '130px',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: '10px',
            borderRadius: '5px'
        },
        name: {
            ...theme.typography.title,
            fontSize: '2.5rem',
            marginBottom: '20px'
        }
    }))
    const classes = useStyles()
    return (
        <div>
            <h1 className={classes.title} >Servings of this restaurant</h1>
            <Grid container xs={12} >
                {servings?.map((item) => {
                    return (
                        <Grid item xs={12} sm={4} className={classes.main}>
                            <img src={`http://127.0.0.1:8000${item.image}`} alt='image2'
                                className={classes.image} ></img>
                            <p className={classes.name} >{item.name}</p>
                            <Button variant='contained' component={Link} to={`/meal-detail/${item.id}`}
                                color='secondary' >Details</Button>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default MealsScreen