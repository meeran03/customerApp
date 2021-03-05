import React from 'react';
import { View, Text, Image, StyleSheet,Dimensions, TouchableOpacity,TextInput, Alert } from 'react-native';
import {Formik} from 'formik'
import * as yup from 'yup';
import { Entypo } from '@expo/vector-icons';
import {registerComplain} from '../../Services/User'
import { FontAwesome5 } from '@expo/vector-icons';


const {width,height} = Dimensions.get("window")


export default class Login extends React.Component {

 
    render() {

        async function registerComplain(values) {
            await registerComplain(values).then(() => {
                console.log("OKAYS")
            })
        }
        return (
            <View style={styles.container}>

                <View style={{paddingTop:30}} >
                <FontAwesome5 name="hands-helping" size={50} color="white" />
                </View>

                <View>
                    <Text style={styles.title}>Register Complain</Text>
                    <Text style={{textAlign: "center",fontFamily :"Raleway", marginVertical :10,color:"white"}}>Type Your Complain Below. We will Contact You soon through Email or Phone</Text>
                </View>




                    
                <Formik
          initialValues={{ 
            password: '' 
            }}
            onSubmit={values => registerComplain(values)}
            validationSchema={yup.object().shape({
                title : yup
                .string()
                .min(50)
                .required(),
                Message: yup
                  .string()
                  .min(4)
                  .required(),
              })}
          >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <View style={styles.formContainer}>
          
          <TextInput
              value={values.title}
              style={styles.inputBox}
              onChangeText={handleChange('title')}
              placeholder="Title"
              onBlur={() => setFieldTouched('title')}
            />
            {touched.title && errors.title &&
              <Text style={{ fontSize: 14, color: "black",textAlign:"center" }}>{errors.oldMessage}</Text>
            }

            <TextInput
              value={values.Message}
              multiline={true}
              numberOfLines={10}
              style={{...styles.inputBox,textAlignVertical:'top'}}
              onChangeText={handleChange('Message')}
              placeholder="Message"
              onBlur={() => setFieldTouched('Message')}
            />
            {touched.Message && errors.Message &&
              <Text style={{ fontSize: 14, color: "black",textAlign:"center" }}>{errors.Message}</Text>
            }

            <View> 
              <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={styles.button}>
                <Text style={{textAlign:"center",color:"white"}}>Register Complain</Text>
                <FontAwesome5 name="stamp" size={20} color="white" />
              </TouchableOpacity>
            </View>

          </View>
        )}
      </Formik>
            </View>
        )
          }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor : "black"
    },
    button: {
        backgroundColor:  "#e94e87",
        justifyContent:  "space-evenly",
        alignItems:"center",
        paddingBottom: 12,
        paddingTop: 12,
        marginVertical: 20,
        borderRadius: 24,
        flexDirection :"row"
    },
    inputBox : {
      borderColor: '#4e4e4e',
      padding: 8,
      marginVertical: 5,
      backgroundColor: "white",
      width: width*0.9,
      textAlign: "left",
      borderRadius : 4  ,
      backgroundColor : '#e9e8e8'
      },
    title: {
        color: "#e94e87",
        fontSize:22, 
        marginVertical: 20,
        fontFamily : "Raleway_bold",
        textAlign : "center"
      },
      image : {
        resizeMode : "contain",
        height: height*0.14,
        marginVertical : 10,
        marginTop : 60
      }
})