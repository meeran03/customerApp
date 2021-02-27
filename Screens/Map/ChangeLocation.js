import React from 'react'
import {View,Text,Dimensions, ActivityIndicator,Button} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'
import {Alert} from 'react-native'
import MapView,{Marker} from 'react-native-maps'
import {updateLocation} from '../../Services/User'

const {width,height} = Dimensions.get("window")

function ChangeLocation() {
    const [loading,setLoading] = React.useState(true)
    const [location,setLocation] = React.useState( {coords: { latitude: 37.78825, longitude: -122.4324}})
    const [mapRegion,setMapRegion] = React.useState({ latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 })
    const [address,setAddress] = React.useState("")
    React.useEffect(() => {
        (async ()=> {
            await getLocation().then(async location => {
                setLocation(location)
                let address = await Location.reverseGeocodeAsync(location.coords)
                let compAddress = 
                `${address[0].name}  ${address[0].street}  ${address[0].district}  ${address[0].subregion}  ${address[0].region},${address[0].country}`
                setAddress(compAddress)
                setLoading(false)
            })
        })()
    },[])

    const setLocationFun = async () => {
        let data = {};
        data.address= address
        data.latitude = location.coords.latitude
        data.longitude = location.coords.longitude
        await updateLocation(data);
      };

    if (loading) {
        return <ActivityIndicator size="large" color="red" style={{justifyContent:"center",alignItems:"center"}} />
    }
    return (
        <View>
            <MapView
                style={{  height: height*0.6 }}
                region={{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
            >
                <Marker
                    coordinate={location.coords}
                    title="My Marker"
                    description="Some description"
                />
            </MapView>
            <Text>Your Location is :</Text>
            <Text>{address}</Text>
            <Button title="SET LOCATION" onPress={setLocationFun} />
        </View>
    )
}

export default ChangeLocation;


export async function getLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("Location is : ",location)

return location;
}
