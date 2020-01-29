import React, { Component, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import axios from 'axios';
import { CustomStyle } from "../../static/CustomStyle";
import { mainStoreContext } from "../../store/MainStore";
import { loginStoreContext } from "../../store/LoginStore";
import { Colors } from "../../static/CustomColor";
import { observer } from "mobx-react-lite";

export const SignupForm: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);
  const loginStore = useContext(loginStoreContext);

  const handleEmail = (email: string) => {
    loginStore.signupEmail = email;
  }

  const handlePassword = (pass: string) => {
    loginStore.signupPass = pass;
  }

  const handleName = (name: string) => {
    loginStore.signupName = name;
  }

  const handleSignUp = (name: string, email: string, pass: string) => {
    axios({
      url: mainStore.proxy + '/users/sign_up/',
      method: 'post',
      data: {
        userName: name,
        userEmail: email,
        userPassword: pass
      }
    }).then((response) => {
      console.log(response);
      // 현재 내부 state에서 필요한 값을 유지하도록 구현하였다. 라우팅할 때 쓰일 수 있을 듯.
      loginStore.responsedata = response.data

      localStorage.setItem(
        "signupInfo",
        loginStore.responsedata
      )
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={LocalStyles.caption}>이름</Text>

        <TextInput
          style={[styles.input, LocalStyles.form]}
          underlineColorAndroid="transparent"
          placeholder="Name"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={handleName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={LocalStyles.caption}>이메일</Text>

        <TextInput
          style={[styles.input, LocalStyles.form]}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={handleEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={LocalStyles.caption}>비밀번호</Text>

        <TextInput
          style={[styles.input, LocalStyles.form]}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={handlePassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={[styles.buttons, LocalStyles.form]}
          onPress={() => handleSignUp(loginStore.signupName, loginStore.signupEmail, loginStore.signupPass)}
        >
          <Text style={{ color: Colors.white }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  )
})

const LocalStyles = StyleSheet.create({
  form: {
    width: '80%',
    alignSelf: 'center'
  },
  caption: {
    width: '80%',
    color: '#a0a0a0',
    alignSelf: 'center',
    fontSize: 13,
    marginVertical: 5,
    marginLeft: 10
  }
});

const styles = { ...CustomStyle, ...LocalStyles }