import React from 'react'
import {View,FlatList,Image,Text,ActivityIndicator,Dimensions,StyleSheet,Button} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {getSubscriptions} from '../../Services/Product'
import DateTimePicker from '@react-native-community/datetimepicker';
import {Formik} from 'formik'
import * as yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const {width,height} = Dimensions.get("window")

class Categories extends React.Component {
    constructor() {
        super();
        this.state = {
            loading : true,
            showStart : false,
            showEnd : false,
        }
    }

    async componentDidMount() {
        await getSubscriptions().then(response => {
            console.log(response)
            this.setState({
                subscriptions : response,
                loading : false,

            })
        })
    }
    handleOrder = (values) => {
        values.quantity = this.props.state.quantity,
        values.item = this.props.state.detail
        values.subscriptionType2 = this.state.subscriptions.filter(item => item.id === values.subscription && item.name)[0]
        this.props.navigation.navigate("Order Detail",{order : values})
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
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Subscribe</Text>
                <Formik
                    initialValues={{ 
                        startTime: new Date(), 
                        endTime: new Date(), 
                        timing: '',
                        subscription : 1, 
                        }}
                        onSubmit={values => this.handleOrder(values)}
                        validationSchema={yup.object().shape({
                            startTime: yup
                            .date()
                            .required(),
                            endTime: yup
                            .date()
                            .required(),
                            subscription : yup
                            .number()
                            .positive()
                            .required()
                        })}
                >
                    {({ values, handleChange, errors, setFieldTouched, touched,setFieldValue, isValid, handleSubmit }) => (
                    <View style={styles.formContainer}>
                    
                    <View style={styles.date} >
                            <Text style={{fontSize:14,fontFamily:"Raleway"}}>Start Time: </Text>
                            <TouchableOpacity onPress={() => this.setState({
                                showStart : true
                            })} style={{flexDirection:'row'}}>
                                <Text>{values.startTime.toISOString()}</Text>
                                <EvilIcons name="calendar" size={24} color="black" />
                            </TouchableOpacity>
                            {this.state.showStart && 
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={values.startTime}
                                mode='date'
                                is24Hour={true} 
                                display="calendar"
                                onChange={(e, selectedDate) => {
                                    setFieldValue('startTime',selectedDate);
                                    this.setState({
                                        showStart : false
                                    })
                                }}
                            />}
                    </View>

                    <View style={styles.date} >
                            <Text style={{fontSize:14,fontFamily:"Raleway"}}>End Time: </Text>
                            <TouchableOpacity onPress={() => this.setState({
                                showEnd : true
                            })} style={{flexDirection:'row'}}>
                                <Text>{values.endTime.toISOString()}</Text>
                                <EvilIcons name="calendar" size={24} color="black" />
                            </TouchableOpacity>
                            {this.state.showEnd && 
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={values.endTime}
                                mode='date'
                                is24Hour={true} 
                                display="calendar"
                                onChange={(e, selectedDate) => {
                                    setFieldValue('endTime',selectedDate);
                                    this.setState({
                                        showEnd : false
                                    })
                                }}
                            />}
                    </View>


                    <View style={styles.date}  >
                        <Text style={{fontSize:14,fontFamily:"Raleway"}}>Select Delivery:</Text>
                        <Picker
                            selectedValue={values.subscription}
                            onValueChange={itemValue => setFieldValue('subscription', itemValue)}
                            style={{width:width*0.5}}
                            itemStyle={{height: 30, transform: [{ scaleX: 1 }, { scaleY: 1 }]}}
                            >
                            <Picker.Item label='Select your Package' value={values.subscription} key={0} />
                            {this.state.subscriptions.map((item,index) => {
                                return(
                                    <Picker.Item label={item.name} value={item.id} key={1} />
                                )
                            })}
                        </Picker>

                        {touched.subscription && errors.subscription &&
                        <Text style={{ fontSize: 12, color: "white",textAlign:"center" }}>{errors.subscription}</Text>
                        }                  
                    </View>




                        <View style={{alignItems:"flex-end"}} >
                            <TouchableOpacity style={styles.button} disabled={!isValid} onPress={handleSubmit} >
                                <Text style={{color: "#e94e87", fontSize : 16,fontFamily: "Raleway_bold"}} >Subscibe
                                    <FontAwesome name="cart-arrow-down" size={24} color="black" />
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    )}
                </Formik>
                </View>
            </View>
        )
    }
}

export default Categories

const styles = StyleSheet.create({
    container : {
        margin:10,
        backgroundColor:"white",
        borderRadius : 10,
        padding : 8,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
        paddingHorizontal: 10,
        justifyContent : "space-between"
    },
    date : {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    title : {
        textAlign:"center",
        fontFamily:"Raleway_bold",
        fontSize: 30,
        color : "#e94e87"
    }
})
