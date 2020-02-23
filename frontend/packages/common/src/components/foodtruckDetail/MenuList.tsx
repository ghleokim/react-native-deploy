import React, { } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import Menu from './Menu'
import { CustomText } from '../../static/CustomStyle';

interface IMenu {
  id: number,
  name: string,
  price: number,
  content: string,
  imgURL?: string,
}

interface IProps {
  menulist: IMenu[]
}

export default (props: IProps) => {

  return (
    <View style={styles.menuListContainer}>
      <View style={styles.menuListContentContainer}>
        <View style={styles.menuListTitle}>
          <Text style={[CustomText.textCenter, CustomText.titleHN, { fontSize: 22 }]}>메뉴</Text>
        </View>
        <FlatList<IMenu>
          data={props.menulist}
          renderItem={({ item }) =>
            <Menu
              name={item.name}
              price={item.price}
              id={item.id}
              imgURL={item.imgURL}
              content={item.content}
            />}

          keyExtractor={item => item.name}
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