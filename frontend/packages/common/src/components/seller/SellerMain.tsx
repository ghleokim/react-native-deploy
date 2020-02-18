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
import InfoList from './InfoList';
import Line from '../Line'
import axios from 'axios'

import { CustomStyle, CustomText } from "../../static/CustomStyle";
import EditBtn from '../EditBtn';
import { Navbar } from '../main/Navbar';
import SellerState from './SellerState';
import ReviewList from '../foodtruckDetail/ReviewList';
import { IReview, IReply } from './../foodtruckDetail/TruckInterface';
import Dropzone from 'react-dropzone'
import { History, LocationState } from 'history';

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
  const [editText, setEditText] = useState({ id: '', imgURL: '', title: '', contents: '', latitude: 0, longitude: 0, state: '' })
  const [navState, setNavState] = useState({
    nav: 'menu',
  })
  const [infoData, setInfoData] = useState({ id: 0, _lat: 0.0, _lng: 0.0, state: '' });
  const [review, setReview] = useState<IReview[]>([{
    id: 0, content: '', starRating: 1, createdAt: '', updatedAt: '', truckId: 0, userEmail: '', replies: [],
  }])
  
  const myTruckId = localStorage.getItem('truckId')

  useEffect(() => {
    const settingTruck = async () => {
    axios.get(`/trucks/${myTruckId === undefined ? '1' : myTruckId}`)
      .then((res) => {
        setData(res.data.result);
        setInfoData({ id: Number(myTruckId), _lat: res.data.result.latitude, _lng: res.data.result.longitude, state: res.data.result.state });
        setEditText(res.data.result);
      });
    };
    const fetchReview = async () => {
      const result = await axios(`/reviews/all/${myTruckId === undefined ? '1' : myTruckId}`,
      );
      console.log("Review: ", result.data)
      setReview(result.data);
    }
    settingTruck();
    fetchReview();
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
          ? <View style={{ paddingHorizontal: '10%' }}>
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

    axios.put(`/trucks/update/${myTruckId === undefined ? '1' : myTruckId}`, requestDto)
      .then((res) => {
        setData({ ...data, ...res.data });
      })
    getdd(target);
  }

  const imageFileReg = /\.(gif|jpg|jpeg|tiff|png|bmp)$/i
  const submitImage = (files) => {

      if (files.length === 0) {
          alert("사진이 존재하지 않습니다.");
          return;
      }

      if (files.length !== 1) {
          alert("사진을 1개만 등록해주세요.")
          return;
      }

      const file = files[0];
      const fileName = file.name;
      const fileSize = file.size;

      if (!imageFileReg.test(fileName)) {
          alert("지원하지 않는 확장자입니다.")
          return;
      }

      if (fileSize > 20000000) { // 20MB
          alert("20MB를 초과하는 이미지는 등록할 수 없습니다.")
          return;
      }
      
      const formData = new FormData();
      formData.append('userfile', file);

      axios.post("/upload", formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
            }
      })
      .then((res) => {
        isEditing['imgURL'] = true;
        onChangeText('imgURL', res.data.imgURL);
        submit('imgURL');
      })
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

  const handleDeleteMenu = (deletedMenuId) => {
    const newMenus = data.menus.filter(menu => menu.id !== deletedMenuId)
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

  const DetailNavBar: React.FC = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#ffffff' }}>
        <TouchableOpacity
          style={[
            { flex: 1, alignItems: 'center', height: 50, paddingTop: 10 },
            navState.nav === 'menu' ? { borderBottomColor: '#EDAA11', borderBottomWidth: 2 } : {}
          ]}
          onPress={() => setNavState({ ...navState, nav: 'menu' })}>
          <Text style={[CustomText.title, { fontSize: 18 }]}>메뉴</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { flex: 1, alignItems: 'center', height: 50, paddingTop: 10 },
            navState.nav === 'info' ? { borderBottomColor: '#EDAA11', borderBottomWidth: 2 } : {}
          ]}
          onPress={() => setNavState({ ...navState, nav: 'info' })}>
          <Text style={[CustomText.title, { fontSize: 18 }]}>정보</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { flex: 1, alignItems: 'center', height: 50, paddingTop: 10 },
            navState.nav === 'review' ? { borderBottomColor: '#EDAA11', borderBottomWidth: 2 } : {}
          ]}
          onPress={() => setNavState({ ...navState, nav: 'review' })}>
          <Text style={[CustomText.title, { fontSize: 18 }]}>리뷰</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const DetailNavContents: React.FC = () => {
    console.log('navcontent', data);

    return (
      <View style={{ paddingTop: 10 }}>
        {navState.nav === 'menu' ? <MenuList menulist={data.menus} handleUpdateMenu={handleUpdateMenu} handleDeleteMenu={handleDeleteMenu} handleAddMenuSubmit={handleAddMenuSubmit} />
          : navState.nav === 'info' ? <InfoList data={infoData}></InfoList>
            : navState.nav === 'review' ? <ReviewList reviewList={review.sort((a,b)=> Date.parse(b.updatedAt) - Date.parse(a.updatedAt))} truckId={infoData.id} onDelete={() => {}} ></ReviewList>
              : <></>
        }
      </View>
    )
  }

  const ShowList: React.FC = () => {
    return (
      <View>
        <View style={{ flex: 1 }}>
          <Dropzone onDrop={acceptedFiles => submitImage(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Image
                    style={{ width: '100%', height: 150, marginBottom: -30 }}
                    source={{ uri: data.imgURL }}
                    defaultSource={require('@foodtruckmap/common/src/static/icon_processed/truck_bw_120.png')}
                  />
                </div>
              </section>
            )}
          </Dropzone>

          <View style={{ paddingBottom: 10, backgroundColor: '#edaa11', width: '70%', alignSelf: 'center', borderRadius: 9, marginBottom: 5 }}>
            <View style={{ width: '100%', backgroundColor: '#f2be46', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 9, alignItems: 'center' }}>
              {editTitleComponent('title')}
            </View>
          </View>

          <View style={{ paddingHorizontal: '5%' }}>
            {editContentComponent('contents')}
          </View>
          <Line></Line>
          <DetailNavBar />
          <DetailNavContents />
          {/* <SellerState/> */}
        </View>
      </View>
    )
  }
  
  return <ShowList />
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