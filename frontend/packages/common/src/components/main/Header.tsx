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

export const Header: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);
  mainStore.headerHeight = mainStore.screenHeight / 13.5;

  return (
    <View style={[styles.header, {height: mainStore.headerHeight}]}>
      <Text>Header</Text>
    </View>
  )
})

const localStyle = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: '#3f3f3f',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const styles = { ...CustomStyle, ...localStyle }