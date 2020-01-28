import React from 'react';
import {
    View,
    StyleSheet,
 } from "react-native";

 const styles = StyleSheet.create({
    line: {
      borderBottomWidth: 1,
      borderColor: '#eeeeee',
      width: '95%',
      margin: 'auto',
    },
})

export default () => {
    return (
        <View style={styles.line}></View>
      )
};
