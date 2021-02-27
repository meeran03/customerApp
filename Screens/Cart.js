import React from 'react';
import {View,Text,Image,ActivityIndicator, StyleSheet,Dimensions} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {readCart} from '../Services/Cart'

const {width,height} = Dimensions.get("window")

//Here we import the components
import Card from '../Components/Cart/Card'
import Header from '../Components/Header'

import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            orders : [],
            loading : true
        }
    }
    async componentDidMount() {
        await readCart().then(response => {
            this.setState({
                orders : response,
                loading : false
            })
        })
    }

    render() {
        if (this.state.loading) {
            return(
                <View>
                    <ActivityIndicator size="large" color="red" style={{justifyContent:"center",alignItems:"center",flex:1}}/>
                </View>
            )
        }
        return(
            <View style={styles.container}> 
                <StatusBar color="white" />
                <Header title="My Cart"/>
                {this.state.orders.map((order,index) => {
                    return(
                    <Card order={order} index={index} navigation={this.props.navigation}/>)
                })}
                
                <View style={styles.checkout}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Checkout")}>
                        <Text style={{color:"white",fontFamily:"Raleway_bold",fontSize:22}}>Proceed to Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default Cart;

const styles= StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"white"
    },
    checkout : {
        bottom : 5,
        backgroundColor : "#e94e87",
        position  : "absolute",
        alignSelf : "center",
        padding: 20,
        borderRadius : 20
    }
})