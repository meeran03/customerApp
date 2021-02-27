import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native'


//Here is the base API
import axios from './API'


export async function getProductDetail(id) {
    const token = await AsyncStorage.getItem('token')
    return axios.get('/product/' + id + '/',{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        Alert.alert(e)
    })
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

