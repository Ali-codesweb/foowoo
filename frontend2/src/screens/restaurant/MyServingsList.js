import { Button, Grid, makeStyles } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import MyServing from '../../components/MyServing'

function MyServingsList(props) {

    const [servings, setServings] = React.useState([])

    const URL = 'https://foowoo1.herokuapp.com'
    const user = useSelector(state => state.user.userInfo)
    const myServings = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

        const { data } = await axios.get(`${URL}/api/restaurant/my-servings/`, config)
        setServings(data)
    }

    React.useEffect(() => {
        myServings()
    }, [])



    const useStyles = makeStyles(theme => ({
        title: {
            ...theme.typography.content,
            textAlign: 'center',
            fontSize: '2.5rem',
            marginTop: '1rem',
            marginBottom: '30px'
        },
        btnLeft: {
            poaition: 'relative',
            marginRight: 'auto',
            marginLeft: '20px'
        }

    }))
    const classes = useStyles()



    return (
        <div>
            <h1 className={classes.title} >My servings list</h1>
            <Button className={classes.btnLeft} variant='outlined'
                color='primary' onClick={() => props.history.goBack()} >GO BACK</Button>
            <Grid container justify='center' >
                {servings?.map(item => {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${user.token}`
                        }
                    }
                    const deleteServingHandler = async () => {
                        const { data } = await axios.delete(`https://foowoo1.herokuapp.com/api/restaurant/delete-serving/${item.id}`, config)
                        window.alert(data.message)
                        const newArr = servings.filter(e => e.id != item.id)
                        setServings(newArr)

                    }

                    return (
                        <MyServing item={item} deleteServingHandler={deleteServingHandler} />
                    )
                })}
            </Grid>
        </div>
    )
}

export default MyServingsList
