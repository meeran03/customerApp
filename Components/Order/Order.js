import React from 'react'
import {View,Text,Alert, ActivityIndicator, StyleSheet} from 'react-native'
import {getOrderProducts,updateOrder} from '../../Services/Order'
import { TouchableOpacity } from 'react-native-gesture-handler'


class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            data : [],
            loading : true,
            price : 1,
        }
    }
    
  async componentDidMount() {
    await getOrderProducts(this.props.item.id).then((res) => {
        console.log("Products are : ",res)
        this.setState({
            products : res,
            loading : false,
        })
    })

  }


    render() {
        if (this.state.loading) {
            return <ActivityIndicator size="small" color="red" style={{flex:1,justifyContent:"center",alignItems:"center"}} />
        }
        return (
            <View style={styles.container}>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Text style={{fontSize:12,fontFamily:"Raleway_medium",color:"#e94e87"}}>ORDER ID:</Text>
                    <Text style={{fontSize:12,fontFamily:"Raleway_medium",color:"grey"}}>{this.props.item.id}</Text>
                </View>

                <View style={{flexDirection:"row",paddingTop:5,justifyContent:"space-between"}}>
                    <Text style={{fontFamily:"Raleway_medium",color:"grey"}}>Status:</Text>
                    <Text style={{fontFamily:"Raleway_medium",color:"grey"}}>{(this.props.item.status).toUpperCase()}</Text>
                </View>

                <View style={{flexDirection:"row",paddingTop:5,justifyContent:"space-between"}}>
                    <Text style={{fontFamily:"Raleway_medium",color:"grey"}}>Distance Left:</Text>
                    <Text style={{fontFamily:"Raleway_medium",color:"grey"}}>{this.props.distance} kms</Text>
                </View>

                <View style={{flexDirection:"row",paddingTop:5,justifyContent:"space-between"}}>
                    <Text style={{fontFamily:"Raleway_medium",color:"grey"}}>Time Left:</Text>
                    <Text style={{fontFamily:"Raleway_medium",color:"grey"}}>{this.props.duration} mins</Text>
                </View>

                <View style={{flexDirection:"row",justifyContent:"space-between",paddingVertical:5}}>
                    <Text style={{fontSize:12,fontFamily:"Raleway_medium",color:"#e94e87"}}>ORDER PRODUCTS:</Text>
                </View>

                {this.state.products.map((product,index) => {
                    return(
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{fontFamily:"Raleway_medium",color:"grey"}}>{(product.product_detail.name).toUpperCase()}</Text>
                        <Text style={{fontFamily:"Raleway_medium",color:"grey"}}>{product.quantity}</Text>
                    </View>
                    )
                })}

                <View style={{flexDirection:"row",justifyContent:"space-between",paddingVertical:10}}>
                    <Text style={{fontSize:16,fontFamily:"Raleway_medium",color:"#e94e87"}}>TOTAL PRICE:</Text>
                    <Text style={{fontSize:16,fontFamily:"Raleway_medium",color:"#e94e87"}}>{this.props.item.price}</Text>
                </View>

                <View style={{flexDirection:"row",justifyContent:"space-evenly",paddingVertical:10}}>
                    <TouchableOpacity style={{backgroundColor:"#e94e87",padding:8}} 
                        onPress={() => this.props.navigation.navigate("Chat",{
                            order : this.props.item
                        })}
                    >
                        <Text style={{color:"white"}}>Rider Chat</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor:"#e94e87",padding:8}} 
                        onPress={() => createTwoButtonAlert(() => updateOrder(this.props.item.id))}
                    >
                        <Text style={{color:"white"}}>Mark as Complete</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )}
}

export default Orders

const styles = StyleSheet.create({
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


function createTwoButtonAlert (func) {
    Alert.alert(
        "Complete the current order",
        "Are you sure you want to mark the order as complete",
        [
          {
            text: "Cancel",
            onPress: () => console.log("cancelled"),
            style: "cancel"
          },
          { text: "OK", onPress: () => func() }
        ],
        { cancelable: false }
      );
}