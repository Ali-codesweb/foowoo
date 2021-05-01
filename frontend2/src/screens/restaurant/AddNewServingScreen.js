import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import FormDiv from '../../components/FormDiv'

function AddNewServingScreen(props) {
    // Name,description,ingredients,image,quantity,is_vegan
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [ingredients, setIngredients] = React.useState('')
    const [image, setImage] = React.useState('')
    const [quantity, setQuantity] = React.useState('')
    const [isVegan, setIsVegan] = React.useState(false)

    const user = useSelector(state => state.user.userInfo)

    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const onChangeIngredients = (e) => {
        setIngredients(e.target.value)
    }
    const onChangeImage = (e) => {
        setImage(e.target.value)
    }
    const onChangeQuantity = (e) => {
        setQuantity(e.target.value)
    }
    const onChangeIsVegan = (e) => {
        setIsVegan(!isVegan)
    }

    const createServing = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = axios.post('http://127.0.0.1:8000/api/restaurant/create-serving/', {
            name,
            description,
            ingredients,
            image,
            quantity,
            is_vegan: isVegan
        }, config)
        window.alert('You have successfullly craeted your serving')
        props.history.push('/rest/my-servings')
    }


    const useStyles = makeStyles(theme => ({
        title: {
            ...theme.typography.content,
            textAlign: 'center',
            fontSize: '2.5rem',
            marginTop: '20px'
        },
    }))
    const classes = useStyles()
    const data = [{
        name: 'Name',
        placeholder: '',
        value: name,
        onChange: onChangeName
    },
    {
        name: 'Description',
        placeholder: '',
        value: description,
        onChange: onChangeDescription
    },
    {
        name: 'Ingredients',
        placeholder: '',
        value: ingredients,
        onChange: onChangeIngredients
    },
    {
        name: 'Quantity',
        placeholder: '',
        value: quantity,
        onChange: onChangeQuantity,
        type: 'number',
    },
    {
        name: 'Is Vegan',
        placeholder: '',
        value: isVegan,
        onChange: onChangeIsVegan,
        radio: 'radio'
    },
    {
        name: 'Image',
        placeholder: '',
        value: image,
        onChange: onChangeImage,
        type: 'file'
    },
    ]

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <p className={classes.title} >Add new Serving</p>

            <FormDiv
                data={data}
                actionName='Create Serving'
                actionTaken={createServing}
            >
            </FormDiv>
        </div>
    )
}

export default AddNewServingScreen
