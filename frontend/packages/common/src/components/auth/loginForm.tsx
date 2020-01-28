import React, { Component, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";
import axios from 'axios';
import { observer } from "mobx-react-lite";
import { mainStoreContext } from "../../store/MainStore";
import { loginStoreContext } from "../../store/LoginStore";
import { CustomStyle } from "../../static/CustomStyle";

export const NewLoginForm: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);
  const loginStore = useContext(loginStoreContext);

  const handleEmail = (email: string) => {
    loginStore.userEmail = email;
  };

  // security handling required.
  const handlePassword = (pass: string) => {
    loginStore.pass = pass;
  }

  const handleLogin = (email: string, pass: string) => {
    axios({
      url: loginStore.proxy + '/users/login/',
      method: 'post',
      data: {
        userEmail: loginStore.userEmail,
        userPassword: loginStore.pass
      }
    }).then((response) => {
      console.log(response);
      // 현재 내부 state에서 필요한 값을 유지하도록 구현하였다. 라우팅할 때 쓰일 수 있을 듯.
      loginStore.responsedata = response.data

      // session 로컬 스토리지에 저장하기
      localStorage.setItem(
        "userInfo",
        loginStore.responsedata
      )
      
      // if success 추가해야됨
      if (true) {
        mainStore.loggedIn = true;
      }
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Email"
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
        onChangeText={handleEmail}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Password"
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
        onChangeText={handlePassword}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => handleLogin(loginStore.userEmail, loginStore.pass)}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
})

const proxy = 'http://70.12.246.0:8001';

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    responseData: "",
    responseStatus: Number
  };

  handleEmail = (text: string) => {
    this.setState({ email: text });
  };

  handlePassword = (text: string) => {
    this.setState({ password: text });
  };

  handleLogin = (email: string, pass: string) => {
    console.log("email :" + email + "password :" + pass);
    // axios를 통해 서버에 데이터 보내기.
    axios({
      url: proxy + '/users/login/',
      method: 'post',
      data: {
        userEmail: email,
        userPassword: pass
      }
    }).then((response) => {
      console.log(response);
      // 현재 내부 state에서 필요한 값을 유지하도록 구현하였다. 라우팅할 때 쓰일 수 있을 듯.
      this.setState({ responseData: response.data });
      this.setState({ responseStatus: response.status });
      console.log('responseStatus : ' + this.state.responseStatus);
      console.log('responseData : ' + this.state.responseData);

      // session 로컬 스토리지에 저장하기
      localStorage.setItem(
        "userInfo",
        this.state.responseData
      )
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
          onPress={() => this.handleLogin(this.state.email, this.state.password)}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginForm;

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