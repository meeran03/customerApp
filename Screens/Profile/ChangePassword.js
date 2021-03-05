import React from 'react';
import { View, Text, Image, StyleSheet,Dimensions, TouchableOpacity,TextInput, Alert } from 'react-native';
import {Formik} from 'formik'
import * as yup from 'yup';
import { Entypo } from '@expo/vector-icons';
import {updatePassword} from '../../Services/User'
import { MaterialCommunityIcons } from '@expo/vector-icons';



const {width,height} = Dimensions.get("window")


export default class Login extends React.Component {

 
    render() {

        async function handleLogin(values) {
            await updatePassword(values).then(() => {
                console.log("OKAYS")
            })
        }
        return (
            <View style={styles.container}>

                <View >
                  <MaterialCommunityIcons style={styles.image} name="lock-reset" size={100} color="white" />
                </View>

                <View>
                    <Text style={styles.title}>Change Password</Text>
                    <Text style={{textAlign: "center",fontFamily :"Raleway", marginVertical :10,color:"white"}}>Enter your new password below.</Text>
                </View>




                    
                <Formik
          initialValues={{ 
            password: '' 
            }}
            onSubmit={values => handleLogin(values)}
            validationSchema={yup.object().shape({
                oldpassword : yup
                .string()
                .min(4)
                .required(),
                password: yup
                  .string()
                  .min(4)
                  .required(),
                confirmPassword: yup
                  .string()
                  .required()
                  .label('Confirm password')
                  .test('passwords-match', 'Passwords do not match', function(value) {
                    return this.parent.password === value;
                  }),
              })}
          >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <View style={styles.formContainer}>
          
          <TextInput
              value={values.oldpassword}
              style={styles.inputBox}
              onChangeText={handleChange('oldpassword')}
              placeholder="Old Password"
              onBlur={() => setFieldTouched('oldpassword')}
              secureTextEntry={true}
            />
            {touched.oldpassword && errors.oldpassword &&
              <Text style={{ fontSize: 14, color: "black",textAlign:"center" }}>{errors.oldpassword}</Text>
            }

            <TextInput
              value={values.password}
              style={styles.inputBox}
              onChangeText={handleChange('password')}
              placeholder="Password"
              onBlur={() => setFieldTouched('password')}
              secureTextEntry={true}
            />
            {touched.password && errors.password &&
              <Text style={{ fontSize: 14, color: "black",textAlign:"center" }}>{errors.password}</Text>
            }

            <TextInput
              value={values.confirmPassword}
              style={styles.inputBox}
              onChangeText={handleChange('confirmPassword')}
              placeholder="Confirm Password"
              onBlur={() => setFieldTouched('confirmPassword')}
              secureTextEntry={true}
            />
            {touched.confirmPassword && errors.confirmPassword &&
              <Text style={{ fontSize: 14, color: "black",textAlign:"center" }}>{errors.confirmPassword}</Text>
            }


            <View> 
              <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={styles.button}>
                <Text style={{textAlign:"center",color:"white"}}>Save</Text>
                <Entypo name="save" size={20} color="white" />
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
        backgroundColor : "orange"
    },
    button: {
        backgroundColor:  "#e94e87",
        justifyContent:  "center",
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