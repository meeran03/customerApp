import React from 'react'
import {View,Text, StyleSheet,Image,Dimensions} from 'react-native'

const {width,height} = Dimensions.get('window')

function SearchProductTile(props) {
    React.useEffect(() => {
        console.log("Ia m the one",props.item.item)
    },[])
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{props.item.item.name}</Text>
            <Image source={{uri : props.item.item.image}} style={styles.image} />
                <Text style={{...styles.name,fontFamily:"Raleway",fontSize:14}}>Buy Once @ {props.item.item.price}</Text>
            {props.item.item.can_subscribe && 
                <Text style={{...styles.name,fontSize:14,color:"#e94e87"}}>Susbcribe</Text>
            }
        </View>
    )
}

export default SearchProductTile

const styles = StyleSheet.create({
    container : {
        margin: 10,
        marginVertical: 5,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor : "white",
        width: 0.4*width,
        paddingVertical: 5
    },
    image : {
        width: width*0.4,
        height: 100
    },
    name : {
        textAlign : "center",
        fontFamily : "Raleway",
        fontSize : 20
    }
})