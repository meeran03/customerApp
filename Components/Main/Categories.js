import React from 'react'
import {View,FlatList,Image,Text,ActivityIndicator,Dimensions,StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {getCategories} from '../../Services/mainPage'

const {width,height} = Dimensions.get("window")

class Categories extends React.Component {
    constructor() {
        super();
        this.state = {
            categoriesArr : [],
            loading : true
        }
    }

    async componentDidMount() {
        await getCategories().then(response => {
            this.setState({
                categoriesArr : response,
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
                <Text style={{margin:10,fontFamily:"Raleway_bold",fontSize:25}}>Categories</Text>
                <View>
                    <FlatList
                        style={{}}
                        contentContainerStyle={{justifyContent:"space-evenly",alignItems:"center"}}
                        data={this.state.categoriesArr}
                        keyExtractor={item => item.id}
                        pagingEnabled
                        numColumns={3}
                        renderItem={(item) => {
                            return(
                                <View>
                                    <TouchableOpacity>
                                        <Image source={{uri : item.item.image}} style={styles.image} />
                                        <Text style={{fontSize:12,textAlign:"center"}}>{item.item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        )
    }
}

export default Categories

const styles = StyleSheet.create({
    image : {
        resizeMode:"cover",
        width:80,
        height:70,
        marginHorizontal:15,
        borderRadius:8
    }
})
