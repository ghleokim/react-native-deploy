import * as React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { ListView } from './ListView'
import { CustomStyle } from '../../static/CustomStyle'
import { Colors, COLOR_DARKGRAY } from '../../static/CustomColor'
import { SearchResult, SearchResultItems, truckStatus } from '../../store/SearchStore'


const trucks_dummy: SearchResultItems = [
  {
    id: 1,
    title: '찹스테이크 1',
    description: 'title2',
    currentStatus: 'closed',
  },
  {
    id: 2,
    title: '붕어빵',
    description: 'title2',
    currentStatus: 'open',
    imgURL: 'https://avatars2.githubusercontent.com/u/22673963?s=400&v=4',
    latitude: 37.5005,
    longitude: 127.037
  },
  {
    id: 3,
    title: '타코야끼',
    description: '둥글둥글 맛있는 타코야끼',
    currentStatus: 'closed',
  },
  {
    id: 4,
    title: '떡볶이',
    description: '스트레스 풀러 오세요',
    currentStatus: 'open',
    imgURL: 'https://avatars2.githubusercontent.com/u/22673963?s=400&v=4',
    latitude: 37.5005,
    longitude: 127.037
  },
  {
    id: 5,
    title: '찹스테이크 3',
    description: '준비중입니다.',
    currentStatus: 'prepare',
    latitude: 37.5005,
    longitude: 127.037
  }
]

export const SearchList: React.FC = () => {
  trucks_dummy.sort((a, b)=> {
    if (a.currentStatus === 'open' || b.currentStatus !== 'open' ) { return -1 }
    else if (a.currentStatus !== 'closed' || b.currentStatus === 'open' ) { return 1 }
    else {
      0
    }
  })


  return (
    <View>
      {trucks_dummy.map((truck, index) => {
        if (truck.currentStatus !== 'closed') {
        return <ListView
          key={`listview-${index}`}
          id={truck.id}
          title={truck.title}
          description={truck.description}
          currentStatus={truck.currentStatus}
          imageUri={truck.imgURL ? truck.imgURL : undefined}
          latitude={truck.latitude ? truck.latitude : undefined}
          longitude={truck.longitude ? truck.longitude : undefined}
        />
        }
      })}
    </View>
  )
}

const localStyle = StyleSheet.create({
});

const styles = { ...CustomStyle, ...localStyle }