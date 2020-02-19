import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { BannerStoreContext } from '../../store/BannerStore';
import { observer } from 'mobx-react-lite';
import { mainStoreContext } from '../../store/MainStore';
import { CustomText } from '../../static/CustomStyle';
import { YYDDMMDDhmm_Korean } from '../../lib/datetime'

interface Notice {
  id: number,
  title: string,
  createdAt: string,
  updatedAt: string,
  content: string,
}

interface Props {
  notice?: Notice, 
  imgURL?: string,
}

export const Modal: React.FC<Props> = observer(({ notice, imgURL }) => {
  const MainStore = useContext(mainStoreContext);
  const BannerStore = useContext(BannerStoreContext);
  const defaultTopOffset = MainStore.headerHeight

  const [modalState, setModalState] = useState(true);
  const [topOffset] = useState(new Animated.Value(MainStore.screenHeight));

  useEffect(() => {
    Animated.timing(topOffset, {
      toValue: modalState ? defaultTopOffset : MainStore.screenHeight,
      duration: 300
    }).start()
  },[modalState])
  
  if (!!imgURL) { Image.getSize(imgURL, (width, height)=>{BannerStore.imgHeight = height * MainStore.screenWidth / width}, (err)=>{console.log(err)})}
  console.log(!!imgURL, imgURL, BannerStore.imgHeight)

  return (
    <Animated.View style={{position: 'absolute', top: topOffset, width: '100%', height: '100%', backgroundColor: '#ffffff', zIndex: 2}}>
      <View style={{height: 40, borderBottomColor: '#a090c0', borderBottomWidth: 1, justifyContent: 'center'}}>
        <TouchableOpacity onPressOut={()=>{setModalState(false); setTimeout(()=>{BannerStore.active=false; BannerStore.pageIndex = -1}, 500)}} style={{flex: 1, flexDirection:'row', justifyContent: 'space-between'}}>
          <View style={{width: 20}}></View>
          <Text style={{alignSelf: 'center'}}>{MainStore.modalData.category === 'banner' ? '이벤트' : '공지사항'}</Text>
          <Image style={{ marginRight: 10, width: 20, height: 20, alignSelf: 'center'}} source={require('@foodtruckmap/common/src/static/icon_processed/noun_Close_1015372.png')}/>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{flex: 1,}}>
        {MainStore.modalData.category === 'banner' ? <View style={{width: '100%'}}>
          <Image style={{height: BannerStore.imgHeight, width: '100%', resizeMode: 'contain'}} source={{uri: imgURL}} defaultSource={require('@foodtruckmap/common/src/static/icon_processed/truck_bw_120.png')}/>
          <Image style={{height: '100%', width: '100%', resizeMode: 'contain'}} source={{uri: imgURL}} defaultSource={require('@foodtruckmap/common/src/static/icon_processed/truck_bw_120.png')}/>
          </View>
          : <View>
              <View style={{height: 80, paddingHorizontal: 15, justifyContent: 'center', borderBottomColor: '#c0c0c0', borderBottomWidth: 1}}>
                <Text style={[CustomText.title, {fontSize: 16}]}>{notice.title}</Text>
                <Text style={[CustomText.body, {fontSize: 11, color: '#606060'}]}>{YYDDMMDDhmm_Korean(notice.updatedAt)}</Text>
              </View>
              <View style={{paddingTop: 12, paddingHorizontal: 15}}>
                <Text style={[CustomText.body, {fontSize: 14}]}>{notice.content}</Text>
              </View>
          </View> 
        }
      </ScrollView>
    </Animated.View>
  )
})