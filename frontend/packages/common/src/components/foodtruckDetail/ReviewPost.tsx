import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import axios from 'axios';
import { StarYellow, StarGray } from './Stars';

interface Props {
  truckId: number;
}

export const ReviewPost: React.FC<Props> = ({truckId}) => {
  const [write, setWrite] = useState(false)
  const [content, setContent] = useState({ content: '', starRating: 1 })

  const onChangeText = (text) => {
    content.content = text
  }

  const handleReviewPost = () => {
    if (!!content.content) {
    axios.post('/reviews/create', {...content, truckId: truckId})
    .then(response=>{
      console.log(response)
      location.reload()
    })
    .catch(err=>console.log(err))
    } else {
      alert('리뷰 내용을 입력해주세요.')
    }
  }

  const ReviewWrite = () => {
    return (
      <TouchableOpacity onPress={() => setWrite(!write)}>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ textDecorationLine: 'underline', color: '#303030' }}>리뷰 작성하기</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const ReviewInput: React.FC = () => {
    return (
      <View>
        <View style={{ flexDirection: 'row', alignContent: 'center', alignSelf: 'center', paddingVertical: 10}}>
          <TouchableOpacity onPress={()=>setContent({...content, starRating: 1})}>{content.starRating > 0 ? <StarYellow /> : <StarGray /> }</TouchableOpacity>
          <TouchableOpacity onPress={()=>setContent({...content, starRating: 2})}>{content.starRating > 1 ? <StarYellow /> : <StarGray /> }</TouchableOpacity>
          <TouchableOpacity onPress={()=>setContent({...content, starRating: 3})}>{content.starRating > 2 ? <StarYellow /> : <StarGray /> }</TouchableOpacity>
          <TouchableOpacity onPress={()=>setContent({...content, starRating: 4})}>{content.starRating > 3 ? <StarYellow /> : <StarGray /> }</TouchableOpacity>
          <TouchableOpacity onPress={()=>setContent({...content, starRating: 5})}>{content.starRating > 4 ? <StarYellow /> : <StarGray /> }</TouchableOpacity>
        </View>
        <TextInput onChangeText={(text) => onChangeText(text)} onSubmitEditing={handleReviewPost} style={styles.reviewInput} defaultValue={content.content} />
        <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
          <TouchableOpacity onPress={handleReviewPost} style={{paddingHorizontal: 10}}>
            <Text style={{ textDecorationLine: 'underline', color: '#303030' }}>리뷰 등록하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setWrite(!write)}>
            <Text style={{ textDecorationLine: 'underline', color: '#303030' }}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.menuContainer}>
      {write === false ? <ReviewWrite /> : <ReviewInput />}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    paddingHorizontal: 20,
  },
  reviewContainer: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: '#f9b895',
    borderWidth: 3
  },
  reviewInput: {
    borderWidth: 1.5,
    borderColor: '#F3BE46',
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 2
  }
})