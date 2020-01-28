import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";
import axios from 'axios';
 
const proxy = "http://70.12.246.0:8001"

class SignUpForm extends Component{
  state = {
    name: "",
    email: "",
    password: "",
    responseData: "",
    responseStatus: Number
  };

  handleName = (text: string) => {
      this.setState({name: text});
  }
 
  handleEmail = (text: string) => {
    this.setState({ email: text });
  };
 
  handlePassword = (text: string) => {
    this.setState({ password: text });
  };
 
  handleSignUp = (name: string, email: string, pass: string) => {
    console.log("name :" + name + ", email :" + email + ", password :" + pass);
    // axios를 통해 서버에 데이터 보내기.
    axios({
        url: proxy + '/users/sign_up/',
        method: 'post',
        data: {
            userName: name,
            userEmail: email,
            userPassword: pass
        }
    }).then((response) => {
        console.log(response);
        // 현재 내부 state에서 필요한 값을 유지하도록 구현하였다. 라우팅할 때 쓰일 수 있을 듯.
        this.setState({responseData: response.data});
        this.setState({responseStatus: response.status});
        console.log('responseStatus : ' + this.state.responseStatus);
        console.log('responseData : ' + this.state.responseData);
    })
    .catch(function (error) {
        console.log(error);
    });
  };
 
  render() {
    return (
      <View style={styles.container}>
          <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Name"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleName}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.handleSignUp(this.state.name, this.state.email, this.state.password)}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
 
export default SignUpForm;
 
const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white"
  }
});