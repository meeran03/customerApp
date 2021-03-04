import React from 'react'
import {View,Text,Button, ActivityIndicator, StyleSheet} from 'react-native'
import {orderSocket} from '../../Services/WebSocket'
import {getActiveOrders} from '../../Services/Order'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Header from '../../Components/Header'

let chatsocket = orderSocket()

class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            data : [],
            loading : true
        }
    }
    
  componentDidMount() {
    getActiveOrders().then(res => {
        console.log("Active Orders are ",res)
        this.setState({data : (res),loading: false})

    })
    chatsocket.onmessage = function(e) {
        //const data = JSON.parse(e.data);
        getActiveOrders().then(res => {
            this.setState({data : (res)})
            console.log("data is ",res)    
        })
      }.bind(this)

    chatsocket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly',e.message);
    };
  }


    render() {
        if (this.state.loading) {
            return <ActivityIndicator size="large" color="red" style={{flex:1,justifyContent:"center",alignItems:"center"}} />
        }
        return (

            <View style={styles.container}>
                <Text style={{color:"#e94e87",fontFamily:"Raleway_medium"}}>Active Orders</Text>
                <ScrollView>
                    {this.state.data.map((item,index) => {
                        return(
                            <View>
                                <View style={styles.order}>
                                    <Text style={{color:"grey",fontSize:16}}>Order #{item.id}</Text>
                                    <TouchableOpacity style={styles.button}
                                        onPress={() => this.props.navigation.navigate("OrderDetail",{order : item})}
                                    >
                                        <Text style={{color:"white"}}>See Status</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        )}
}

export default Orders


const styles = StyleSheet.create({
    container : {
        margin:10,
        backgroundColor:"white",
        borderRadius : 10,
        padding : 8,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
    },
    order : {
        justifyContent:"space-between",
        flexDirection:'row',
        paddingVertical : 10,
        alignItems:"center"
    },
    button : {
        backgroundColor:"#e94e87",
        padding : 8
    }
})