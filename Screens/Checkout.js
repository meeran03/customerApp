import React from 'react';
import {View,Text,Image,ActivityIndicator, StyleSheet,Dimensions} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {readCart} from '../Services/Cart'
import {checkout} from '../Services/Order'

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
                await checkout(response[i]).then(res => {
                    console.log(res)
                })
            }
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