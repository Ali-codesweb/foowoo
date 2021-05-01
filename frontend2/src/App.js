import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './main.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AddNewServingScreen from './screens/restaurant/AddNewServingScreen';
import DonationRequests from './screens/restaurant/DonationRequests';
import DonatorsList from './screens/restaurant/DonatorsList';
import MealRequests from './screens/restaurant/MealRequests';
import MyServingsList from './screens/restaurant/MyServingsList';
import PasswordChange from './screens/restaurant/PasswordChange';
import RestLoginScreen from './screens/restaurant/RestLoginScreen';
import RestProfileScreen from './screens/restaurant/RestProfileScreen';
import RestaurantDetails from './screens/RestaurantDetails';
import RestaurantsListScreen from './screens/RestaurantsListScreen';
import SignUpScreen from './screens/SignUpScreen';
import MealDetailsScreen from './screens/users/MealDetailsScreen';
import MealsScreen from './screens/users/MealsScreen';
import MyDonationsScreen from './screens/users/MyDonationsScreen';
import MyRequestsScreen from './screens/users/MyRequestsScreen';
import ProfileScreen from './screens/users/ProfileScreen';

function App() {
  console.log(window.outerWidth)
  console.log(window.outerHeight)

  return (
    <div className="App">
      <Switch >
        <Route path='/' exact component={HomeScreen} />
        <Route path='/restaurants/:id' exact component={RestaurantDetails} />
        <Route path='/restaurants' component={RestaurantsListScreen} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/signup' component={SignUpScreen} />
        <Route path='/my-donations' component={MyDonationsScreen} />
        <Route path='/my-requests' component={MyRequestsScreen} />
        <Route path='/meals/:id' component={MealsScreen} />
        <Route path='/meal-detail/:id' component={MealDetailsScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/rest/login' component={RestLoginScreen} />
        <Route path='/rest/profile/:id' component={RestProfileScreen} />
        <Route path='/rest/password-change' component={PasswordChange} />
        <Route path='/rest/my-servings' component={MyServingsList} />
        <Route path='/rest/donation-requests' component={DonationRequests} />
        <Route path='/rest/donators-list' component={DonatorsList} />
        <Route path='/rest/meal-requests' component={MealRequests} />
        <Route path='/rest/add-new-serving' component={AddNewServingScreen} />
        
      </Switch>
    </div>
  );
}

export default App;
