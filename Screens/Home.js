import React from 'react'
import {View,Text,ScrollView} from 'react-native'
import Header from '../Components/Header'

//Here we import our components
import TBD from '../Components/Main/TBD'
import SlideShow from '../Components/Main/SlideShow'
import Featured from '../Components/Main/Featured'
import Categories from '../Components/Main/Categories'
import Location from '../Components/Main/Location'

//Our Services
import {registerForPushNotificationsAsync} from '../Services/PushNotifications'
import {updateUser} from '../Services/User'

function Home(props) {
    React.useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            updateUser("push_token",token)
        })
      },[])
    return (
        <View style={{backgroundColor:"white",flex:1}}>
            <Header title="Home" navigation={props.navigation}/>
            <ScrollView>
                <Location navigation={props.navigation}/>
                <SlideShow/>
                <TBD/>
                <Categories/>
                <Featured navigation={props.navigation}/>
                <Text>I am a Homescreen</Text>
            </ScrollView>
        </View>
    )
}

export default Home
