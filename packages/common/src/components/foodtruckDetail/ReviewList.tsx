import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { CustomText } from '../../static/CustomStyle';
import Review from './Review';

interface IReview {
  id: number,
  content: string,
  startRating: number,
  createdAt: string,
  updatedAt: string,
  truckId: number,
  userEmail: string
}

interface IProps {
  reviewList: IReview[]
}

export default (props: IProps) => {

  return (
    <View style={styles.menuListContainer}>
      <View style={styles.menuListContentContainer}>
        <View style={styles.menuListTitle}>
          <Text style={[CustomText.textCenter, CustomText.titleHN, { fontSize: 22 }]}>리뷰</Text>
        </View>
        <FlatList<IReview>
          data={props.reviewList}
          renderItem={({ item }) =>
            <Review
              id={item.id}
              content={item.content}
              startRating={item.startRating}
              createdAt={item.createdAt}
              updatedAt={item.updatedAt}
              truckId={item.truckId}
              userEmail={item.userEmail}
            />}
          keyExtractor={item => item.userEmail}
        />
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
  }
})