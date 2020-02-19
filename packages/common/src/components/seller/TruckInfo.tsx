import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { CustomText } from '../../static/CustomStyle';
import {Colors} from '../../static/CustomColor'
import axios from 'axios'

interface IProps {
  notice: string,
  truckId: number,
}

export default (props: IProps) => {

  const [data, setData] = useState({ notice: props.notice });
  const [isEditing, setIsEditing] = useState({ notice: false });
  const [editText, setEditText] = useState({ notice: props.notice })

  const handleNoticeSubmitBtn = () => {
    axios.put(`trucks/update/notice/${props.truckId}`,{truckNotice: editText.notice})
      .then(({data}) => {
        setIsEditing({...{isEditing}, notice: false})
        setData({...{data}, notice: data.truckNotice})
      })
  }

  const handleNoticeCancelBtn = () => {
    editText.notice = data.notice;
    setIsEditing({...{isEditing}, notice: false})
  }

  const handleNoticeEditBtn = () => {
    setIsEditing({...{isEditing}, notice: true});
  }

  const onChangeText = (target: string, text: string) => {
    editText[target] = text;
  }

    return (
      <View style={styles.menuListContainer}>
      <View style={styles.menuListContentContainer}>
      <View style={styles.menuListTitle}>
        <Text style={[CustomText.textCenter, CustomText.titleHN, { fontSize: 22 }]}>정보</Text>
      </View>
      <View style={styles.truckInfoContent}>
      
        <View style={styles.truckInfoCard}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.truckInfoSubTitle}>가게 소개</Text>
            {isEditing.notice
              ? <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={styles.editButton} onPress={() => handleNoticeSubmitBtn()}><Text style={{textAlign: 'center', color: '#FFFFFF', fontWeight: '700', margin:0, padding:0}}>완료</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.editButton} onPress={() => handleNoticeCancelBtn()}><Text style={{textAlign: 'center', color: '#FFFFFF', fontWeight: '700', margin:0, padding:0}}>취소</Text></TouchableOpacity>
                </View>
              : <TouchableOpacity style={styles.editButton} onPress={() => handleNoticeEditBtn()}><Text style={{textAlign: 'center', color: '#FFFFFF', fontWeight: '700', margin:0, padding:0}}>수정</Text></TouchableOpacity>
            }
            </View>
          <View>
            {isEditing.notice 
              ? <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              defaultValue={editText.notice}
              onChangeText={text => onChangeText('notice', text)}
              multiline={true}
              numberOfLines={5} />
              : <Text style={{color:'#AAAAAA', lineHeight: 25, fontSize: 12}}>{data.notice}</Text>            
            }
          </View>
        </View>
  
      </View>
      </View>
      </View>
      );
};

const styles = StyleSheet.create({
  menuListContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20
  },
  menuListContentContainer: {
    borderRightWidth: 2,
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderTopWidth: 1,
    borderLeftColor: '#e6e6e8',
    borderRightColor: '#d6d6d8',
    borderBottomColor: '#86878b',
    borderTopColor: '#f6f6f8',
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: 5,
  },
  menuListTitle: {
    alignSelf: 'center',
  },
  truckInfoCard: {
    paddingVertical: 20
  },
  truckInfoSubTitle: {
    fontSize: 16,
    fontWeight: '800',
    paddingVertical: 10
  },
  truckInfoContent: {
    marginHorizontal: 10
  },
  editButton: {
    marginRight: 10,
    paddingVertical: 0,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.navy,
  },
  textInput: { 
    fontSize:12, 
    borderColor: '#303030', 
    borderBottomWidth: 2, 
    paddingVertical: 5, 
    paddingHorizontal: 6, 
    textAlign: 'left'}

})
