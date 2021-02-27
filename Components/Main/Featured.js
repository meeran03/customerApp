import React from 'react'
import {View,ScrollView,Image,Text,ActivityIndicator,Dimensions,StyleSheet} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {getProducts} from '../../Services/mainPage'

const {width,height} = Dimensions.get("window")

class Featured extends React.Component {
    constructor() {
        super();
        this.state = {
            productsArr : [],
            loading : true
        }
    }

    async componentDidMount() {
        await getProducts().then(response => {
            console.log(response)
            this.setState({
                productsArr : response,
                loading : false
            })
        })
    }
    render() {
        if (this.state.loading) {
            return(
                <View>
                    <ActivityIndicator size="large" color="green" style={{justifyContent:"center",alignItems:"center"}}/>
                </View>
            )
        }
        return (
            <View>
                <Text style={{margin:10,fontFamily:"Raleway_bold",fontSize:25}}>Featured</Text>
                <FlatList
                        style={{}}
                        contentContainerStyle={{justifyContent:"space-evenly",alignItems:"center"}}
                        data={this.state.productsArr}
                        keyExtractor={item => item.id}
                        numColumns={1}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={(item) => {
                            return(
                                <View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ProductPage",{
                                        id : item.item.id
                                    })}>
                                        <Image source={{uri : item.item.image}} style={styles.image} />
                                        <Text style={{fontSize:12,textAlign:"center"}}>{item.item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                />
            </View>
        )
    }
}

export default Featured

const styles = StyleSheet.create({
    image : {
        width : width*0.75,
        height : 120,
        resizeMode : "cover",
        borderRadius: 10,
        marginHorizontal: 5
    }
})
