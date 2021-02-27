import React from 'react';
import { useFonts } from 'expo-font';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

//Our Screens
import Login from './Screens/Auth/Login'
import Register from './Screens/Auth/Register'
import ChangePassword from './Screens/Auth/ChangePassword'

import Home from './Screens/Home'
import ProductPage from './Screens/ProductPage'
import Order from './Screens/Order'
import Loading from './Screens/Loading'
import Cart from './Screens/Cart'
import Checkout from './Screens/Checkout'
import Notification from './Screens/Notification'
import ChangeLocation from './Screens/Map/ChangeLocation'

const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{
                headerTitleAlign: "center"
            }} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
    )
}

function MainStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown : false,}} />
            <Stack.Screen name="ProductPage" component={ProductPage} options={{headerShown : false,}} />
            <Stack.Screen name="Order Detail" component={Order} />
        </Stack.Navigator>
    )
}

function Routes() {
    const [loaded] = useFonts({
        Raleway: require('./assets/fonts/Raleway-Regular.ttf'),
        Raleway_medium: require('./assets/fonts/Raleway-Medium.ttf'),
        Raleway_bold: require('./assets/fonts/Raleway-Bold.ttf'),
      });
      
      if (!loaded) {
        return null;
      }
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Loading" component={Loading}  options={{
                    headerShown : false,
                }} />
                <Stack.Screen name="AuthStack" component={AuthStack}  options={{
                    headerShown : false,
                }} />
                <Stack.Screen name="MainStack" component={MainStack}  options={{
                    headerShown : false,
                }} />
                <Stack.Screen name="Cart" component={Cart}  options={{
                    headerShown : false,
                }} />
                <Stack.Screen name="Checkout" component={Checkout}  options={{
                    headerShown : false,
                }} />
                <Stack.Screen name="Notification" component={Notification}  options={{
                    headerShown : false,
                }} />
                <Stack.Screen name="Change Location" component={ChangeLocation}  options={{
                    headerShown : false,
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;