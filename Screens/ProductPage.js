import React from 'react';
import {View,Text,Image,ActivityIndicator, StyleSheet,Dimensions,ImageBackground} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons';
import Subscription from '../Components/ProductPage/Subscription'

const {width,height} = Dimensions.get("window")


import {getProductDetail} from '../Services/Product'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

class ProductPage extends React.Component {
    constructor() {
        super();
        this.state = {
            detail : {},
            loading : true,
            quantity : 1,
        }
    }
    async componentDidMount() {
        const id = this.props.route.params.id
        console.log(id)
        await getProductDetail(id).then(response => {
            console.log(response)
            this.setState({
                detail : response,
                loading : false
            })
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

    handleOrder = () => {
        let data = {}
        data.quantity = this.state.quantity,
        data.item = this.state.detail
        this.props.navigation.navigate("Order Detail",{order : data})
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

                    <ImageBackground source={{uri : this.state.detail.image}} style={styles.image} >
                        <View style={styles.header}>
                            <TouchableOpacity style={{alignSelf:'flex-start'}} onPress={()=>this.props.navigation.goBack()}>
                                <Ionicons style={{alignItems: 'flex-start',}} name="arrow-back" size={30} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.title}>{this.state.detail.name}</Text>
                            <View></View>
                        </View>
                    </ImageBackground>
                
                <View style={styles.pricing}>
                    <View style={styles.price}>
                        <Text style={{color:"white",fontFamily:"Raleway"}}>Rs.{this.state.detail.price*this.state.quantity}</Text>
                    </View>
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


                <View style={styles.description}>
                    <Text style={{fontFamily:"Raleway_bold"}}>Description</Text>
                    <Text>{this.state.detail.description}</Text>
                </View>

                {this.state.detail.can_subscribe==true ? <Subscription navigation={this.props.navigation} state={this.state}/> : null}

                <View style={styles.add}>
                    <TouchableOpacity  onPress={() => this.handleOrder()}>
                        <AntDesign name="plus" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                
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
        width : width,
        height: 200,

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
        color:"white",
        fontFamily:"Raleway_bold",
        fontSize: 30,
        alignSelf:"center"

    },
    header : {
        flexDirection:"row",
        alignContent:"center",
        justifyContent:"space-between",
        alignItems:"center",
        margin: 30,
    },
    pricing : {
        width : width*0.6,
        flexDirection : "row",
        alignSelf:"center",
        marginVertical:10,
        justifyContent : "center"
    },
    counter : {
        flexDirection:"row",
        borderRadius: width*0.8/2,
        borderWidth : 2,
        borderColor : "white",
        padding : 7,
        backgroundColor : "#e94e87",
        width: "60%",
        justifyContent:"space-around",
        alignItems:"center"
    },
    price : {
        backgroundColor : "#e94e87",
        borderRadius: width/2,
        width : "40%",
        justifyContent : "center",
        alignItems : "center",
    },
    add : {
        position:"absolute",
        bottom : 10,
        backgroundColor : '#e94e87',
        padding : 10,
        borderRadius : width/2,
        right:10
    }
})