import * as React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { mainStoreContext } from '../store/MainStore';
import LoginForm from '../components/auth/LoginForm';
import { observer } from 'mobx-react-lite';

export const RouteLogin: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);
  const currentPage = mainStore.currentPage

  return (
    <View>
      <Text style={styles.sectionTitle}>{currentPage}</Text>
      <LoginForm />
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  }
})