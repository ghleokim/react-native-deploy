import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { mainStoreContext } from '../../store/MainStore';
import { CustomStyle } from '../../static/CustomStyle';
import { COLOR_HEADER } from '../../static/CustomColor';

export const Navbar: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);

  mainStore.footerHeight = 80;

  return (
    <View style={[styles.footer]}>
      <TouchableOpacity onPress={() => mainStore.currentPage = "mainPage"} style={styles.navButton}>
        <Image
          style={styles.navButtonImage}
          source={require('@foodtruckmap/common/src/static/icon_processed/noun_main_1902023.png')}
        />
        <Text style={styles.navButtonText}>Main</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => mainStore.currentPage = "loginPage"} style={styles.navButton}>
        <Image
          style={styles.navButtonImage}
          source={require('@foodtruckmap/common/src/static/icon_processed/noun_User_1485759.png')}
        />
        <Text style={styles.navButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => mainStore.currentPage = "mapPage"} style={styles.navButton}>
        <Image
          style={styles.navButtonImage}
          source={require('@foodtruckmap/common/src/static/icon_processed/noun_Map_1485766.png')}
        />
        <Text style={styles.navButtonText}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => mainStore.currentPage = "truckDetailPage"} style={styles.navButton}>
        <Text style={styles.navButtonText}>TruckDetail</Text>
      </TouchableOpacity>
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
    height: 30,
    width: 30,
    resizeMode: 'cover',
    overflow: 'hidden'
  },
  navButtonText: {
    fontWeight: '300',
    fontSize: 8,
    color: '#303030'
  }
});

const styles = { ...CustomStyle, ...localStyle }