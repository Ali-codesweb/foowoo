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
} from "../constants/userConstants";


export const userReducer = (state = {

}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {}
        default:
            return state

    }
}

export const userSignupReducer = (user = {
}, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return {
                loading: true,
                error: false
            }
        case USER_SIGNUP_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: false
            }
        case USER_SIGNUP_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return user

    }
}

export const userDonateReducer = (state = {
    serving: {}
}, action) => {
    switch (action.type) {
        case USER_DONATE_REQUEST:
            return {
                loading: true,
            }
        case USER_DONATE_SUCCESS:
            return {
                loading: false,
                serving: action.payload,
            }
        case USER_DONATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state

    }
}

export const userDonationReducer = (state={
    donations:[]
},action)=>{
    switch (action.type) {
        case USER_DONATIONS_LIST_REQUEST:
            return {
                loading: true,
            }
        case USER_DONATIONS_LIST_SUCCESS:
            return {
                loading: false,
                donations: action.payload,
            }
        case USER_DONATIONS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state

    }
}