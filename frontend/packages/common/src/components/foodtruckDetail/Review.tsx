import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { CustomText } from '../../static/CustomStyle';
import Line from '../Line';
import axios from 'axios';
import { IReview } from './TruckInterface';
import { ReviewReply } from './ReviewReply';

interface IProps extends IReview{
  onDelete: Function,
}

export default (props: IProps) => {

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}년 ${month}월 ${day}일`;
  }

  const myEmail = localStorage.getItem('userEmail')

  const DeleteButton = () => {
    const handleDelete = () => {
      axios.delete(`/reviews/delete/${props.id}`)
        .then(response => {
          props.onDelete(props.id)
          alert('삭제되었습니다.')
        })
        .catch(err => console.log(err))
    }

    return <TouchableOpacity
      style={{ alignSelf: 'flex-start', backgroundColor: '#d91e1e', width: 60, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderRightColor: '#c00e0e', borderRightWidth: 2 }}
      onPress={handleDelete}>
      <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '700' }}>삭제하기</Text>
    </TouchableOpacity>
  }

  return (
    <View style={styles.menuContainer}>
      <View style={styles.reviewContainer}>
        <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
          {myEmail === props.userEmail ? <DeleteButton /> : <></>}
          <Text style={{ alignSelf: 'flex-end' }}>{formatDate(new Date(Date.parse(props.createdAt)))} <Text style={CustomText.italic}>{props.userEmail === null ? '' : (props.userEmail).split('@')[0]}</Text></Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>{props.starRating}/5</Text>
          <Image source={require('@foodtruckmap/common/src/static/icon_processed/star.png')} style={{ height: 20, width: 20, tintColor: props.starRating > 0 ? '#feb246' : '#c0c0c0'}}/>
          <Image source={require('@foodtruckmap/common/src/static/icon_processed/star.png')} style={{ height: 20, width: 20, tintColor: props.starRating > 1 ? '#feb246' : '#c0c0c0'}}/>
          <Image source={require('@foodtruckmap/common/src/static/icon_processed/star.png')} style={{ height: 20, width: 20, tintColor: props.starRating > 2 ? '#feb246' : '#c0c0c0'}}/>
          <Image source={require('@foodtruckmap/common/src/static/icon_processed/star.png')} style={{ height: 20, width: 20, tintColor: props.starRating > 3 ? '#feb246' : '#c0c0c0'}}/>
          <Image source={require('@foodtruckmap/common/src/static/icon_processed/star.png')} style={{ height: 20, width: 20, tintColor: props.starRating > 4 ? '#feb246' : '#c0c0c0'}}/>
        </View>
        <Text style={[CustomText.title, { fontSize: 16 }]}>{props.content}</Text>
      </View>
      <ReviewReply replies={props.replies} reviewId={props.id} writer={props.userEmail} truckId={String(props.truckId)} />
    </View>
  );

};

const styles = StyleSheet.create({
  menuContainer: {
    borderBottomColor: '#969698',
    borderBottomWidth: 2,
    borderStyle: "dashed",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'column',
    flex: 1
  },
  reviewContainer: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: '#f9b895',
    borderWidth: 3
  },
  reviewContent: {

  }
})