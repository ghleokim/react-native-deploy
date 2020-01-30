import * as React from 'react';
import { useContext } from 'react';
import { View, TouchableOpacity, Text, Button, Image, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { SearchList } from '../components/result/SearchList';
import { CustomStyle } from '../static/CustomStyle';
import { TruckDetail, TruckDetailDummy } from '../components/foodtruckDetail/TruckDetail';
import { searchResultContext, searchStoreContext } from '../store/SearchStore';

export const RouteList: React.FC = observer(() => {
  const searchResultStore = useContext(searchResultContext)
  const searchStore = useContext(searchStoreContext)

  const getKeyword = () => {
    const keyword = searchStore.searchKeyword === '' ? undefined : searchStore.searchKeyword
    return keyword
  }

  console.log(getKeyword())

  const CloseButton: React.FC = () => {
    return <TouchableOpacity  onPress={() => {searchResultStore.isSelected = !searchResultStore.isSelected}}>
          <Image
        style={styles.closeButton}
        source={require('@foodtruckmap/common/src/static/icon_processed/noun_Close_1015372.png')}
      />
      </TouchableOpacity>
    
    // <Button title={searchResultStore.isSelected ? 'true' : 'close'} onPress={() => {
    //   searchResultStore.isSelected = !searchResultStore.isSelected
    // }} />
  }

  return (searchResultStore.isSelected === true ?
    <View>
      <View style={{zIndex: 2}} >
        <CloseButton />
      </View>
      <View style={{zIndex: 1}}>
        <TruckDetail />
      </View>
    </View>
    : <View>
      <SearchList searchKeyword={getKeyword()} />
    </View>
  )
})

const styles = StyleSheet.create({
  closeButton: {
    shadowColor: '#000000',
    shadowRadius: 3,
    elevation: 5,
    position: 'absolute',
    zIndex: 1,
    right: 10,
    top: 10,
    tintColor: '#ffffff',
    height: 30,
    width: 30,
    resizeMode: 'cover',
    overflow: 'hidden'
  }
})