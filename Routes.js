import React from 'react';
import { useFonts } from 'expo-font';
import { Ionicons,Entypo } from '@expo/vector-icons';


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//Our Screens
// Auth Stack
import Login from './Screens/Auth/Login'
import Register from './Screens/Auth/Register'
//Main Stack
import Home from './Screens/Home'
import ProductPage from './Screens/ProductPage'
//Order Stack
import Order from './Screens/Order/Order'
import OrderDetail from './Screens/Order/OrderDetail'


import Subscribe from './Screens/Subscribe'
import Chat from './Screens/Chat'
// Global
import Loading from './Screens/Loading'
import Notification from './Screens/Notification'
// Cart Stack
import Cart from './Screens/Cart'
import Checkout from './Screens/Checkout'
//Profile Stack
import ChangeLocation from './Screens/Map/ChangeLocation'
import Profile from './Screens/Profile/Profile'
import OrderHistory from './Screens/Profile/OrderHistory'
import ChangePassword from './Screens/Profile/ChangePassword'
import Complain from './Screens/Profile/Complain'
//Category Stack
import Categories from './Screens/Categories/Categories'
import CategoryDetail from './Screens/Categories/CategoryDetail'


const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{
                headerTitleAlign: "center"
            }} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}


const Tab = createBottomTabNavigator();



function MainStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown : false,}} />
            <Stack.Screen name="ProductPage" component={ProductPage} options={{headerShown : false,}} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Subscription Detail" component={Subscribe} />
        </Stack.Navigator>
    )
}

function CartStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Cart" component={Cart}  options={{ headerShown : false}} />
          <Stack.Screen name="Checkout" component={Checkout}  options={{headerShown : false}} />
        </Stack.Navigator>
    )
}

function ProfileStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Profile" component={Profile}  options={{ headerShown : false}} />
          <Stack.Screen name="Change Location" component={ChangeLocation} />
          <Stack.Screen name="OrderHistory" component={OrderHistory}  options={{
          }} />
          <Stack.Screen name="Complain" component={Complain}  options={{
          }} />
          <Stack.Screen name="ChangePassword" component={ChangePassword}  options={{
          }} />
        </Stack.Navigator>
    )
}

function CategoryStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Categories" component={Categories}  options={{ headerShown : false}} />
          <Stack.Screen name="CategoryDetail" component={CategoryDetail}  options={{ headerShown : false}} />
        </Stack.Navigator>
    )
}

function MyTabs() {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName = "ios-home";

            if(route.name === 'MainStack') {
            }
            else if (route.name === 'ProfileStack') {
                iconName = 'person';
            } else if (route.name === 'Cart') {
                return <Entypo name="shopping-cart" size={size} color={color} />
            } else if (route.name === "Notification") {
                iconName = "notifications"
            } else if (route.name === "Users") {
                return <Entypo name="users" size={size} color={color} />
            }

            return <Ionicons name={iconName} size={size} color={color} />;
        },

        

        })}>
          <Tab.Screen name="MainStack" component={MainStack}  options={{ 
              headerShown : false,
              tabBarLabel : "Home",
            }} />
          <Tab.Screen name="CategoryStack" component={CategoryStack}  options={{
              headerShown : false,
              tabBarLabel : "Categories"
            }} />
          <Tab.Screen name="Cart" component={CartStack}  options={{ 
              headerShown : false,
              tabBarLabel : "My Cart"
            }} />
          <Tab.Screen name="Notification" component={Notification}  options={{
              headerShown : false,
              tabBarLabel: "Notifications"
            }} />
          <Tab.Screen name="ProfileStack" component={ProfileStack}  options={{
              headerShown : false,
              tabBarLabel : "Profile"
            }} />
      </Tab.Navigator>
    )}

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
                <Stack.Screen name="MyTabs" component={MyTabs}  options={{
                    headerShown : false,
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;