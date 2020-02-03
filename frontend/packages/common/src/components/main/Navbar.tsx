import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { observer } from 'mobx-react-lite';
import { mainStoreContext } from '../../store/MainStore';
import { CustomStyle } from '../../static/CustomStyle';
import { COLOR_HEADER } from '../../static/CustomColor';
import { searchResultContext } from '../../store/SearchStore';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

export const Navbar: React.FC<Props> = observer(({ history }) => {
  const mainStore = useContext(mainStoreContext);
  const searchResultStore = useContext(searchResultContext)

  const AuthButton = () => {
    if (mainStore.isLoggedIn === false) {
      return <TouchableOpacity onPress={() => history.push('/login')} style={styles.navButton}>
        <Image
          style={styles.navButtonImage}
          source={require('@foodtruckmap/common/src/static/icon_processed/noun_User_1485759.png')}
        />
        <Text style={styles.navButtonText}>Login</Text>
      </TouchableOpacity>
    } else {
      return <TouchableOpacity onPress={() => history.push('/mypage')} style={styles.navButton}>
      <Image
        style={styles.navButtonImage}
        source={require('@foodtruckmap/common/src/static/icon_processed/noun_User_1485759.png')}
      />
      <Text style={styles.navButtonText}>Mypage</Text>
    </TouchableOpacity>
    }
  }

  mainStore.footerHeight = 80;

  return (
    <View style={[styles.footer]}>
      <TouchableOpacity onPress={() => history.replace('/')} style={styles.navButton}>
        <Image
          style={styles.navButtonImage}
          source={require('@foodtruckmap/common/src/static/icon_processed/noun_main_1902023.png')}
        />
        <Text style={styles.navButtonText}>Main</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => history.push('/map')} style={styles.navButton}>
        <Image
          style={styles.navButtonImage}
          source={require('@foodtruckmap/common/src/static/icon_processed/noun_Map_1485766.png')}
          />
        <Text style={styles.navButtonText}>Map</Text>
      </TouchableOpacity>
      {AuthButton()}
    </View>
  )
})

const localStyle = StyleSheet.create({
  footer: {
    position: 'absolute',
    height: 80,
    paddingBottom: 30,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: `rgba(${COLOR_HEADER},0.5)`,
    flexDirection: 'row'
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column"
  },
  navButtonImage: {
    tintColor: '#505050',
    height: 35,
    width: 35,
    resizeMode: 'cover',
    overflow: 'hidden',
    marginBottom: -5
  },
  navButtonText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#505050'
  }
});

const styles = { ...CustomStyle, ...localStyle }