import * as React from 'react'
import { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ListView } from './ListView'
import { CustomStyle } from '../../static/CustomStyle'
import { SearchResultType, SearchResultItem } from '../../store/SearchStore'
import axios from 'axios'
import { mainStoreContext } from '../../store/MainStore'
import { History, LocationState } from 'history';

interface Props {
  history: History<LocationState>,
  isDefault?: Boolean,
  searchKeyword?: String,
  searchResult?: SearchResultType,
}

export const SearchList: React.FC<Props> = ({ history, isDefault, searchKeyword, searchResult }) => {
  const mainStore = React.useContext(mainStoreContext)
  const [trucks, setTrucks] = useState<SearchResultType>([])

  const fetchData = async () => {
    const result = await axios(
      // 검색어가 들어오면 검색, 없으면 기본 내용 찾아오기
      searchKeyword ? `/trucks/search/${searchKeyword}` : `/trucks/`
    )
    setTrucks(result.data)
  }

  React.useEffect(() => {
    fetchData()
  }, []);

  trucks.sort((a: SearchResultItem, b: SearchResultItem) => {
    if (a.currentStatus === 'open' || b.currentStatus !== 'open') { return -1 }
    else if (a.currentStatus !== 'closed' || b.currentStatus === 'open') { return 1 }
    else {
      0
    }
  })

  const ShowTruckList: React.FC = () => {
    return (
      <View>
      {trucks.map((truck: SearchResultItem, index: number) => {
        if (truck.currentStatus !== 'closed') {
          return <ListView
            history={history}
            key={`listview-${index}`}
            id={truck.id}
            title={truck.title}
            contents={truck.contents}
            currentStatus={truck.currentStatus}
            imageUri={truck.imgURL ? truck.imgURL : ''}
            latitude={truck.latitude ? truck.latitude : undefined}
            longitude={truck.longitude ? truck.longitude : undefined}
          />
        }
      })}
    </View>
    )
  }
  // 디자인 수정 필요
  const ShowNoResult: React.FC = () => {
    return (
      <View style={{top: '10px', alignSelf: 'center'}} >
        <Text>검색 결과가 없습니다.</Text>
        <BackPressButton></BackPressButton>
      </View>
    )
  }
  const BackPressButton: React.FC = () => {
    return (
      <TouchableOpacity style={{alignSelf: 'center', paddingTop:'5px'}} onPress={() => history.goBack()}>
        <Text style={{color: '#000000', backgroundColor:'#f5ebde', 
        paddingLeft: '3px', paddingRight: '3px', paddingTop: '3px', paddingBottom: '3px'}}>뒤로가기</Text>
      </TouchableOpacity>
    )
  }

  return trucks.length !== 0 ? <ShowTruckList /> : <ShowNoResult />
}

const localStyle = StyleSheet.create({
});

const styles = { ...CustomStyle, ...localStyle }