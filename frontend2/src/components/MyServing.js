import { Button, Grid, makeStyles, TextareaAutosize, TextField, Switch, colors } from '@material-ui/core'
import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function MyServing({ item, deleteServingHandler }) {
    const user = useSelector(state => state.user.userInfo)
    const [enabled, setEnabled] = React.useState(true)
    const [saveBtn, setSaveBtn] = React.useState(true)
    const [name, setName] = React.useState(item.name)
    const [description, setDescription] = React.useState(item.description)
    const [ingredients, setIngredients] = React.useState(item.ingredients)
    const [quantity, setQuantity] = React.useState(item.quantity)

    const [state, setState] = React.useState({
        checkedA: item.is_vegan,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const onEditClickHandler = () => {
        setEnabled(!enabled)
        setSaveBtn(!saveBtn)
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
        }
    }

    const saveHandler = async () => {
        setEnabled(!enabled)
        setSaveBtn(!saveBtn)
        const { data } = await axios.put('http://127.0.0.1:8000/api/restaurant/my-servings/update/', {
            'serving_id': item.id,
            'name': name,
            'description': description,
            'ingredients': ingredients,
            'quantity': quantity,
            'is_vegan': state.checkedA
        }, config)
    }




    const useStyles = makeStyles(theme => ({
        main: {
            width: '13vw',
            minWidth: '250px',
            borderColor: theme.palette.primary.light,
            borderRadius: '10px',
            border: '3px solid',
            marginTop: '30px',
            backgroundColor: 'white',
            marginRight: 'auto',
            marginLeft: 'auto',
            textAlign: 'center',
            boxShadow: '0px 1px 5px grey',
            paddingBottom: '20px',
            display: 'flex',
            flexDirection: 'column'
        },
        name: {
            ...theme.typography.content,
            fontSize: '2rem',
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '20px'
        },
        image: {
            height: '150px',
            width: '14vw',
            minWidth: '130px',
            backgroundColor: 'grey',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: '10px',
            borderRadius: '5px'
        },
        description: {
            ...theme.typography.title,
            marginTop: '20px',
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        span: {
            fontWeight: '900'
        },
        ing: {
            ...theme.typography.title,
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '20px'
        },
        btn: {
            ...theme.buttonDef,
            marginTop: '20px',
            width: '40%',
            marginLeft: 'auto',
            right: '20px'
        },
        dltbtn: {
            ...theme.buttonDef,
            marginTop: '20px',
            width: '40%',
            marginLeft: 'auto',
            right: '20px',
            backgroundColor: '#DC143C',
            color: 'white'
        },
        is_vegan: {
            ...theme.typography.title
        },
        quantity_tf: {
            width: '20%'
        }
    }))

    const classes = useStyles()

    return (
        <Grid item xs={12} sm={6} md={4} direction='row' className={classes.main} >
            <img src={`http://127.0.0.1:8000${item.image}`}
                alt={item.image} className={classes.image} ></img>
            <TextField className={classes.name} value={name} disabled={enabled} onChange={(e) => setName(e.target.value)} />
            <TextareaAutosize className={classes.description} value={description} disabled={enabled} onChange={(e) => setDescription(e.target.value)} />
            <TextField className={classes.ing} value={ingredients} disabled={enabled} onChange={(e) => setIngredients(e.target.value)} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <p className={classes.is_vegan} >Is Vegan : </p><Switch
                    checked={state.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                    color='primary'
                    disabled={enabled}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <p className={classes.is_vegan} > Quantity :</p>
                <TextField className={classes.quantity_tf} value={quantity} disabled={enabled} onChange={(e) => {
                    setQuantity(e.target.value)
                }
                }
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                {saveBtn ? (<Button variant='outlined' color='primary' onClick={onEditClickHandler}
                    className={classes.btn} >Edit</Button>) : (<Button variant='contained'
                        color='secondary' onClick={saveHandler}
                        className={classes.btn} >Save</Button>)}
                <Button color='thirdary' variant='contained'
                    className={classes.dltbtn} onClick={deleteServingHandler}  >Delete Meal</Button>
            </div>
        </Grid>
    )
}

export default MyServing
