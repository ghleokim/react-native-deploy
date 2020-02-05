import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

export const ReviewPost: React.FC = () => {
  const [write, setWrite] = useState(false)
  const [content, setContent] = useState({ text: '' })

  const onChangeText = (text) => {
    content.text = text
  }

  const handleReviewPost = () => {
    console.log(content.text)
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
        <TextInput onChangeText={(text) => onChangeText(text)} onSubmitEditing={handleReviewPost} style={styles.reviewInput} defaultValue={content.text} />
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