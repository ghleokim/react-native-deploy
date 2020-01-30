import React, { useEffect, useState, useContext } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
} from "react-native";
import MenuList from './MenuList';
import Line from '../Line'
import axios from 'axios'
import { searchResultContext, searchStoreContext } from '../../store/SearchStore';
import { mainStoreContext } from '../../store/MainStore';
import { CustomStyle, CustomText } from '../../static/CustomStyle';

interface IState {
  id: Number,
  imgURL?: string,
  title: string,
  contents: string,
  menus: []
}

export const TruckDetail: React.FC = () => {
  const mainStore = useContext(mainStoreContext)
  const searchResultStore = useContext(searchResultContext)
  const [data, setData] = useState<IState>({
    id: 0, imgURL: '', title: '', contents: '', menus: []
  });

  console.log(searchResultStore.selectedItem)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${mainStore.proxy}/trucks/${searchResultStore.selectedItem}`,
      );
      setData(result.data);
      console.log(JSON.stringify(result.data));
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
          style={{ width: '100%', height: 150, marginBottom: -30 }}
          source={{ uri: data.imgURL ? data.imgURL : '' }}
          defaultSource={{uri: `https://picsum.photos/id/${data.id ? data.id : 0}/200`}}
      />
      <View style={{paddingBottom: 10, backgroundColor: '#edaa11', width: '70%',  alignSelf: 'center', borderRadius: 9, marginBottom: 5}}>
        <View style={{ width: '100%', backgroundColor: '#f2be46', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 9, alignItems: 'center'}}>
          <Text style={[styles.titleHN, {fontSize: 24}]}>{data.title}</Text>
        </View>
      </View>
      <View style={styles.truckContentsContainer}>
        <Text style={[CustomText.italic, CustomText.body, CustomText.textCenter, {fontSize: 16}]}>{data.contents}</Text>
      </View>

      <MenuList menulist={data.menus} />
      <Line></Line>
    </View>
  )
}

export const TruckDetailDummy: React.FC = () => {
  const searchResultStore = useContext(searchResultContext)
  return (searchResultStore.isSelected === true
      ? <View style={{ height: 1000, width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <Text>{searchResultStore.selectedItem} detail - dummy. update when backend is ready.</Text>
      </View>
      : <View></View>)
}

const localStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    width: '95%',
    margin: 'auto',
  },
  intro: {
    fontSize: 10
  },
  truckContentsContainer: {
    paddingBottom: 1
  },
})

const styles = {...CustomText, ...CustomStyle, ...localStyle}