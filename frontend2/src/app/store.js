import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  restaurantsListReducer,
  restaurantServingsReducer,
  restaurantProfileReducer,
  restaurantDetailsReducer
} from '../reducers/restaurantReducer'
import {
  userReducer, userSignupReducer, userDonateReducer,
  userDonationReducer
} from '../reducers/userReducer'


const reducer = combineReducers({
  restaurantList: restaurantsListReducer,
  user: userReducer,
  userSignup: userSignupReducer,
  restaurantServings: restaurantServingsReducer,
  userDonate: userDonateReducer,
  restaurantProfile: restaurantProfileReducer,
  restaurantDetails: restaurantDetailsReducer,
  userDonations: userDonationReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  user: {
    userInfo: userInfoFromStorage
  },
}

const middleWare = [thunk]

const store = createStore(reducer, initialState,
  composeWithDevTools(applyMiddleware(...middleWare)))

export default store