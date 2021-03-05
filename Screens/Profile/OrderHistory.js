import React from 'react'
import {View,Text, ActivityIndicator, StyleSheet,Dimensions,ScrollView} from 'react-native'
import {getOrderHistory} from '../../Services/Order'
import OrderTile from '../../Components/Order/OrderTile'

const {width,height} = Dimensions.get('window')

export default function OrderHistory() {
    const [loading,setLoading] = React.useState(true)
    const [data,setData] = React.useState({})
    React.useEffect(() => {
        getOrderHistory().then(res => {
            setData(res)
            console.log(data)
            setLoading(false)
        })
    },[])

    if (loading) {
        return <ActivityIndicator size="large" color="red" style={{justifyContent:"center",alignItems:"center"}} />
    }

    return (
        <View style={styles.container}>
            
            <ScrollView style={styles.orderContainer}>
                {data.map((item,index) => {
                    return(
                        <OrderTile item={item} key={index} showTrack={false} />
                    )
                })}
            </ScrollView>
        </View>
    );

}


const styles = StyleSheet.create({
container : {
    flex : 1,
},
order : {
    backgroundColor : "white",
    padding : 10,
    marginVertical : 3,
    width : width*0.9,
    borderWidth : 0.5,
    borderColor : "#e94e87"
},
orderContainer : {
    paddingTop: 30
},
orderContent : {
    fontSize : 14,
    fontFamily : "Raleway_medium"
},
orderDate : {
    color : "grey",
    alignSelf: "flex-end",
    fontFamily : "Raleway_medium",
    fontSize : 12

}
})
