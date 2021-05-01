import { 
    RESTAURANT_LIST_FAIL, 
    RESTAURANT_LIST_REQUEST, 
    RESTAURANT_LIST_SUCCESS ,


    RESTAURANT_SERVINGS_REQUEST,
    RESTAURANT_SERVINGS_FAIL,
    RESTAURANT_SERVINGS_SUCCESS,

    RESTAURANT_PROFILE_SUCCESS,
    RESTAURANT_PROFILE_REQUEST,
    RESTAURANT_PROFILE_FAIL,

    RESTAURANT_DETAILS_REQUEST,
    RESTAURANT_DETAILS_SUCCESS,
    RESTAURANT_DETAILS_FAIL

} from '../constants/RestaurantConstants'

export const restaurantsListReducer = (state = {
    restaurants: []
}, action) => {
    switch (action.type) {
        case RESTAURANT_LIST_REQUEST:
            return {
                loading: true,
                restaurants: []
            }
        case RESTAURANT_LIST_SUCCESS:
            return {
                loading: false,
                restaurants: action.payload
            }
        case RESTAURANT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const restaurantServingsReducer = (state={
    servings:[]
},action)=>{
    switch(action.type){
        case RESTAURANT_SERVINGS_REQUEST:
            return{
                loading:true,
            }
        case RESTAURANT_SERVINGS_SUCCESS:
            return{
                loading:false,
                servings:action.payload
            }
        case RESTAURANT_SERVINGS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

export const restaurantProfileReducer = (state={
    profile:{}
},action)=>{
    switch(action.type){
        case RESTAURANT_PROFILE_REQUEST:
            return{
                loading:true,
            }
        case RESTAURANT_PROFILE_SUCCESS:
            return{
                loading:false,
                profile:action.payload
            }
        case RESTAURANT_PROFILE_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

export const restaurantDetailsReducer = (state={
    details:{}
},action)=>{
    switch(action.type){
        case RESTAURANT_DETAILS_REQUEST:
            return{
                loading:true,
            }
        case RESTAURANT_DETAILS_SUCCESS:
            return{
                loading:false,
                details:action.payload
            }
        case RESTAURANT_DETAILS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}
