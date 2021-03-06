import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import { mainStoreContext } from '../store/MainStore';
import { searchStoreContext } from '../store/SearchStore';
import { observer } from 'mobx-react-lite';
import { CustomStyle, CustomText } from '../static/CustomStyle';
import { Colors } from '../static/CustomColor';
import { BannerSwiper } from '../components/main/BannerSwiper'
import { RouteComponentProps } from 'react-router-dom';
import { BannerStoreContext } from '../store/BannerStore';
import axios from 'axios';
import { PersonalPage } from '../components/main/PersonalPage';
import { NoticeList } from '../components/main/NoticeList';

interface Notice {
  id: number,
  title: string,
  createdAt: string,
  updatedAt: string,
  content: string,
  state: any,
  userEmail: string
}

interface ModalData {
  category: 'banner' | 'notice' | '',
  notice?: Notice,
  imgURL?: string,
}

interface Props extends RouteComponentProps {
}

export const RouteMain: React.FC<Props> = observer(({history}) => {
  const emptyNotice = {id: -1, title: '', createdAt: '', updatedAt: '', content: '', state: '', userEmail: ''}
  const defaultImgURL = 'https://scontent-ssn1-1.xx.fbcdn.net/v/t1.0-9/67756141_2500914479952501_2554921670380879872_o.jpg?_nc_cat=111&_nc_ohc=WKg-jesH6mcAX-g0Ih9&_nc_ht=scontent-ssn1-1.xx&oh=5e6b1deee100739d2defb61ba78506a2&oe=5EFFA465'

  const [noticeList, setNoticeList] = useState<Notice[]>([{
    id: -1, title: 'default title', createdAt: '2020-02-07T05:33:26.000Z', updatedAt: '2020-02-07T05:33:26.000Z', content: 'default content', state: true, userEmail: ''
  }])

  const [modalData, setModalData] = useState<ModalData>({ category: '', imgURL: '', notice: emptyNotice })
  const mainStore = useContext(mainStoreContext);
  const searchStore = useContext(searchStoreContext);
  const BannerStore = useContext(BannerStoreContext);

  const bannerHeight = mainStore.screenWidth / 2.6

  const fetchNotice = () => {
    axios.get('/notices')
    .then((response)=>{
      console.log(response);
      setNoticeList(response.data)
    })
    .catch((err)=>console.log(setNoticeList([])))
  }

  useEffect(()=>{
    fetchNotice();
  },[])

  const handleSearchBar = (keyword: string) => {
    console.log(keyword === '' ? 'no text' : keyword)
    keyword = keyword.trim()
    keyword === ''
      ? null
      : history.push(`/search/${keyword}`)
  }

  const handleSearchButton = () => {
    searchStore.searchKeyword === undefined ? undefined : handleSearchBar(searchStore.searchKeyword)
  }

  useEffect(()=>{
    if (BannerStore.pageIndex === -1) {
      setModalData({category: '', imgURL: '', notice: emptyNotice})
    } else {
      setModalData({category: 'banner', imgURL: defaultImgURL, notice: emptyNotice})
    }
  }, [BannerStore.pageIndex])

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View>
          <BannerSwiper />

        <View style={styles.mainButtonWrapper}>
          <TouchableOpacity style={styles.mainButton} onPress={() => { history.push('/map') }}><Text style={styles.sectionTitle}> 내 주변 푸드트럭 찾기 🚚 </Text></TouchableOpacity>
        </View>
        <View style={[styles.inputContainer, { flex: 1, flexDirection: 'row' }]}>
          <TextInput
            style={[styles.input, { flex: 4, borderColor: '#ec585c' }]}
            underlineColorAndroid="transparent"
            defaultValue={searchStore.searchKeyword}
            placeholder={searchStore.searchPlaceholder}
            autoCapitalize="none"
            onChangeText={keyword => searchStore.searchKeyword = keyword}
            onSubmitEditing={(e) => handleSearchBar(e.nativeEvent.text)}
            multiline={false}
          />
          <TouchableOpacity onPress={handleSearchButton} style={[styles.buttons, { flex: 1, marginLeft: 5, backgroundColor: '#ec585c' }]}>
            <Text style={{ color: Colors.white, fontWeight: '700' }}>검색</Text>
          </TouchableOpacity>
        </View>
      </View>
      <PersonalPage history={history}/>
      <NoticeList noticeList={noticeList}/>
      <View style={[styles.staticInfo, { flexGrow: 1 }]}>
        <Text style={styles.staticText}>
          <Text style={styles.staticTextLink} onPress={() => console.log('hello')}>팀 정보</Text>
          <Text> | </Text>
          <Text style={styles.staticTextLink} onPress={() => console.log('hello2')}>이용 약관</Text>
          <Text> | </Text>
          <Text style={styles.staticTextLink} onPress={() => console.log('hello3')}>개인정보처리방침</Text>
          <Text> | </Text>
          <Text style={styles.staticTextLink} onPress={() => history.push(`/report`, {division: 0, targetId: 1})}>신고</Text>
        </Text>
        <Text style={styles.staticText}>foodtruck-map</Text>
      </View>
    </View>
  )
})

const LocalStyles = StyleSheet.create({
  mainBanner: {
    height: 150,
    width: '100%',
    backgroundColor: '#f3f3f3'
  },
  mainBannerImage: {
    height: 150,
    width: '100%',
  },
  mainButtonWrapper: {
    height: 100,
    width: '100%',
    padding: 10
  },
  mainButton: {
    width: '100%',
    borderColor: 'rgba(236, 76, 100, 0.7)',
    backgroundColor: '#ec585c',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    backgroundColor: 'rgba(200,200,200,0.2)',
    color: '#ffffff'
  },
  staticInfo: {
    backgroundColor: '#e4e4e5',
    marginTop: 5,
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  staticText: {
    ...CustomText.logo,
    fontSize: 14,
    color: '#505050'
  },
  staticTextLink: {
    textDecorationLine: 'underline',
  },
  noticeContainer: {
    height: 40,
    borderTopColor: '#e4e4e5',
    borderBottomColor: '#e4e4e5',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

const styles = { ...CustomStyle, ...LocalStyles }