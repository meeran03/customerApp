import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';

function Location(props) {
    return (
        <View style={styles.container}>
            <Text style={{color:"#e94e87",fontFamily:"Raleway_medium"}}>Delivery Location</Text>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <Text style={{color:"grey",fontFamily:"Raleway",width:'70%'}}>35-C Judicial Colony,Lahore</Text>
                <TouchableOpacity style={{flexDirection:"row"}} 
                    onPress={() => props.navigation.navigate("Change Location")}
                >
                    <Text style={{color:"grey",fontFamily:"Raleway",marginHorizontal:10}}>Change    
                    </Text>
                    <Entypo name="pin" size={20} color="dodgerblue" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Location;

const styles=StyleSheet.create({
    container : {
        margin: 10,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor : "white",
        padding : 10
    }
})