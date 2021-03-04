import React from 'react';
import {View,Text,Image,ActivityIndicator, StyleSheet,Dimensions} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons';
import {addToCart} from '../../Services/Cart'


const {width,height} = Dimensions.get("window")


import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

class ProductPage extends React.Component {
    constructor() {
        super();
        this.state = {
            detail : {},
            loading : false,
            quantity : 1,
        }
    }
    async componentDidMount() {
        console.log(this.props.route.params)
        this.setState({
            detail : this.props.route.params.order.item,
            quantity : this.props.route.params.order.quantity,
        })
    }

    quantityHandler = (op) => {
        switch(op) {
            case '+' : return this.setState(prevState =>({
                            quantity : prevState.quantity+1
                        }))
            case '-' : return this.setState(prevState =>({
                            quantity : prevState.quantity>1 ? prevState.quantity -1 : 1
                        }))
        }
    }
    handleCart = async () => {
        console.log(0)
        var obj={};
        console.log("This is the id, ",this.state.detail.id)
        obj.id = this.state.detail.id
        obj.quantity = this.state.quantity
        obj.price = this.state.detail.price*this.state.quantity

        await addToCart(obj).then(response => {
            console.log(response)
            this.props.navigation.replace("MyTabs",{screen:"CartStack"})
        })
    }
    render() {
        if (this.state.loading) {
            return(
                <View>
                    <ActivityIndicator size="large" color="red" style={{justifyContent:"center",alignItems:"center"}}/>
                </View>
            )
        }
        return(
            <View style={styles.container}> 

                <StatusBar color="white" />

                        <View style={styles.header}>
                            <Text style={styles.title}>{this.state.detail.name}</Text>
                            <Image source={{uri : this.state.detail.image}} style={styles.image} />
                        </View>

                <View style={styles.description}>
                    <Text style={{fontFamily:"Raleway_bold"}}>Order Detail</Text>
                    <View>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>Quantity:</Text>
                            <Text>{this.state.quantity}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>Quantity:</Text>
                            <Text>{this.state.quantity}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>Quantity:</Text>
                            <Text>{this.state.quantity}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                            <Text>Quantity:</Text>
                            <View style={styles.counter}>
                                <TouchableOpacity onPress={() => this.quantityHandler('-')}>
                                    <AntDesign name="minus" size={15} color="white" />
                                </TouchableOpacity>
                                    <Text style={{color:"white",fontSize:20}}>{this.state.quantity}</Text>
                                <TouchableOpacity onPress={() => this.quantityHandler('+')}>
                                    <AntDesign name="plus" size={15} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.pricing}>
                            <Text style={{fontFamily:"Raleway_bold"}}>Price:</Text>
                            <View style={styles.price}>
                                <Text style={{color:"white",fontFamily:"Raleway"}}>Rs.{this.state.detail.price*this.state.quantity}</Text>
                            </View>
                        </View>

                    </View>
                </View>{/*<Text>END OF DESCRIPTION</Text>*/}
                
                <TouchableOpacity style={styles.cart} onPress={() => this.handleCart()}>
                    <Text style={{color:"white",fontFamily:"Raleway_bold",fontSize:24}}>Add to Cart   </Text>
                        <Entypo name="shopping-cart" size={22} color="white" />
                </TouchableOpacity>
                
            </View>
        )
    }
}
export default ProductPage;

const styles= StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"white"
    },
    image : {
        width : width*0.2,
        resizeMode:"cover",
        height: 70,
        borderRadius : width/2,
    },
    description : {
        margin:10,
        backgroundColor:"white",
        borderRadius : 10,
        padding : 8,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
    },

    title :{
        textAlign:"center",
        zIndex:10,
        color:"black",
        fontFamily:"Raleway_bold",
        fontSize: 20,
        alignSelf:"center"

    },
    header : {
        flexDirection:"row",
        alignContent:"center",
        justifyContent:"space-between",
        alignItems:"center",
        margin : 30
    },
    pricing : {
        width : width*0.6,
        flexDirection : "row",
        alignSelf:"center",
        marginVertical:10,
        justifyContent : "center",
        alignItems : "center"
    },
    counter : {
        flexDirection:"row",
        borderRadius: width*0.8/2,
        borderWidth : 2,
        borderColor : "white",
        padding : 1,
        backgroundColor : "#e94e87",
        width: "40%",
        justifyContent:"space-around",
        alignItems:"center"
    },
    price : {
        backgroundColor : "#e94e87",
        borderRadius: width/2,
        width : "40%",
        justifyContent : "center",
        alignItems : "center",
        marginLeft:10,
        padding: 5
    },
    cart : {
        alignSelf:"center",
        backgroundColor : "#e94e87",
        flexDirection : "row",
        padding : 8,
        borderRadius: 8,
        alignItems:"center"
    }

})