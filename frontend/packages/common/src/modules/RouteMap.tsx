import * as React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import { mainStoreContext } from '../store/MainStore';
import { observer } from 'mobx-react-lite';
import { SearchList } from '../components/result/SearchList';

export const RouteMap: React.FC = observer(() => {
  const mainStore = useContext(mainStoreContext);
  const currentPage = mainStore.currentPage

  const getCoordinate = () => {
    const cur = navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position)
      },
      function(positionError) {
        console.log('error', positionError)
      }
      )
  }

  return (
    <View>
      <SearchList />
      <Text style={styles.sectionTitle}>{currentPage}</Text>
      {/* put content here */}
      <TouchableOpacity onPress={getCoordinate}><Text>test</Text></TouchableOpacity>
      <Text style={styles.sectionDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur nisl gravida elit egestas, vitae egestas nisi luctus. Suspendisse commodo, tortor vitae tincidunt rhoncus, nisl tellus dictum metus, sit amet fringilla eros ligula et velit. Mauris tempus diam turpis, at rutrum dui semper nec. Nunc viverra, lectus at pharetra accumsan, metus risus varius libero, ac viverra ipsum quam nec dolor. Vivamus diam sem, ornare sit amet justo at, fermentum rutrum nunc. Vestibulum suscipit congue elit, id laoreet massa eleifend quis. Phasellus risus elit, vulputate sit amet ex vel, faucibus imperdiet eros. Suspendisse est lorem, finibus eget facilisis tempus, sagittis vel metus. Aenean pharetra condimentum magna in congue. Cras aliquet vestibulum congue. Nullam pellentesque vitae diam id malesuada. Nunc nec dui neque. Praesent ut metus eu arcu mattis semper sit amet sed tellus. Morbi eu viverra lectus. Cras purus dui, sodales vel dolor vel, feugiat ultricies sem.
        Donec consectetur eu tellus sit amet laoreet. Mauris ipsum justo, tincidunt in nibh at, imperdiet finibus enim. Ut sit amet dui purus. Aenean at mi a lacus pellentesque molestie sed sit amet nisl. Donec sit amet turpis a erat lacinia placerat non at leo. Fusce bibendum hendrerit neque vel congue. Duis suscipit vitae dolor in sollicitudin. Proin at sagittis mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis fringilla dui faucibus sapien euismod, et eleifend quam tincidunt. Proin ultrices elit ac ornare viverra. Mauris volutpat porttitor ornare. Quisque eget nulla massa. Curabitur convallis purus vitae odio porta luctus eu aliquet augue. Nulla facilisis tristique malesuada.
        Pellentesque ullamcorper non urna in condimentum. Nunc egestas purus nulla, in pharetra enim fringilla nec. Duis in felis sapien. Aliquam erat volutpat. In hac habitasse platea dictumst. Maecenas vitae est ex. Nunc dapibus ipsum dolor, a commodo nisi ornare vitae. Etiam vulputate lectus non nulla viverra tincidunt. Suspendisse mollis magna quis rutrum iaculis.
        Cras vel tellus sit amet mi bibendum pharetra nec eget dui. Vivamus fermentum, nunc ac sodales malesuada, urna quam suscipit tortor, ac varius odio eros et dui. Nunc varius consectetur commodo. Maecenas in lorem arcu. Donec sem risus, auctor non tellus a, eleifend faucibus ex. Suspendisse lacinia justo eu turpis placerat, aliquet vulputate felis posuere. Etiam sit amet lectus a massa euismod eleifend. Duis eu dolor dictum, cursus elit ac, iaculis ligula. Mauris facilisis mauris et gravida lacinia.
      </Text>
      <Text style={styles.sectionTitle}>Step One</Text>
      <Text style={styles.sectionDescription}>
        Edit <Text style={styles.highlight}>App.tsx</Text> to change
        this screen and then come back to see your edits.
                  </Text>
      <Text style={styles.sectionDescription}>{mainStore.count}</Text>
      <Button title="increment" onPress={() => mainStore.count++} />
      <Text style={styles.sectionDescription}>screen {mainStore.screenHeight}</Text>
      <Text style={styles.sectionDescription}>window {Dimensions.get('window').height}</Text>
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