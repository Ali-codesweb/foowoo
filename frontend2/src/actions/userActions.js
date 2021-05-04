import axios from "axios"
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,


    USER_DONATE_REQUEST,
    USER_DONATE_SUCCESS,
    USER_DONATE_FAIL,

    USER_DONATIONS_LIST_REQUEST,
    USER_DONATIONS_LIST_SUCCESS,
    USER_DONATIONS_LIST_FAIL

} from "../constants/userConstants"


const URL = 'https://foowoo1.herokuapp.com'



export const login = (email, password) => async (dispatch) => {
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

        }, config)

        const toStringifyData = JSON.stringify(data)

        if (data.is_user) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            localStorage.setItem('userInfo', toStringifyData)
        } else {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: 'You are registered as restaurant. Please login as a Restaurant'
            })
            window.alert('You are registered as restaurant. Please login as a Restaurant')
        }



    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: 'Invalid Credentials, please enter corrent email and password'
        })
    }
}

export const logout = () => (dispatch) => {
    dispatch({
        type: USER_LOGOUT
    })
    localStorage.removeItem('userInfo')
}

export const loginRestaurant = (email, password) => async (dispatch) => {
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
        if (data.is_restaurant) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
        } else {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: 'You are registered as user. Please login as a user'
            })
        }



    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: 'Invalid Credentials, please enter corrent email and password'
        })
    }
}

export const register = (email, first_name, last_name, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        dispatch({
            type: USER_SIGNUP_REQUEST
        })
        const { data } = await axios.post(URL + '/api/user/register/', {
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
            'password': password,
            config
        })
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        })

        console.log('success')

    } catch (err) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: err.message
        })
    }
}

export const donateMeal = (restaurant_id, serving_id, quantity, type) => async (dispatch, getState) => {
    const token = getState().user.userInfo.token
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        console.log(getState())
        dispatch({
            type: USER_DONATE_REQUEST
        })

        const { data } = await axios.post(`${URL}/api/user/donate-or-request/`, {
            'restaurant_id': restaurant_id,
            'serving_id': serving_id,
            'quantity': quantity,
            'type': type
        }, config)

        dispatch({
            type: USER_DONATE_SUCCESS,
            payload: data
        })

        window.alert(`You have successfully donated. We are very grateful
         of you ! You will be informed when your donation is accepted`)

    } catch (err) {
        dispatch({
            type: USER_DONATE_FAIL,
            payload: err.message
        })

        window.alert(err.message)
    }
}


export const userProfileUpdate = (username, firstName, lastName) => async (dispatch, getState) => {
    const token = getState().user.userInfo.token
    console.log(token)
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.post(URL + '/api/user/update-details/', {
            username,
            firstName,
            lastName
        }, config)

        console.log(data)
        window.alert('User profile updated')
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

    }
    catch (err) {
        window.alert(err.message)
    }
}

export const myDonationOrRequestRequests = (type) => async (dispatch, getState) => {
    const token = getState().user.userInfo.token
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            params: {
                'type': type
            }
        }

        dispatch({
            type: USER_DONATIONS_LIST_REQUEST,
        })
        const { data } = await axios.get(URL + '/api/user/my-donations-and-requests/', config)
        console.log(data)
        dispatch({
            type: USER_DONATIONS_LIST_SUCCESS,
            payload: data
        })
    }
    catch (err) {
        dispatch({
            type: USER_DONATIONS_LIST_FAIL,
            payload: err.message
        })
        window.alert(err.message)
    }
}