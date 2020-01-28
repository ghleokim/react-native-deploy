import * as React from 'react';
import { useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { mainStoreContext } from '../store/MainStore';
import { observer } from 'mobx-react-lite';
import { SearchList } from '../components/result/SearchList';

export const RouteList: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);
  const getCoordinate = () => {
    const cur = navigator.geolocation.getCurrentPosition(
      function (position) {
        alert(position)
        mainStore.testCurrentLocation = position
      },
      function (positionError) {
        console.log('error', positionError)
      }
    )
  }

  return (
    <View>
      <SearchList />
      <TouchableOpacity onPress={getCoordinate}>
        <Text>test get current position</Text>
        <Text>{mainStore.testCurrentLocation}</Text>
      </TouchableOpacity>
    </View>
  )
})