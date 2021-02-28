import React, { Component } from 'react'
import {View,Text,TouchableOpacity, StyleSheet,Image,Dimensions, Alert} from 'react-native'
import {getProductDetail} from '../../Services/Product'
import {deleteCartItem} from '../../Services/Cart'

import { MaterialIcons, AntDesign } from '@expo/vector-icons';


const {width,height} = Dimensions.get("window")

export default class Card extends Component {
    constructor() {
        super();
        this.state = {
            item : {},
            loading : true
        }
    }

    async componentDidMount() {

        await getProductDetail(this.props.order.id).then(response => {
            console.log(response)
            this.setState({
                item : response,
                loading : false
            })
        })
    }

    handleDelete = async() => {
        await deleteCartItem(this.props.index).then(() => {
            Alert.alert("Delete Successful","The item was deleted Successfully")
            this.props.navigation.replace("MyTabs",{screen:"MainStack"})
        })
    }

    render() {
        return (
            <View style={styles.body}>
                <View style={{width:'36%'}}>
                    <Image source={{uri : this.state.item.image}} style={styles.image} />
                </View>
                
                <View style={{width:'43%',paddingHorizontal:3,borderRightColor:'#e94e87',borderRightWidth:2}}>
                    <View style={{borderBottomColor:'#e94e87',borderBottomWidth:2}}>
                        <View>
                            <Text style={{textAlign:"center",fontFamily:"Raleway",color:"grey"}}>{this.state.item.name}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>Quantity</Text>
                            <Text>{this.props.order.quantity}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>Type</Text>
                            <Text>{this.props.order.subscription >0 ? 'Subscription' : 'Buy Once'}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>{this.props.order.quantity}</Text>
                        </View>
                    </View>

                    <View >
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>Total</Text>
                            <Text>Rs.{this.props.order.price? this.props.order.price : 100}</Text>
                        </View>
                    </View>
                </View>

                <View style={{width:'20%',paddingHorizontal:5,alignItems:"center",justifyContent:"center"}}>
                    <TouchableOpacity style={styles.button}>
                        <AntDesign name="edit" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => this.handleDelete()}>
                        <MaterialIcons name="delete" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
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
        marginHorizontal : 5
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
