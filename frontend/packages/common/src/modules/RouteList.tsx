import * as React from 'react';
import { useContext } from 'react';
import { View, TouchableOpacity, Text, Button, Image, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { SearchList } from '../components/result/SearchList';
import { CustomStyle } from '../static/CustomStyle';
import { searchResultContext, searchStoreContext } from '../store/SearchStore';
import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  keyword: string;
}

interface Props extends RouteComponentProps<MatchParams> {

}

export const RouteList: React.FC<Props> = observer(({history, match}) => {
  const searchResultStore = useContext(searchResultContext)
  const searchStore = useContext(searchStoreContext)

  const getKeyword = () => {
    const keyword = match.params.keyword
    return keyword
  }
  
  console.log(searchResultStore.searchResult)
  console.log(getKeyword())

  return (
    <View>
      <SearchList history={history} searchKeyword={getKeyword()} />
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