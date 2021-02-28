import React from 'react';
import {View,Text,Button,ActivityIndicator, StyleSheet,Dimensions} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {readCart,deleteCartItem} from '../Services/Cart'
import {checkout,orderProductPush} from '../Services/Order'

const {width,height} = Dimensions.get("window")

//Here we import the components

import { TouchableOpacity } from 'react-native-gesture-handler';

class Checkout extends React.Component {
    constructor() {
        super();
        this.state = {
            orders : [],
            loading : true
        }
    }
    async componentDidMount() {
        await readCart().then(async response => {
            for (var i in response) {
                console.log(i)
                await checkout(response[i]).then(async res => {
                    console.log("Thats the order info",res)
                    await orderProductPush(res,response[i]).then((res) => {
                        deleteCartItem(response[i])
                    })
                })
            }
            this.setState({loading : false})
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
                <View><Text>This is the checkout Page</Text></View>
                <Button title="Go Back" onPress={() => this.props.navigation.replace("Cart")} />
            </View>
        )
    }
}
export default Checkout;

const styles= StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"white"
    },

})