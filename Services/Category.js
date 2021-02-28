import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native'


//Here is the base API
import axios from './API'

export async function getCategoryProducts(category) {
    const token = await AsyncStorage.getItem('token')
    return axios.get('/product/?category=' + category ,{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        Alert.alert(e.message,JSON.stringify(e.response.data))
    })
}