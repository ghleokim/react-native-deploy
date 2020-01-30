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
import { Colors, COLOR_HEADER } from '../../static/CustomColor';
import axios from 'axios';

export const Header: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);
  mainStore.headerHeight = mainStore.screenHeight / 13.5;

  // test for dev
  const devTest = () => {
    axios({ url: mainStore.proxy + '/', method: 'get' })
      .then((response) => { console.log(response); alert(JSON.stringify(response.data)) })
      .catch((error) => { console.log(error.response); alert(JSON.stringify(error.response.data)) })
  }

return (
  <View style={[styles.header, { height: mainStore.headerHeight }]}>
    <Text style={styles.headerText}>foodtruck 🚚 </Text>
    <TouchableOpacity style={{alignSelf: 'center'}} onPress={devTest}><View style={{ paddingVertical: 1, paddingHorizontal: 4, backgroundColor: Colors.deepcoral, borderRadius: 3 }}><Text style={{ color: Colors.white, fontSize: 12 }}>DEV</Text></View></TouchableOpacity>
  </View>
)
})

const localStyle = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: `rgba(${COLOR_HEADER},0.5)`,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.header,
    borderBottomWidth: 1
  },
  headerText: {
    fontFamily: "Palatino Header",
    fontWeight: '700',
    fontSize: 24
  }
});

const styles = { ...CustomStyle, ...localStyle }