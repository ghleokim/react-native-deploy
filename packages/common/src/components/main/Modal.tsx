import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { BannerStoreContext } from '../../store/BannerStore';
import { observer } from 'mobx-react-lite';
import { mainStoreContext } from '../../store/MainStore';

interface Props {
  title?: string,
  updatedAt?: string,
  content?: string,
  imgURL?: string,
  Child?: React.FC
}

export const Modal: React.FC<Props> = observer(({title, content, imgURL, updatedAt, Child}) => {
  const MainStore = useContext(mainStoreContext);
  const BannerStore = useContext(BannerStoreContext);

  const [modalState, setModalState] = useState(true);
  const [topOffset] = useState(new Animated.Value(MainStore.screenHeight));

  useEffect(() => {
    Animated.timing(topOffset, {
      toValue: modalState ? 0 : MainStore.screenHeight,
      duration: 300
    }).start()
  },[modalState])
  
  if (!!imgURL) { Image.getSize(imgURL, (width, height)=>{BannerStore.imgHeight = height * MainStore.screenWidth / width}, (err)=>{console.log(err)})}
  console.log(!!imgURL, imgURL, BannerStore.imgHeight)

  

  return (
    <Animated.View style={{position: 'absolute', top: topOffset, width: '100%', height: '100%', backgroundColor: '#ffffff', zIndex: 2}}>
      <View style={{height: 40, borderBottomColor: '#a090c0', borderBottomWidth: 1, justifyContent: 'center'}}>
        <TouchableOpacity onPressOut={()=>{setModalState(false); setTimeout(()=>{BannerStore.active=false}, 500)}} style={{flex: 1, flexDirection:'row', justifyContent: 'space-between'}}>
          <View style={{width: 20}}></View>
          <Text style={{alignSelf: 'center'}}>공지사항</Text>
          <Image style={{ marginRight: 10, width: 20, height: 20, alignSelf: 'center'}} source={require('@foodtruckmap/common/src/static/icon_processed/noun_Close_1015372.png')}/>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{flex: 1,}}>
        {!!imgURL ? <View style={{width: '100%'}}>
          <Image style={{height: BannerStore.imgHeight, width: '100%', resizeMode: 'contain'}} source={{uri: imgURL}} defaultSource={{uri: 'https://picsum.photos/200'}}/>
          <Image style={{height: '100%', width: '100%', resizeMode: 'contain'}} source={{uri: imgURL}} defaultSource={{uri: 'https://picsum.photos/200'}}/>
          </View>
          : <View>
            <Text>{title}</Text>
            <Text>{updatedAt}</Text>
            <Text>{content}</Text>
          </View> 
        }
      </ScrollView>
    </Animated.View>
  )
})