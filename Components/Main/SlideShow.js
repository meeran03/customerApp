import React from 'react'
import {View,ScrollView,Image,Text,ActivityIndicator,Dimensions,StyleSheet} from 'react-native'
import {getBanners, getProducts} from '../../Services/mainPage'

const {width,height} = Dimensions.get("window")

class SlideShow extends React.Component {
    constructor() {
        super();
        this.state = {
            categoriesArr : [],
            loading : true
        }
    }

    async componentDidMount() {
        await getBanners().then(response => {
            console.log(response)
            this.setState({
                bannersArr : response,
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
            <ScrollView 
                horizontal 
                pagingEnabled 
                showsHorizontalScrollIndicator={false}  
                contentContainerStyle={{}}
                style={{margin: 10}}              
                >
                {this.state.bannersArr.map((item,index) => {
                    return(
                        <View key={index}>
                            <Image style={styles.image} source={{uri : item.image}}/>
                            <Text style={{textAlign:"center"}}>{item.name}</Text>
                        </View>
                    )
                })}
            </ScrollView>
        )
    }
}

export default SlideShow

const styles = StyleSheet.create({
    image : {
        width : width*0.85,
        height : 120,
        resizeMode : "cover",
        borderRadius: 10,
        marginHorizontal: 5
    }
})
