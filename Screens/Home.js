import React from 'react'
import {View,Text,ScrollView,RefreshControl} from 'react-native'
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

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

function Home(props) {
    React.useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            updateUser("push_token",token)
        })
      },[])
      const [refreshing, setRefreshing] = React.useState(false);

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);
    
    return (
        <View style={{backgroundColor:"white",flex:1}}>
            <Header title="Home" navigation={props.navigation}/>
            <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            >
                <Location navigation={props.navigation}/>
                <SlideShow/>
                <TBD navigation={props.navigation}/>
                <Categories navigation={props.navigation}/>
                <Featured navigation={props.navigation}/>
                <Text>I am a Homescreen</Text>
            </ScrollView>
        </View>
    )
}

export default Home
