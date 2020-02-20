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
import { StarYellow, StarGray } from './Stars';

interface IProps extends IReview{
  onDelete: Function,
  truckEmail?: String,
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
      style={{ alignSelf: 'flex-start', backgroundColor: '#d91e1e', width: 60, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderRightColor: '#c00e0e', borderRightWidth: 2, }}
      onPress={handleDelete}>
      <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '700' }}>삭제하기</Text>
    </TouchableOpacity>
  }

  return (
    <View style={styles.menuContainer}>
      <View style={styles.reviewContainer}>
        <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
          <Text style={{ alignSelf: 'flex-end', color: '#505050', display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}><Text style={CustomText.italic}>{props.userEmail === null ? '' : (props.userEmail).split('@')[0]}</Text><Text> {formatDate(new Date(Date.parse(props.createdAt)))}</Text></Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          {props.starRating > 0 ? <StarYellow height={20} width={20} /> : <StarGray height={20} width={20} /> }
          {props.starRating > 1 ? <StarYellow height={20} width={20} /> : <StarGray height={20} width={20} /> }
          {props.starRating > 2 ? <StarYellow height={20} width={20} /> : <StarGray height={20} width={20} /> }
          {props.starRating > 3 ? <StarYellow height={20} width={20} /> : <StarGray height={20} width={20} /> }
          {props.starRating > 4 ? <StarYellow height={20} width={20} /> : <StarGray height={20} width={20} /> }
        </View>
        <Text style={[CustomText.body, { color: '#303030', fontSize: 16 }]}>{props.content}</Text>
        {myEmail === props.userEmail ? <DeleteButton /> : <></>}
      </View>
      <ReviewReply replies={props.replies} reviewId={props.id} writer={props.userEmail} truckId={String(props.truckId)} truckEmail={props.truckEmail} />
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