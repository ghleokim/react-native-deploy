import React, { useContext, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { CustomText, CustomStyle } from '../../static/CustomStyle';
import { mainStoreContext } from '../../store/MainStore';
import { observer } from 'mobx-react-lite';
import { BannerStoreContext } from '../../store/BannerStore';
import { useInterval } from '../../functions/functions';

interface Notice {
  id: number,
  title: string,
  createdAt: string,
  updatedAt: string,
  content: string,
  state: any,
  userEmail: string
}

interface NoticeProps {
  notice: Notice
}

interface Props {
  noticeList: Notice[]
}

export const NoticeList: React.FC<Props> = observer(({ noticeList }) => {
  const mainStore = useContext(mainStoreContext);
  const BannerStore = useContext(BannerStoreContext);
  const [ flIndex, setFlIndex ] = useState(0)

  const NOTICE_HEIGHT = 40
  const NOTICE_LENGTH = noticeList.length
  
  const NoticeItem: React.FC<NoticeProps> = ({notice}) => {
    return (
    <TouchableOpacity style={[styles.noticeContainer, {height: NOTICE_HEIGHT}]} onPress={()=>{mainStore.modalData = {category: 'notice', imgURL: '', notice: notice }; BannerStore.active = true;}}>
      <Text style={[CustomText.title, {flex: 1, fontWeight: '700', fontSize: 14, textAlign: 'center', marginHorizontal: 10}]}>공지사항</Text>
      <Text style={[CustomText.body, {flex: 4, fontSize: 14, marginRight: 30}]} numberOfLines={1} ellipsizeMode='clip'>{notice.title}</Text>
    </TouchableOpacity>
  )}
  
  const flRef = useRef(null);

  useInterval( ()=> {
    setFlIndex((flIndex + 1) % NOTICE_LENGTH);
    flRef.current.scrollToIndex({
      index: flIndex
    })
  }, 3000)
  
  return (
    <View>
      <FlatList<Notice>
        ref={flRef}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        getItemLayout={(data, index) => (
          {length: NOTICE_HEIGHT, offset: NOTICE_HEIGHT * index, index}
        )}
        style={{height: NOTICE_HEIGHT}}
        data={noticeList}
        renderItem={({item})=>{
          return <NoticeItem notice={item} />
        }}
        pagingEnabled={true}
      />
    </View>
  )
})

const LocalStyles = StyleSheet.create({
  noticeContainer: {
    borderTopColor: '#e4e4e5',
    borderBottomColor: '#e4e4e5',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

const styles = { ...CustomStyle, ...LocalStyles }