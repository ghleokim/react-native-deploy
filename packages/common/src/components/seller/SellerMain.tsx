import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

import MenuList from './MenuList';
import Line from '../Line'
import axios from 'axios'

import SellerState from './SellerState'

import { mainStoreContext } from '../../store/MainStore';

interface IState {
  id: Number,
  imgURL: string,
  writer: string,
  title: string,
  contents: string,
  latitude: Number,
  longitude: Number,
  state: string,
  menus: [],
}
import { CustomStyle, CustomText } from "../../static/CustomStyle";
import EditBtn from '../EditBtn';

const LocalStyles = StyleSheet.create({
  form: {
    width: '80%',
    alignSelf: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2AC1BC',
    margin: 10,
    width: '80%',
    alignSelf: 'center'
  },
  caption: {
    width: '80%',
    color: '#a0a0a0',
    alignSelf: 'center',
    fontSize: 13,
    marginVertical: 5,
    marginLeft: 10
  }
});


export default () => {
  const [data, setData] = useState({ id: '', imgURL: '', title: '', contents: '', latitude: 0, longitude: 0, state: '', menus: [] });
  const [isEditing, setIsEditing] = useState({ id: false, imgURL: false, title: false, contents: false, latitude: false, longitude: false, state: false, menus: [] });
  const [editText, setEditText] = useState({ id: '', imgURL: '', title: '', contents: '', latitude: 0, longitude: 0, state: ''})

  const mainStore = useContext(mainStoreContext)

  useEffect(() => {
    axios.get(`/trucks/${mainStore.sellerTruckId === undefined ? '1' : mainStore.sellerTruckId}`)
      .then((res) => {
        setData(res.data.result);
        setEditText(res.data.result);
      })
  }, []);

  const EditButton = () => {
    return (
      <Image
        style={{ width: 20, height: 20 }}
        source={require('@foodtruckmap/common/src/static/icon_processed/edit_marker.png')} />
    )
  }

  const editTitleComponent = (target: string) => {
    return (
      <View>
        {isEditing[target]
          ? <View style={{ paddingHorizontal: '10%'}}>
            <TextInput
              style={[CustomText.titleHN, CustomText.textCenter, { fontSize: 24, borderBottomWidth: 2, borderBottomColor: '#303030' }]}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              defaultValue={data[target]}
              onChangeText={text => onChangeText(target, text)}
            />
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity style={[styles.menuButton, { backgroundColor: '#4177c9', }]} onPress={() => submit(target)}><Text style={{ textAlign: 'center', color: '#FFFFFF', fontWeight: '700' }}>등록</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.menuButton, { backgroundColor: '#798391', }]} onPress={() => cancel(target)}><Text style={{ textAlign: 'center', color: '#FFFFFF', fontWeight: '700' }}>취소</Text></TouchableOpacity>
            </View>
          </View>
          : <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[CustomText.titleHN, { fontSize: 24 }]}>{data.title}</Text>
            <TouchableOpacity onPress={() => getdd(target)}><EditButton /></TouchableOpacity>
          </View>
        }
      </View>
    )
  }

  const editContentComponent = (target: string) => {
    return (
      <View>
        {isEditing[target]
          ? <View>
            <TextInput
              style={[CustomText.italic, CustomText.body, CustomText.textCenter, { fontSize: 16, borderBottomWidth: 2, borderBottomColor: '#303030', paddingVertical: 5 }]}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              defaultValue={data[target]}
              onChangeText={text => onChangeText(target, text)}
            />
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity style={[styles.menuButton, { backgroundColor: '#4177c9', }]} onPress={() => submit(target)}><Text style={{ textAlign: 'center', color: '#FFFFFF', fontWeight: '700' }}>등록</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.menuButton, { backgroundColor: '#798391', }]} onPress={() => cancel(target)}><Text style={{ textAlign: 'center', color: '#FFFFFF', fontWeight: '700' }}>취소</Text></TouchableOpacity>
            </View>
          </View>
          : <View>
            <Text style={[CustomText.italic, CustomText.body, CustomText.textCenter, { fontSize: 16, paddingVertical: 5 }]}>{data.contents}</Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity style={[styles.menuButton, { backgroundColor: '#4177c9', }]} onPress={() => getdd(target)}><Text style={{ textAlign: 'center', color: '#FFFFFF', fontWeight: '700' }}>수정</Text></TouchableOpacity>
            </View>

          </View>
        }
      </View>
    )
  }

  const onChangeText = (target: string, text: string) => {
    editText[target] = text;
  }

  const submit = (target: string) => {
    let requestDto = {
      title: data.title,
      contents: data.contents,
      imgURL: data.imgURL,
      latitude: data.latitude,
      longitude: data.longitude,
    };

    requestDto[target] = editText[target];

    axios.put('/trucks/update/1', requestDto)
      .then((res) => {
        setData({ ...data , ...res.data });
      })
    getdd(target);
  }

  const cancel = (target: string) => {
    editText[target] = data[target];
    getdd(target);
  }

  const getdd = (target: string) => {
    const result = { ...isEditing };
    result[target] = !result[target];
    setIsEditing(result);
  }

  const handleUpdateMenu = (updatedMenu) => {
    const newMenus = data.menus.map(menu => menu.id === updatedMenu.id ? updatedMenu : menu);
    setData({ ...data, menus: newMenus })
  }

  const handleAddMenuSubmit = (requestDto) => {
    axios.post('/menus', requestDto)
      .then((res) => {
        console.log(res.data)
        const addedMenu = res.data;
        setData({ ...data, menus: [...data.menus, addedMenu] })
      })
  }

  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{ width: '100%', height: 150, marginBottom: -30 }}
        source={{ uri: data.imgURL ? data.imgURL : '' }}
        defaultSource={{ uri: `https://picsum.photos/id/${data.id ? data.id : 0}/200` }}
      />
      <View style={{ paddingBottom: 10, backgroundColor: '#edaa11', width: '70%', alignSelf: 'center', borderRadius: 9, marginBottom: 5 }}>
        <View style={{ width: '100%', backgroundColor: '#f2be46', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 9, alignItems: 'center' }}>
          {editTitleComponent('title')}
        </View>
      </View>

      <View style={{ paddingHorizontal: '5%' }}>
        {editContentComponent('contents')}
      </View>

      <Line></Line>

      <MenuList menulist={data.menus} handleUpdateMenu={handleUpdateMenu} handleAddMenuSubmit={handleAddMenuSubmit} ></MenuList>

      <SellerState></SellerState>
    </View>
  )
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
    paddingBottom: 10,
  },
  menuButton: {
    flex: 1,
    marginTop: 5,
    paddingVertical: 3,
    borderRadius: 6,
  },
})

const styles = { ...CustomText, ...CustomStyle, ...localStyle }