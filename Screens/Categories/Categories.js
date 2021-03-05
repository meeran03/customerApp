import React from 'react'
import {View, ActivityIndicator, StyleSheet,Dimensions} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {StatusBar} from 'expo-status-bar'

//Here we import our components
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CategoryDetail  from './CategoryDetail'
import { ScrollView } from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();


function Categories(props) {
    const [data,setData] = React.useState({})
    const [loading,setLoading] = React.useState(true)
    React.useEffect(() => {
            (async () => {
                let res = await AsyncStorage.getItem('categories')
                setData(JSON.parse(res))
                console.log(data)
                setLoading(false)
            })()
        
    },[])
    if (loading) {
        return <ActivityIndicator size="large" color="red" style={{flex:1,justifyContent:"center",alignItems:"center"}} />
    }
    return (
        <>
        <StatusBar backgroundColor="black" />
        <Tab.Navigator tabBarOptions={{
            labelStyle : {
                fontSize : 9
            },
            allowFontScaling:false, 
            tabStyle: {
                paddingTop:30
            }
          }}>
            {data.map((category,index) => {
                return(
                    <Tab.Screen key={index} name={category.name}  >
                        {props => <CategoryDetail {...props} category={category.id} />}
                    </Tab.Screen>
                )
            }) }
        </Tab.Navigator>
        </>
    )
}

export default Categories

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor : "white"
    },
    tile : {
        margin: 10,
        marginVertical: 5,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor : "white",
        padding : 20,
        justifyContent : "space-between",
        flexDirection : "row"
    }
})
