import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../static/CustomColor';
import { CustomStyle, CustomText } from '../../static/CustomStyle';

interface MyInfo {
  name: String,
  email: String,
  isSeller: Boolean,
}

interface Props {
  myInfo: MyInfo
}

export const MyPageInfo : React.FC<Props> = ({myInfo}) => {
  return (
    <View style={styles.myinfoContainer}>
      <Text style={[CustomText.titleHN, {fontSize: 24}]}>내 정보</Text>
      <View style={styles.textInline}>
        <Text style={{...CustomText.titleHN, fontSize: 20}}>{myInfo.name}</Text>
        <Text style={{...CustomText.titleHN, fontSize: 14, color: Colors.navy, fontWeight: '700'}}>{myInfo.isSeller ? ' 판매자' : ' 구매자'}</Text>
      </View>
      <View style={styles.textInline}>
        <Text style={{...CustomText.body, color: Colors.darkGray}}>내 이메일 주소 </Text>
        <Text>{myInfo.email}</Text>
      </View>
    </View>
  )
}

const LocalStyles = StyleSheet.create({
  myinfoContainer: {
    paddingHorizontal: '10%',
    paddingTop: 20
  },
  textInline: {
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'baseline'
  }
})

const styles = { ...CustomStyle, ...LocalStyles }