import React from 'react';
import {StyleSheet, View, Text,TextInput,Dimensions, TouchableOpacity,Image,ScrollView} from 'react-native'
import {Formik} from 'formik'
import * as yup from 'yup';
import {styles} from '../../styles/auth'
import {signUser} from '../../Services/User'
import AsyncStorage from '@react-native-async-storage/async-storage'



function Login( {navigation}) {


    async function handleLogin(values) {
        await signUser(values.username,values.password).then(async res => {
            try {
              await AsyncStorage.setItem('token', res.token)
              await AsyncStorage.setItem('user', JSON.stringify(res.user))
              await AsyncStorage.setItem('customer', JSON.stringify(res.customer))
              console.log("Customer is :",res.customer)
              if (res) {
                navigation.navigate("MyTabs", {screen : "MainStack", params : {
                }})
              }
            } catch (e) { 
                console.log(e)
            }
        })
    }
return (
    <ScrollView 
        style={styles.container}
        contentContainerStyle={{justifyContent: "center",alignItems:"center"}}
    >
        <Formik
          initialValues={{ 
            username: '', 
            password: '' 
            }}
            onSubmit={values => handleLogin(values)}
            validationSchema={yup.object().shape({
                username: yup
                  .string()
                  .required(),
                password: yup
                  .string()
                  .min(5)
                  .required(),
              })}
          >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <View style={styles.formContainer}>
          
        <View>
            <Image style={styles.logo} source={require("../../assets/images/logo.png")} />
            <Text style={styles.title}>Doodhwaley</Text>
        </View>

        <View style={styles.input} >
            <TextInput
              value={values.username}
              style={styles.inputBox}
              onChangeText={handleChange('username')}
              onBlur={() => setFieldTouched('username')}
              placeholderTextColor="grey"
              placeholder="Username"
            />
            {touched.username && errors.username &&
              <Text style={{ fontSize: 12, color: "white",textAlign:"center" }}>{errors.username}</Text>
            }
        </View>


        <View style={styles.input}  >
            <TextInput
              value={values.password}
              style={styles.inputBox}
              onChangeText={handleChange('password')}
              placeholderTextColor="grey"
              placeholder="Password"
              onBlur={() => setFieldTouched('password')}
              secureTextEntry={true}
            />  

            {touched.password && errors.password &&
            <Text style={{ fontSize: 12, color: "white",textAlign:"center" }}>{errors.password}</Text>
            }                  
        </View>




            <View style={{alignItems:"flex-end"}} >
                <TouchableOpacity style={styles.button} disabled={!isValid} onPress={handleSubmit} >
                    <Text style={{color: "white", fontSize : 16,fontFamily: "Raleway_bold"}} >Sign In</Text>
                </TouchableOpacity>
            </View>

          </View>
        )}
      </Formik>

      <View style={{ flexDirection:"row",marginTop: 0,justifyContent : "center"}}>
                        <Text style={{color: "white"}}>Forgot Your Password? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword") }>
                            <Text style={{color:"#e94e87",fontFamily:"Raleway_bold"}}>Reset</Text>
                        </TouchableOpacity>
                        <Text style={{color: "white"}}> Here</Text>
        </View> 

        <View style={{ flexDirection:"row",marginTop: 20,justifyContent : "center"}}>
                        <Text style={{color: "white"}}>New Here? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register") }>
                            <Text style={{color:"#e94e87",fontFamily:"Raleway_bold"}}>Sign Up</Text>
                        </TouchableOpacity>
                        <Text style={{color: "white"}}> Instead</Text>
        </View>

                </ScrollView>
        );
}

export default Login;

