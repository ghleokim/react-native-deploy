import * as React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { mainStoreContext } from '../store/MainStore';
import { NewLoginForm } from '../components/auth/LoginForm';
import { SignupForm } from '../components/auth/SignUpForm';
import { loginCurrentPage, loginStoreContext } from '../store/LoginStore';
import { CustomStyle, CustomText } from '../static/CustomStyle'
import { Colors } from '../static/CustomColor';
import { RouteComponentProps } from 'react-router-dom';
import { History, LocationState } from 'history'

interface Props extends RouteComponentProps { }

interface FormProps {
  history: History<LocationState>;
  location: any;
}

const FormRouter: React.FC<FormProps> = ({ history, location }) => {
  return (
    location.pathname === '/login' ? <NewLoginForm history={history} /> : <SignupForm history={history} />
  )
}

export const RouteLogin: React.FC<Props> = observer(({ history, location, match }) => {
  const mainStore = useContext(mainStoreContext);
  const loginStore = useContext(loginStoreContext)

  const handleTapPage = () => {
    if (location.pathname === '/login') {
      history.replace('/signup')
    } else {
      history.replace('/login')
    }
  }

  const LoginNavBar: React.FC = () => {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: '#ffffff' }}>
        <TouchableOpacity onPress={handleTapPage} style={[{ flex: 1, alignItems: 'center', paddingVertical: 10 },
        location.pathname === '/login' ? { borderBottomColor: Colors.deepcoral, borderBottomWidth: 3 } : {}]}>
          <Text style={[CustomText.title, { fontSize: 18 }]}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTapPage} style={[{ flex: 1, alignItems: 'center', paddingVertical: 10 },
        location.pathname === '/signup' ? { borderBottomColor: Colors.deepcoral, borderBottomWidth: 3 } : {}]}>
          <Text style={[CustomText.title, { fontSize: 18 }]}>회원가입</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <LoginNavBar />
      <FormRouter history={history} location={location} />
    </View>
  )
})

const localStyles = StyleSheet.create({
  loginTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 16
  }
})

const styles = { ...CustomStyle, ...localStyles }