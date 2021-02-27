import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

function TBD() {
    return (
        <View style={styles.container}>
            <Text style={{fontFamily:"Raleway_bold",fontSize:50}}>2</Text>
            <View style={{justifyContent: "center",marginLeft : 5}}>
                <Text style={{fontFamily:"Raleway_bold"}}>Items to be delivered tomorrow</Text>
                <Text style={{fontFamily:"Raleway"}}>between 8 and 12 A.M</Text>
            </View>
        </View>
    )
}
export default TBD;

const styles=StyleSheet.create({
    container : {
        flexDirection : "row",
        margin: 10,
        alignItems : "center",
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor : "white",
        padding : 10
    }
})