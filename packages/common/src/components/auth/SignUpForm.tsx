import React, { Component, useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";
import axios from 'axios';
import { CustomStyle, CustomText } from "../../static/CustomStyle";
import { mainStoreContext } from "../../store/MainStore";
import { loginStoreContext } from "../../store/LoginStore";
import { Colors } from "../../static/CustomColor";
import { observer } from "mobx-react-lite";
import { History, LocationState } from 'history';

interface Props {
  history: History<LocationState>;
}

export const SignupForm: React.FC<Props> = observer(({ history }) => {
  const mainStore = useContext(mainStoreContext);
  const loginStore = useContext(loginStoreContext);
  let [canSubmit, setCanSubmit] = useState(false);
  let [isValid, setIsValid] = useState({
    'tooShortUsernameLength': false,
    'tooLongUsernameLength': false,
    'validEmail': true,
    'tooShortPasswordLength': false,
    'tooLongPasswordLength': false,
    'samePassword': true,
  });

  const MIN_USERNAME_LENGTH = 2;
  const MAX_USERNAME_LENGTH = 8;
  const MIN_PASSWORD_LENGTH = 6;
  const MAX_PASSWORD_LENGTH = 20;
  
  const handleCanSubmit = (isValidTemp) => {
    setCanSubmit(
      loginStore.signupEmail != ''
      && loginStore.signupName != ''
      && loginStore.signupPass != ''
      && loginStore.signupPass2 != ''
      && !isValidTemp.tooShortPasswordLength 
      && !isValidTemp.tooLongPasswordLength 
      && !isValidTemp.tooShortUsernameLength 
      && !isValidTemp.tooLongUsernameLength 
      && isValidTemp.samePassword 
      && isValidTemp.validEmail
    )
  }

  const handleEmail = (email: string) => {
    loginStore.signupEmail = email;
    const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[a-zA-Z_-]{2,}){1,2}$/;
    let isValidTemp = {...isValid, validEmail: reg_email.test(email)}
    if (loginStore.signupEmail == '') {
      isValidTemp = {...isValidTemp, validEmail: true};
    }
    setIsValid({...isValidTemp});
    handleCanSubmit(isValidTemp);
  }

  const handlePassword = (pass: string) => {
    loginStore.signupPass = pass;
    let isValidTemp = {...isValid}; 
    if (loginStore.signupPass == '') {
      isValidTemp = ({...isValidTemp, tooShortPasswordLength: false, tooLongPasswordLength: false, samePassword: true});
    } else {
      isValidTemp = {...isValidTemp, 
        tooShortPasswordLength: loginStore.signupPass.length < MIN_PASSWORD_LENGTH,
        tooLongPasswordLength: loginStore.signupPass.length > MAX_PASSWORD_LENGTH,
        samePassword: loginStore.signupPass === loginStore.signupPass2};
    }

    if (loginStore.signupPass2 == '') {
      isValidTemp = {...isValidTemp, samePassword: true};
    }

    setIsValid({...isValidTemp});
    handleCanSubmit(isValidTemp);
  }

  const handlePassword2 = (pass: string) => {
    loginStore.signupPass2 = pass;
    let isValidTemp = {...isValid, samePassword: loginStore.signupPass === loginStore.signupPass2 || loginStore.signupPass2 == ''}

    setIsValid({...isValidTemp});
    handleCanSubmit(isValidTemp);
  }

  const handleName = (name: string) => {
    loginStore.signupName = name;
    let isValidTemp = {...isValid}
    if (loginStore.signupName == '') {
      isValidTemp = {...isValidTemp, tooLongUsernameLength: false, tooShortUsernameLength: false };
    } else {
      isValidTemp = {...isValidTemp, 
        tooShortUsernameLength: loginStore.signupName.length < MIN_USERNAME_LENGTH, 
        tooLongUsernameLength: loginStore.signupName.length > MAX_USERNAME_LENGTH};
    }
    setIsValid({...isValidTemp});
    handleCanSubmit(isValidTemp);
  }

  const handleSignUp = (name: string, email: string, pass: string) => {

    if (!canSubmit) {
      return;
    }
    
    if (loginStore.signupPass !== loginStore.signupPass2) {
      return;
    }

    if (loginStore.signupPass.includes(" ")) {
      alert("비밀번호에 공백은 허용하지 않습니다.")
      return;
    }

    if (loginStore.signupName.includes(" ")) {
      alert("닉네임에 공백은 허용하지 않습니다.")
      return;
    }

    canSubmit = false;
    axios.post('/users/sign_up',{
        userName: name,
        userEmail: email,
        userPassword: pass
      })
      .then((response) => {
      alert(response.data.message);
      if (response.status === 200) {
        history.replace('/login')
      }
    })
      .catch(function (error) {
        canSubmit = true;
        alert(error.response.data.message);
      });
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
      <View style={{ flex: 3 }}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={require('@foodtruckmap/common/src/static/img/foodtruck.png')}
        />
        <Text style={[CustomText.logo, { paddingVertical: '10%', paddingHorizontal: '10%', position: 'absolute', textAlign: 'center', color: '#ffffff' }]}><Text style={{backgroundColor: 'rgba(236, 76, 100, 0.7)'}}> 회원가입 후 {"\n"} 푸드트럭 정보를 찾아보세요 ! </Text></Text>
        {/* <Text style={{position: 'absolute', bottom: 5, right: 10, color: '#ffffff', backgroundColor: 'rgba(230,76,76,0.8)'}}>Photo by REVOLT on Unsplash</Text> */}
      </View>
      <View style={{ flex: 2 }}>
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
          {isValid.tooShortUsernameLength && <Text style={LocalStyles.warning}>닉네임은 {MIN_USERNAME_LENGTH}자리 이상이어야 합니다.</Text>}
          {isValid.tooLongUsernameLength && <Text style={LocalStyles.warning}>닉네임은 {MAX_USERNAME_LENGTH}자리 이하이어야 합니다.</Text>}
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
          {!isValid.validEmail && <Text style={LocalStyles.warning}>유효하지 않은 이메일 입니다.</Text>}
          
        </View>
        <View style={styles.inputContainer}>
          <Text style={LocalStyles.caption}>비밀번호</Text>

          <TextInput
            style={[styles.input, LocalStyles.form]}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={handlePassword}
          />
          {isValid.tooShortPasswordLength && <Text style={LocalStyles.warning}>비밀번호는 {MIN_PASSWORD_LENGTH}자리 이상이어야 합니다.</Text>}
          {isValid.tooLongPasswordLength && <Text style={LocalStyles.warning}>비밀번호는 {MAX_PASSWORD_LENGTH}자리 이하이어야 합니다.</Text>}

          </View>

        <View style={styles.inputContainer}>
        <Text style={LocalStyles.caption}>비밀번호 확인</Text>

        <TextInput
          style={[styles.input, LocalStyles.form]}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={handlePassword2}
        />
        {!isValid.samePassword && <Text style={LocalStyles.warning}>비밀번호가 일치하지 않습니다</Text>}

      </View>
        <View style={[styles.inputContainer, { paddingTop: 15, paddingBottom: 5 }]}>


        {canSubmit ?
          <TouchableOpacity
            style={[styles.buttons, LocalStyles.form]}
            onPress={() => handleSignUp(loginStore.signupName, loginStore.signupEmail, loginStore.signupPass)}
          >
          <Text style={{ color: Colors.white, fontSize:16, fontWeight: '700' }}>회원가입</Text> 
          </TouchableOpacity>
              :
          <TouchableOpacity
              style={[styles.disableButtons, LocalStyles.form]}
              onPress={() => handleSignUp(loginStore.signupName, loginStore.signupEmail, loginStore.signupPass)}
          >
          <Text style={{ color: Colors.white, fontSize:16, fontWeight: '700' }}>회원가입</Text> 
            </TouchableOpacity>
        }
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
  },
  warning: {
    width: '80%',
    color: 'red',
    alignSelf: 'center',
    fontSize: 13,
    marginVertical: 5,
    marginLeft: 10
  }
});

const styles = { ...CustomStyle, ...LocalStyles }