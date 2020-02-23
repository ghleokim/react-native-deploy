import * as React from 'react';
import { useContext } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { SearchList } from '../components/result/SearchList';
import { searchResultContext } from '../store/SearchStore';
import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  keyword: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

export const RouteList: React.FC<Props> = observer(({history, match}) => {
  const searchResultStore = useContext(searchResultContext)

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