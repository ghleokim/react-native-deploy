import * as React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { mainStoreContext } from '../store/MainStore';
import { observer } from 'mobx-react-lite';
import { TruckDetailwithId } from '../components/foodtruckDetail/TruckDetailwithId';
import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  targetId: string;
}

interface Props extends RouteComponentProps<MatchParams> { }

export const RouteTruck: React.FC<Props> = observer(({ history, match }) => {
  const mainStore = useContext(mainStoreContext);

  console.log(history);
  const targetId = match.params.targetId

  const CloseButton: React.FC = () => {
    return <TouchableOpacity onPress={() => { history.goBack() }}>
      <Image
        style={styles.closeButton}
        source={require('@foodtruckmap/common/src/static/icon_processed/noun_Close_1015372.png')}
      />
    </TouchableOpacity>
  }

  return (
    <View>
      <View style={{ zIndex: 2 }} >
        <CloseButton />
      </View>
      <TruckDetailwithId targetId={parseInt(targetId)} />
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