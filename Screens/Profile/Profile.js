import React from 'react'
import {View,Text,Image, ActivityIndicator, StyleSheet,Dimensions} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

//Here we import our components
import Header from '../../Components/Header'
import { TouchableOpacity } from 'react-native-gesture-handler'

const {width,height} = Dimensions.get("window")

function Profile(props) {
    const [data,setData] = React.useState({})
    const [loading,setLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            let userData = await AsyncStorage.getItem('user')
            console.log(userData)
            setData(JSON.parse(userData))
            setLoading(false)
        })()
    },[])
    if (loading) {
        return <ActivityIndicator size="large" color="red" style={{flex:1,justifyContent:"center",alignItems:"center"}} />
    }
    return (
        <View style={styles.container}> 
            <Header navigation={props.navigation} title="Profile" />

            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}}>
                <Image source={{uri : data.image}} style={styles.pic} />
                <Text style={styles.username}>{data.username}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{...styles.tile,marginTop:20}}>
                <Text>See Order History</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tile}>
                <Text>Change Profile Information</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate("OrderHistory")} style={styles.tile}>
                <Text>See Order History</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tile}>
                <Text>Report A Complain</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tile}>
                <Text>Change Location</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor : "white"
    },
    pic : {
        width : width*0.3,
        height : height*0.2,
        resizeMode : "contain",
        borderRadius : width/2
    },
    username : {
        fontFamily : "Raleway_bold",
        fontSize: 24
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
