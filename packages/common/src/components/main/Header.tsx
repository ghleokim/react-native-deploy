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

export const Header: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);
  mainStore.headerHeight = mainStore.screenHeight / 13.5;

  return (
    <View style={[styles.header, {height: mainStore.headerHeight}]}>
      <Text style={styles.headerText}>foodtruck 🚚</Text>
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