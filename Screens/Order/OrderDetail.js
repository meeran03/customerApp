import React, { Component } from 'react';
import { Dimensions, StyleSheet ,Alert} from 'react-native';
import {View,Text,Button, ActivityIndicator} from 'react-native'
import {socketBoy} from '../../Services/WebSocket'
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import OrderTile from '../../Components/Order/OrderTile'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyD-S-cuUziy083ZS2a2X_Btnr-msbXJFnw';

class Example extends Component {

  constructor(props) {
    super(props);

    // AirBnB's Office, and Apple Park
    this.state = {
      coordinates: [
        {
          latitude: 37.3317876,
          longitude: -122.0054812,
        },
        {
          latitude: 37.771707,
          longitude: -122.4053769,
        },
      ],
      loading : true,
      customer : {}
    };

    this.mapView = null;
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  }
  componentDidMount() {  
  let chatsocket = socketBoy(this.props.route.params.order.delivery_boy)
  console.log(this.props.route.params.order)
  chatsocket.onmessage = function(e) {
      console.log("Customer is",this.props.route.params.order.customer)
      this.setState({
          location : JSON.parse(e.data).location,
          customer : this.props.route.params.order.customer_detail.user,
          loading : false,
      })
    }.bind(this)
  chatsocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly',e.message);
  };
}

  render() {

    if (this.state.loading) {
        return <ActivityIndicator size="large" color="red" style={{flex:1,justifyContent:"center",alignItems:"center"}} />
    }

    return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        //region={{ latitude: this.state.location.latitude, longitude: this.state.location.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        style={StyleSheet.absoluteFill}
        ref={c => this.mapView = c}
        onPress={this.onMapPress}
      >
            <MapView.Marker coordinate={this.state.location} >
                <MaterialIcons name="delivery-dining" size={24} color="black" />
                <MapView.Callout tooltip>
                    <View style={styles.InfoCard}>
                        <Text style={{textAlign:"center",fontSize: 18,marginBottom:5,fontWeight: "900"}}>Delivery Boy</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Name:</Text>
                            <Text>{this.props.route.params.order.delivery_boy_detail.user.username}</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Phone:</Text>
                            <Text>{this.props.route.params.order.delivery_boy_detail.user.phone}</Text>
                        </View>
                    </View>
                </MapView.Callout>
            </MapView.Marker>

            <MapView.Marker coordinate={{
                     latitude : this.state.customer.latitude,
                     longitude : this.state.customer.longitude
            }} >
                <Ionicons name="person" size={24} color="black" />
                <MapView.Callout tooltip>
                    <View style={styles.InfoCard}>
                        <Text style={{textAlign:"center",fontSize: 18,marginBottom:5,fontWeight: "900"}}>Customer</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Name:</Text>
                            <Text>{this.state.customer.username}</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Phone:</Text>
                            <Text>{this.state.customer.phone}</Text>
                        </View>
                    </View>
                </MapView.Callout>
            </MapView.Marker>

          <MapViewDirections
          origin = {this.state.location}
          destination={
                     {
                     latitude : this.state.customer.latitude,
                     longitude : this.state.customer.longitude
                     }
                 }
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
                this.setState({distance : result.distance,duration : result.duration})
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)

              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 20),
                  bottom: (height / 20),
                  left: (width / 20),
                  top: (height / 20),
                }
              });
            }}
            onError={(errorMessage) => {
              // console.log('GOT AN ERROR');
            }}
          />
      </MapView>

      <View style={styles.overlay}>
            <OrderTile item={this.props.route.params.order} 
                duration={this.state.distance} 
                distance={this.state.duration}
                navigation={this.props.navigation}
                orderTrack={true}
                />
      </View>
      </View>
    );
  }
}

export default Example;

const styles = StyleSheet.create({
    InfoCard : {
        width: Dimensions.get('window').width*0.5,
        backgroundColor : "white",
        padding : 10
      },
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        width:width,
      },
})

