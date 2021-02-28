import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native'


//Here is the base API
import axios from './API'
import {encode as btoa} from 'base-64'

export async function checkUser(){
    try {
      console.log("trying")
      const value = await AsyncStorage.getItem('token')
      console.log(value)
      return value
    }catch(e) {
        console.log(error)
    }
  }
  
export async function signUser(username,password){
    const credentials = btoa(`${username}:${password}`);
    return axios.post('/auth/login/',{
      "username" : username,
      "password" : password
    },
    {
      headers : {
      "Authorization": `Basic ${credentials}`
    }
    }).then(res => {
      console.log(res.data)
      return res.data
    }).catch(e => {
      Alert.alert("There is something wrong",e)
    })
}

export async function signOut(){
  const token = await AsyncStorage.getItem('token')
  await AsyncStorage.removeItem('token')
  await AsyncStorage.removeItem('user')
  return axios.post('/auth/logout/',{
  },
  {
    headers : {
    "Authorization": `Token ${token}`
  }
  }).then(res => {
    return res.data
  }).catch(e => {
    Alert.alert(e.message,JSON.stringify(e.response.data))
  })
}

export async function updateUser(field,value) {
  console.log(value)
  const user = await AsyncStorage.getItem('user')
  const token = await AsyncStorage.getItem('token')
  let userData = JSON.parse(user)
  axios
    .patch(`/user/${userData.id}/`, {
        "push_token" : value
      },
      {
      headers : {
        "Authorization" : `Token ${token}`
      }
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err.response.data));
}

export async function updateLocation(value) {
  console.log(value)
  const user = await AsyncStorage.getItem('user')
  const token = await AsyncStorage.getItem('token')
  let userData = JSON.parse(user)
  console.log("User data is : ",userData)
  axios
    .patch(`/user/${userData.id}/`, {
        "address" : value.address,
        "latitude" : value.latitude,
        "longitude" : value.longitude,
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