import * as React from 'react';
import { useContext } from 'react';
import { View, TouchableOpacity, Text, Button } from 'react-native';
import { observer } from 'mobx-react-lite';
import { SearchList } from '../components/result/SearchList';
import { CustomStyle } from '../static/CustomStyle';
import TruckDetail, { TruckDetailDummy } from '../components/foodtruckDetail/TruckDetail';
import { searchResultContext } from '../store/SearchStore';

export const RouteList: React.FC = observer(() => {
  const searchResultStore = useContext(searchResultContext)

  const ItemSelect: React.FC = () => {
    return <Button title={searchResultStore.isSelected ? 'true' : 'close'} onPress={() => {
      searchResultStore.isSelected = !searchResultStore.isSelected
    }} />
  }

  return (searchResultStore.isSelected === true ?
    <View>
      <ItemSelect />
      <TruckDetailDummy />
    </View>
    : <View>
      <SearchList />
    </View>
  )
})