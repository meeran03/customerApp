import React from 'react'
import {View, ActivityIndicator, StyleSheet,Dimensions,Text} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../../Components/Header'
//Here we import our components
import {getCategoryProducts} from '../../Services/Category'
import ProductTile from './ProductTile'

function Categories(props) {
    console.log("this is ti ,",props.category)
    const [data,setData] = React.useState({})
    const [loading,setLoading] = React.useState(true)
    React.useEffect(() => {
            (async () => {
                await getCategoryProducts(props.category!=undefined ? props.category : props.route.params.category).then(async res => {
                    console.log(res)
                    setData(res)
                    setLoading(false)
                })
            })()
        
    },[])
    if (loading) {
        return <ActivityIndicator size="large" color="red" style={{flex:1,justifyContent:"center",alignItems:"center"}} />
    }
    return (
        <View>
            {data.map((item,index) => {
                return <ProductTile item={item} />
            })}
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor : "white"
    },
    tile : {
        margin: 10,
        marginVertical: 5,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor : "white",
        padding : 20,
        justifyContent : "space-between",
        flexDirection : "row"
    }
})
