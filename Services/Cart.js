import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native'


//Here is the base API
import axios from './API'


export async function addToCart(orderObject) {
    console.log("HEEEE")
    var cart = await AsyncStorage.getItem('cart')
    if (cart == null) {
        cart = "[]"
    }
    let cartArr = JSON.parse(cart)
    console.log("This is the array,",cartArr)
    cartArr.unshift(orderObject)
    await AsyncStorage.setItem('cart',JSON.stringify(cartArr))
    console.log(cart)

}

export async function readCart() {
    var cart = await AsyncStorage.getItem('cart')
    if (cart == null) {
        cart = "[]"
    }
    let cartArr = JSON.parse(cart)
    console.log(cart)
    return cartArr
}

export async function deleteCartItem(index) {
    var cart = await AsyncStorage.getItem('cart')
    if (cart == null) {
        cart = "[]"
    }
    let cartArr = JSON.parse(cart)
    cartArr.splice(index,1)
    console.log(cart)
    await AsyncStorage.setItem('cart',JSON.stringify(cartArr))
    console.log(cart)
}

