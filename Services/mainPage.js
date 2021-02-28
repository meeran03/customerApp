import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native'


//Here is the base API
import axios from './API'
import {encode as btoa} from 'base-64'

// export async function checkUser(){
//     try {
//       console.log("trying")
//       const value = await AsyncStorage.getItem('token')
//       console.log(value)
//       return value
//     }catch(e) {
//         console.log(error)
//     }
//   }
  
// export async function signUser(username,password){
//     const credentials = btoa(`${username}:${password}`);
//     return axios.post('/auth/login/',{
//       "username" : username,
//       "password" : password
//     },
//     {
//       headers : {
//       "Authorization": `Basic ${credentials}`
//     }
//     }).then(res => {
//       return res.data
//     }).catch(e => {
//       Alert.alert("There is something wrong",e)
//     })
// }

export async function getCategories() {
    const token = await AsyncStorage.getItem('token')
    return axios.get('/product-category/',{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    }).then(async response => {
        await AsyncStorage.setItem('categories',JSON.stringify(response.data))
        return response.data
    }).catch(e => {
        Alert.alert(e)
    })
} 

export async function getBanners() {
    const token = await AsyncStorage.getItem('token')
    return axios.get('/banner/',{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        Alert.alert(e)
    })
} 

export async function getProducts() {
    const token = await AsyncStorage.getItem('token')
    return axios.get('/product/',{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        Alert.alert(e)
    })
}