import React, { useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";
import axios from 'axios';
import { observer } from "mobx-react-lite";
import { mainStoreContext } from "../../store/MainStore";
import { loginStoreContext } from "../../store/LoginStore";
import { CustomStyle, CustomText } from "../../static/CustomStyle";
import { Colors } from "../../static/CustomColor";
import { History, LocationState } from 'history';

interface Props {
  history: History<LocationState>;
}

export const NewLoginForm: React.FC<Props> = observer(({ history }) => {
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
    axios.post(`${mainStore.proxy}/users/login`, {
      userEmail: loginStore.userEmail,
      userPassword: loginStore.pass
    })
      .then((response) => {
        console.log(response);
        // 현재 내부 state에서 필요한 값을 유지하도록 구현하였다. 라우팅할 때 쓰일 수 있을 듯.
        mainStore.isSeller = response.data.isSeller;
        console.log('isSeller:', mainStore.isSeller)

        // session 로컬 스토리지에 저장하기
        localStorage.setItem('cookies', JSON.stringify(response.data.cookie))

        // if success 추가해야됨
        if (response.status === 200) {
          mainStore.isLoggedIn = true;
          if (response.data.isSeller === true) {
            mainStore.isSeller = true;
          }

          alert(response.statusText)

          history.push('/')
        }
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.data.message)
        alert(error.response.statusText)
      });
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
      <View style={{ flex: 3 }}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={require('@foodtruckmap/common/src/static/img/foodtruck.png')}
        />
        <Text style={[CustomText.logo, { paddingVertical: '10%', paddingHorizontal: '10%', position: 'absolute', textAlign: 'center', color: '#ffffff', }]}><Text style={{backgroundColor: 'rgba(236, 76, 100, 0.7)'}}> 로그인 후 {"\n"} 푸드트럭 정보를 찾아보세요 ! </Text></Text>
        {/* <Text style={{position: 'absolute', bottom: 5, right: 10, color: '#ffffff', backgroundColor: 'rgba(230,76,76,0.8)'}}>Photo by REVOLT on Unsplash</Text> */}
      </View>
      <View style={{ flex: 2 }}>
        <View style={[styles.inputContainer]}>
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
        <View style={[styles.inputContainer]}>
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
        <View style={[styles.inputContainer, { paddingTop: 15, paddingBottom: 5 }]}>
          <TouchableOpacity
            style={[styles.buttons, LocalStyles.form]}
            onPress={() => handleLogin(loginStore.userEmail, loginStore.pass)}
          >
            <Text style={{ color: Colors.white, fontSize:16, fontWeight: '700' }}>로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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

// Photo by REVOLT on Unsplash