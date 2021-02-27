import {StyleSheet,Dimensions} from 'react-native'
const {width,height} = Dimensions.get("window")


export const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor : "orange",
        paddingTop :100
    },
    input : {
        color:"white",
        width: width*0.8,
        marginVertical : 6
    },

    inputBox : {
        borderColor: '#4e4e4e',
        padding: 8,
        marginVertical: 5,
        backgroundColor: "white",
        textAlign: "left",
        borderRadius : 4  ,
        backgroundColor : '#e9e8e8'
    },
    title : {
        color:"#e94e87",
        fontSize : 20,
        textAlign: "center",
        fontWeight: "900"
    },
    button : {
        marginVertical : 20,
        alignItems:"center",
        backgroundColor: "#e94e87",
        paddingVertical : 10,
        width : width*0.2,
        height : width*0.2,
        justifyContent : "center",
        alignContent : "center",
        borderRadius : width*0.3/2,
        alignContent: "flex-end",
    },
    formContainer : {
        justifyContent : "center"
    },
    logo : {
        height: height*0.2,
        resizeMode : "contain"
    }

})