import React from 'react'
import {View,Text,Dimensions, ActivityIndicator,TouchableOpacity,ScrollView,StyleSheet} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'
import {Alert} from 'react-native'
import MapView,{Marker} from 'react-native-maps'
import {updateLocation} from '../../Services/User'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { EvilIcons } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
        <View style={{flex:1}} keyboardShouldPersistTaps>
            <GooglePlacesAutocomplete
                //GooglePlacesDetailsQuery={{ fields: 'geometry', }}
                styles={{
                    container : {
                        zIndex : 8,
                        marginTop : 10
                    },
                    textInputContainer: {
                        alignItems : "center"
                    },
                    textInput: {
                      height: 38,
                      color: '#5d5d5d',
                      fontSize: 16,
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb',
                    }
                }}
                currentLocation
                fetchDetails={true}
                placeholder='Search'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log("The data is ", details);
                    setAddress(details.formatted_address)
                    setLocation({
                        coords : {
                            latitude : details.geometry.location.lat,
                            longitude : details.geometry.location.lng,
                        }
                    })
                }}
                query={{
                    key: 'AIzaSyD-S-cuUziy083ZS2a2X_Btnr-msbXJFnw',
                    language: 'en',
                }}
                renderRightButton={(item) => <EvilIcons name="search" size={24} color="black" />}
                />
            <MapView
                initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    }}
                style={StyleSheet.absoluteFill}
                region={{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
            >
                <Marker
                    coordinate={location.coords}
                    title="My Marker"
                    description="Some description"
                />
            </MapView>
            <View style={{
                        margin: 10,
                        shadowColor: 'grey',
                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 8,
                        elevation: 5,
                        backgroundColor : "white",
                        padding : 10}
            }>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Text style={{fontSize:12,fontFamily:"Raleway_medium",color:"#e94e87"}}>Your Location:</Text>
                </View>
                <View style={{flexDirection:"row",paddingTop:5,justifyContent:"space-between"}}>
                    <Text style={{fontFamily:"Raleway_medium",color:"grey"}}>{(address)}</Text>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-evenly",paddingVertical:10}}>
                    <TouchableOpacity style={{backgroundColor:"#e94e87",padding:8}} onPress={setLocationFun}>
                        <Text style={{color:"white"}}>Set Location</Text>
                    </TouchableOpacity>

                </View>
            </View>
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
