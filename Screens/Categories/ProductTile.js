import React, { Component } from 'react'
import {View,Text,TouchableOpacity, StyleSheet,Image,Dimensions, Alert} from 'react-native'

import { MaterialIcons, AntDesign } from '@expo/vector-icons';


const {width,height} = Dimensions.get("window")

export default function ProductTile(props) {
        const [item,setItem] = React.useState({})
        React.useEffect(() => {
            setItem(props.item)
        })
        return (
            <View style={styles.body}>
                <View style={{width:'36%'}}>
                    <Image source={{uri : item.image}} style={styles.image} />
                </View>
                
                <View style={{width:'64%',paddingHorizontal:3}}>
                    <View>
                        <View>
                            <Text style={{textAlign:"center",fontFamily:"Raleway",color:"grey"}}>{item.name}</Text>
                        </View>
                        <Text>Price</Text>
                        <Text>Rs.{item.price}</Text>
                    </View>

                </View>

            </View>
        )
}

const styles = StyleSheet.create({
    body : {
        flexDirection :"row",
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
        marginTop : 10,
        backgroundColor : "white",
        marginHorizontal : 5,borderColor:'#e94e87',borderWidth:0.5
    },
    image : {
        resizeMode : "cover",
        width  : width*0.35,
        height  : width*0.35,
        alignSelf:"flex-start",
        justifyContent : "flex-start"
    },
    button : {
        backgroundColor : 'red',
        marginVertical : 10,
        width: '65%',
        padding : 8,
        justifyContent:"center",
        alignItems:"center",
        borderRadius : width*0.5/2
    }
})
