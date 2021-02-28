import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import {checkUser} from '../Services/User'

export default function LoadingScreen({ navigation }) {
  useEffect(
     () => {
        checkUser().then((token) => {
            console.log(token)
        if (token) {
          navigation.replace('MyTabs',{screen :'MainStack'});
        } else {
          navigation.replace('AuthStack',{screen : "Login"});
        }
      });
    }
  );

  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' />
    </View>
  );
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems : "center"
    }
})