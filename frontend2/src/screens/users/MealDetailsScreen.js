import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { donateMeal } from '../../actions/userActions';

function MealDetailsScreen(props) {
    const dispatch = useDispatch()
    const restaurantServings = useSelector(state => state.restaurantServings)
    const user = useSelector(state => state.user.userInfo)
    console.log(user)
    const serving = restaurantServings.servings.find(item => item.id == props.match.params.id)
    const [number, setNumber] = React.useState(0);
    const handleChange = (event) => {
        setNumber(event.target.value);
    };

    const donateOrRequestServing = (type) => {
        dispatch(donateMeal(serving.restaurant, serving.id, number, type))
        props.history.push('/')
    }
    const dummyArray = (quantity) => {
        return (<FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label" color='secondary' >Quantity</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={number}
                onChange={handleChange}
            >
                {Array(quantity).fill(null).map((item, index) => {
                    if (index == 0) {
                        return (
                            (
                                <MenuItem disabled value={index}>{index}</MenuItem>
                            )
                        )
                    } else {
                        return (
                            (
                                <MenuItem value={index}>{index}</MenuItem>
                            )
                        )
                    }
                })}

            </Select>
        </FormControl>)

    }

    const useStyles = makeStyles(theme => ({
        dummyImage: {
            height: '45vh',
            width: '25vw',
            minWidth: '430px',
            minHeight: '25vh',
            marginRight: 'auto',
            marginLeft: '50px',
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
            top: '10px',
            marginLeft: '40px'
        },
        btnDiv: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: '50px',
            paddingRight: '50px',
        },
        formControl: {
            minWidth: 120,
            left: '30px',
            bottom: '5px'
        }
    }))


    const classes = useStyles()

    return (
        <Grid container xs={12}>
            <Grid item direction='column' xs={12} md={5} >
                <img src={`http://127.0.0.1:8000${serving?.image}`} alt='image2' className={classes.dummyImage} >
                </img>
            </Grid>
            <Grid item direction='coulmn' xs={12} md={6} >
                <div className={classes.infoDiv} >
                    <h1 className={classes.title} >{serving?.name}</h1>
                    <p className={classes.info} >{serving?.description}</p>
                    <p className={classes.info} >Ingredients : {serving?.ingredients}</p>
                    {user.is_user ? (
                        <div className={classes.btnDiv} >
                            <div style={{ border: ' 0.5px solid lightgrey', padding: '10px', borderRadius: '10px' }} >
                                <p className={classes.info} >Donate : </p>
                                {dummyArray(10)}
                                <Button color='secondary' variant='contained'
                                    onClick={() => donateOrRequestServing('Donation')}
                                    className={classes.btn} >Donate</Button>
                            </div>
                            <div style={{ border: ' 0.5px solid lightgrey', padding: '10px', borderRadius: '10px' }} >
                                <p className={classes.info} >Request : </p>
                                {dummyArray(4)}
                                <Button color='primary' onClick={() => donateOrRequestServing('Request')}
                                    className={classes.btn} variant='contained' >Request a Meal</Button>
                            </div>
                        </div>
                    ) : null}

                </div>
            </Grid>
        </Grid>
    )
}

export default MealDetailsScreen
