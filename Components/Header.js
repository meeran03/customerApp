
import React from 'react';
import { StyleSheet, Dimensions, Text,TouchableOpacity,View} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Entypo,Feather } from '@expo/vector-icons';
import {signOut} from '../Services/User'





const {width,height} = Dimensions.get("window")

function Header(props) {
    const handleLogout = async () => {
        await signOut().then(res => {
            console.log(res)
        })
    }
        return (
            
                <View
                    style={{...styles.header,backgroundColor : props.color ? props.color : '#e94e87'}}
                >   
                    {props.backButton && 
                    (<TouchableOpacity style={styles.backButton} onPress={() => props.goBack()}>
                        <Ionicons name="arrow-back" size={30} color={props.buttonColor ? props.buttonColor : "white"} />
                    </TouchableOpacity>)
                    }
                        <Text style={{...styles.title,color : props.buttonColor ? props.buttonColor : "white"}}>{props.title}</Text>
                    
                    {!props.disabled && 
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity style={styles.backButton} onPress={() => props.navigation.navigate("Notification")} style={styles.backButton} >
                                <Ionicons name="notifications" size={22} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.backButton} onPress={handleLogout} >
                                <Feather name="search" size={22} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate("Cart")} style={styles.backButton} >
                                <Entypo name="shopping-cart" size={22} color="white" />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            
        );
}

export default Header;

const styles = StyleSheet.create({
    header : {
        width: width,
        padding: 20,
        height: height*0.09,
        flexDirection: "row",
        alignItems : "center",
        justifyContent : "space-between",
        zIndex : 1000
    },
    title : {
        color: "white",
        fontSize:20,
        textAlign: "center",
        fontFamily: "Raleway_bold",

    },
    backButton : {
        alignSelf: "flex-end",
        marginHorizontal : 5
    }
})