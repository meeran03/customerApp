import React, { useState, useCallback, useEffect } from 'react'
import {View, StyleSheet, Dimensions,Text,ScrollView} from 'react-native'
import Header from '../Components/Header'
import {getNotifications} from '../Services/Notification' 

const {width,height} = Dimensions.get("window")

  

export default function Notification(props) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        (async () => {
            await getNotifications().then(response => {
                setNotifications(response);
            })
        })()
    }, []);

        return (
            <View style={styles.container}>
                <Header title="Notifications" navigation={props.navigation} goBack={props.navigation.goBack} />
                
                <ScrollView style={styles.notificationContainer}  contentContainerStyle={{justifyContent: "center",alignItems : "center",}}>
                    {notifications.map((item,index) => {
                        return(
                            <View style={styles.notification}>
                                <Text style={styles.notificationContent}>{item.title}</Text>
                                <Text style={styles.notificationDate}>{item.message}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        );

}


const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    notification : {
        backgroundColor : "white",
        padding : 10,
        marginVertical : 3,
        width : width*0.9,
        borderRadius : 12
    },
    notificationContainer : {
    },
    notificationContent : {
        fontSize : 14,
        fontFamily : "Raleway_medium"
    },
    notificationDate : {
        color : "grey",
        alignSelf: "flex-end",
        fontFamily : "Raleway_medium",
        fontSize : 12

    }
})
