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
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

export const Header: React.FC<Props> = observer(({ history }) => {
  const mainStore = useContext(mainStoreContext);
  mainStore.headerHeight = mainStore.screenHeight / 13.5;

  // test for dev
  const devTest = () => {
    axios.get('/')
      .then((response) => { console.log(response); alert(JSON.stringify(response.data)) })
      .catch((error) => { console.log(error.response); alert(JSON.stringify(error.response.data)) })
  }

  const sellerButton = () => {
    return mainStore.isSeller ? 
      <TouchableOpacity style={{position: 'absolute', right: 10}} onPress={()=>history.push('/seller')}><View style={{ paddingVertical: 7, paddingHorizontal: 4, backgroundColor: Colors.success, borderRadius: 3 }}><Text style={{ color: Colors.white, fontSize: 12 }}>내트럭</Text></View></TouchableOpacity>
      : <></>
  }

return (
  <View style={[styles.header, { height: mainStore.headerHeight }]}>
    <Text style={styles.headerText} onPress={()=>history.replace('/')}>foodtruck 🚚 </Text>
    <TouchableOpacity style={{alignSelf: 'center'}} onPress={devTest}><View style={{ paddingVertical: 1, paddingHorizontal: 4, backgroundColor: Colors.deepcoral, borderRadius: 3 }}><Text style={{ color: Colors.white, fontSize: 12 }}>DEV</Text></View></TouchableOpacity>
    {sellerButton()}
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