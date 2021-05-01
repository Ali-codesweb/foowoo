import axios from 'axios'
import {
    RESTAURANT_LIST_FAIL,
    RESTAURANT_LIST_REQUEST,
    RESTAURANT_LIST_SUCCESS,


    RESTAURANT_SERVINGS_FAIL, RESTAURANT_SERVINGS_REQUEST,

    RESTAURANT_SERVINGS_SUCCESS,

    RESTAURANT_PROFILE_SUCCESS,
    RESTAURANT_PROFILE_REQUEST,
    RESTAURANT_PROFILE_FAIL,

    RESTAURANT_DETAILS_REQUEST,
    RESTAURANT_DETAILS_SUCCESS,
    RESTAURANT_DETAILS_FAIL
} from '../constants/RestaurantConstants'
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS
} from "../constants/userConstants"




const URL = 'http://127.0.0.1:8000'
const user = JSON.parse(localStorage.getItem('userInfo'))

export const ListRestaurants = (url = URL + '/api/') => async (dispatch) => {
    try {
        dispatch({
            type: RESTAURANT_LIST_REQUEST
        })
        const { data } = await axios.get(url)
        dispatch({
            type: RESTAURANT_LIST_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: RESTAURANT_LIST_FAIL,
            payload: err.message
        })

    }
}

export const RestaurantServings = (id) => async (dispatch) => {
    try {
        dispatch({
            type: RESTAURANT_SERVINGS_REQUEST
        })
        
        const { data } = await axios.get(`${URL}/api/restaurant/restaurant-servings/${id}`)

        dispatch({
            type: RESTAURANT_SERVINGS_SUCCESS,
            payload: data
        })
    }
    catch (err) {
        dispatch({
            type: RESTAURANT_SERVINGS_FAIL,
            payload: err.message
        })
    }
}

export const restLogin = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const { data } = await axios.post(URL + '/api/user/login/', {
            'username': email,
            'password': password,
            config
        })
        if (!data.is_user) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
            window.alert('You have successfully logged in.')
        } else {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: 'You are registered as user. Please login as a User'
            })
            window.alert('You are registered as User. Please login as a User')
        }



    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: 'Invalid Credentials, please enter corrent email and password'
        })
        window.alert('Invalid Credentials, please login through correct username and password ')
    }
}

export const restProfile = () => async (dispatch) => {
    try {
        dispatch({
            type: RESTAURANT_DETAILS_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`${URL}/api/restaurant/restaurant-details/`, config)
        dispatch({
            type: RESTAURANT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: RESTAURANT_DETAILS_FAIL,
            payload: err.message
        })
    }
}

export const restProfileUpdate = (username, restname, country, city, state, address, pincode) => async (dispatch) => {
    try {
        dispatch({
            type: RESTAURANT_PROFILE_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.put(`${URL}/api/restaurant/restaurant-profile/update/`, {
            'username': username,
            'restaurant_name': restname,
            'country': country,
            'city': city,
            'state': state,
            'address': address,
            'pincode': pincode,

        }, config)
        dispatch({
            type: RESTAURANT_PROFILE_SUCCESS,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: RESTAURANT_PROFILE_FAIL,
            payload: err.message
        })

    }
}
