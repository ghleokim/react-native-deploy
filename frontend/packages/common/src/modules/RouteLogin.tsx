import * as React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { mainStoreContext } from '../store/MainStore';
import { NewLoginForm } from '../components/auth/LoginForm';
import { SignupForm } from '../components/auth/SignUpForm';
import { loginCurrentPage, loginStoreContext } from '../store/LoginStore';
import { Colors } from '../static/CustomColor';

interface RouterProps {
  currentPage: loginCurrentPage;
}

const FormRouter: React.FC<RouterProps> = ({ currentPage }) => {
  return (
    currentPage === 'login' ? <NewLoginForm /> : <SignupForm />
  )
}

export const RouteLogin: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);
  const loginStore = useContext(loginStoreContext)
  const currentPage = mainStore.currentPage

  const handleTapPage = () => {
    loginStore.loginCurrentPage === 'login' ?
      loginStore.loginCurrentPage = 'signup' : loginStore.loginCurrentPage = 'login';
  }

  return (
    <View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity onPress={handleTapPage} style={[{ flex: 1, alignItems: 'center', height: 50, paddingTop: 10 },
        loginStore.loginCurrentPage === 'login' ? { borderBottomColor: Colors.deepcoral, borderBottomWidth: 3 } : {}]}>
          <Text>login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTapPage} style={[{ flex: 1, alignItems: 'center', height: 50, paddingTop: 10 },
        loginStore.loginCurrentPage === 'signup' ? { borderBottomColor: Colors.deepcoral, borderBottomWidth: 3 } : {}]}>
          <Text>signup</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.loginTitle}>{loginStore.loginCurrentPage === 'login' ? 'welcome back !' : 'Hello new user !'}</Text>
      <FormRouter currentPage={loginStore.loginCurrentPage} />
      <View style={{minHeight: 10}}></View>
    </View>
  )
})

const styles = StyleSheet.create({
  mainBanner: {
    height: 100,
    width: '100%',
    backgroundColor: '#f3f3f3'
  },
  mainBannerImage: {
    height: 100,
    width: '100%',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 16
  }
})