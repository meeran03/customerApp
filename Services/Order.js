import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native'


//Here is the base API
import axios from './API'
import {encode as btoa} from 'base-64'



export async function placeOrder() {
    var cart = await AsyncStorage.getItem('cart')
    if (cart == null) {
        cart = "[]"
    }
    let cartArr = JSON.parse(cart)
    console.log(cart)
    
}

export async function getSubscriptions() {
    const token = await AsyncStorage.getItem('token')
    return axios.get('/subscription/',{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        Alert.alert(e)
    })
}

export async function checkout(data){
    const token = await AsyncStorage.getItem('token')
    const user = await AsyncStorage.getItem('user')
    const customer = await AsyncStorage.getItem('customer')
    let customerData = JSON.parse(customer)
    let body = {
        "customer" : customerData.id,
        "store" : 1,
        "price" : 3750,
    }
    console.log(body)
    return axios.post('/order/',body,
    {
        headers : {
            "Authorization" : `Token ${token}` 
      }
    }).then(res => {
        console.log("order id :",res.data.id)
      let order_id = res.data.id 
      return order_id
    }).catch(e => {
        console.log(e.response.data)
      Alert.alert(e.message,JSON.stringify(e.response.data))
    })
}

export async function orderProductPush(order_id,data){
    const token = await AsyncStorage.getItem('token')
    const user = await AsyncStorage.getItem('user')
    let body = {
        "order_id" : order_id,
        "quantity" : data.quantity,
        "product" : data.id,
    }
    console.log(body)
    return axios.post('/order-product/',body,
    {
        headers : {
            "Authorization" : `Token ${token}` 
      }
    }).then(res => {
      console.log("This is the response",res.data)
      return res.data
    }).catch(e => {
        console.log(e.response.data)
      Alert.alert(e.message,JSON.stringify(e.response.data))
    })
}
 /*         "start_time" : data.startTime,
"end_time" : data.endTime,
"buy_once" : data.subsciption >0 ? false : true,
 */

export async function subscribe(data){
    const token = await AsyncStorage.getItem('token')
    const user = await AsyncStorage.getItem('user')
    let userData = JSON.parse(user)
    console.log(data)
    let body = {
        "customer" : user.id,
        "store" : 1,
        "start_time" : data.startTime,
        "end_time" : data.endTime,
        "quantity" : data.quantity,
        "product_id" : data.id,
        "subscription" : data.subscription,
        "price" : data.price,
    }
    console.log(body)
    return axios.post('/subscription/',body,
    {
        headers : {
            "Authorization" : `Token ${token}` 
      }
    }).then(res => {
      console.log(res.data)
      return res.data
    }).catch(e => {
        console.log(e.response.data)
      Alert.alert(e.message,JSON.stringify(e.response.data))
    })
}

export async function getActiveOrders() {
    const token = await AsyncStorage.getItem('token')
    const customer = await AsyncStorage.getItem('customer')
    const customerData = JSON.parse(customer)
    return axios.get('/order/?customer=' + customerData.id + '&status=ACTIVE' ,{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        Alert.alert(e.message,JSON.stringify(e.response.data))
    })
}

export async function getOrderProducts(id) {
    const token = await AsyncStorage.getItem('token')
    return axios.get('/order-product/?order_id=' + id,{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    }).then(response => {
        console.log(response.dat)
        return response.data
    }).catch(e => {
        Alert.alert(e)
    })
}


export async function updateOrder(id) {
    console.log(id)
    const token = await AsyncStorage.getItem('token')
    axios
      .patch(`/order/${id}/`, {
          "user_complete" : true,
        },
  
        {
        headers : {
          "Authorization" : `Token ${token}`
        }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => Alert.alert(err.message,JSON.stringify(err.response.data)));
  }