import * as React from 'react';
import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Maps } from '../components/Maps';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

export const RouteMap: React.FC<Props> = observer(({history}) => {

  return (
    <View>
      <Maps history={history} />
    </View>
  )
})

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    alignItems: "center"
  },
  highlight: {
    fontWeight: '700',
  },
  mainBanner: {
    height: 100,
    width: '100%',
    backgroundColor: '#f3f3f3'
  },
  mainBannerImage: {
    height: 100,
    width: '100%',
  },

})