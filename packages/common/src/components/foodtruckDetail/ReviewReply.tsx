import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, FlatList } from "react-native";
import { IReply } from './TruckInterface';
import { CustomText } from '../../static/CustomStyle';
import axios from 'axios';

interface Props {
  replies: IReply[];
}

interface ReplyProps {
  item: IReply;
}

export const ReviewReply: React.FC<Props> = ({ replies }) => {
  const myEmail = localStorage.getItem('userEmail')
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}년 ${month}월 ${day}일`;
  }
  const DeleteButton = () => {
    const handleDelete = () => {
      console.log('delete')
    }
    return <TouchableOpacity
      style={{ alignSelf: 'flex-start', backgroundColor: '#d91e1e', width: 60, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderRightColor: '#c00e0e', borderRightWidth: 2 }}
      onPress={handleDelete}>
      <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '700' }}>삭제하기</Text>
    </TouchableOpacity>
  }

  const [state, setState] = useState({
    detail: false,
  })

  console.log(replies);

  const ReplyItem : React.FC<ReplyProps> = ({item}) => {
    return <View>
      <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
        {myEmail === item.userEmail ? <DeleteButton /> : <></>}
        <Text style={{ alignSelf: 'flex-end' }}>{formatDate(new Date(Date.parse(item.createdAt)))} <Text style={CustomText.italic}>{item.userEmail === null ? '' : (item.userEmail).split('@')[0]}</Text></Text>
      </View>
      <Text style={[CustomText.title, { fontSize: 16 }]}>{item.content}</Text>
    </View>
  }

  const ReplyDetail = () => {
    return <View>
      <FlatList<IReply>
        data={replies}
        renderItem={({item})=> <View style={styles.replyDetail}><ReplyItem item={item}/></View>}
        keyExtractor={item=> item.createdAt}
        />
    </View>
  }

  return (
    <View>
      {replies.length === 0 ? <></>
        : <View style={styles.reviewContainer}>
          {state.detail === true ? <ReplyDetail /> : <ReplyItem item={replies[0]}/>}
          {replies.length === 1 ? <></> : <TouchableOpacity onPress={() => setState({ detail: !state.detail })}><Text>{state.detail === true ? '닫기' : '더 보기'}</Text></TouchableOpacity>}
        </View>
      }
    </View>
  )
}

const localStyle = StyleSheet.create({
  reviewContainer: {
    marginLeft: '5%',
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  replyDetail: {
    paddingVertical: 10,
    borderBottomColor: '#c0c0c0',
    borderBottomWidth: 1,
  }
})

const styles = { ...localStyle }