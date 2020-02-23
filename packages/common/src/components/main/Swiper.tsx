import React, { useContext } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { mainStoreContext } from '../../store/MainStore';
import { observer } from 'mobx-react-lite';

interface Props {
  loop?: boolean;
}

export const Swiper: React.FC<Props> = observer(({ loop, children }) => {
  const mainStore = useContext(mainStoreContext)


  const getScrollInfo = (w: number, h: number) => {
    console.log(w, h)
    mainStore.bannerTotal = (w - mainStore.screenWidth) / mainStore.screenWidth + 1
    setTimeout(() => {
      bannerCountFadeOut();
    }, 500)
  }

  const bannerCountFadeOut = () => {
    mainStore.bannerCountOpacity = 0.1
  }

  const getScrollPage = (e: any) => {
    const total = Object.keys(children!).length
    const curX = e.nativeEvent.contentOffset.x
    const totX = e.nativeEvent.contentSize.width - e.nativeEvent.layoutMeasurement.width
    const current = mainStore.bannerPage = Math.floor(curX / totX * (total - 1)) + 1
    console.log(e)
    console.log(`total ${total}`)
    console.log(`curX ${curX} totX ${totX}`)
    console.log(`curX / totX ${curX / totX}`)
    console.log(current)

    mainStore.bannerCountOpacity = 1
    setTimeout(() => {
      bannerCountFadeOut();
      console.log('a')
    }, 500)
  }

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={getScrollPage}
        onContentSizeChange={getScrollInfo}
      >
        {children}
      </ScrollView>
      <View style={{ position: 'absolute', bottom: '5%', alignSelf: 'center', justifyContent: 'center', opacity: mainStore.bannerCountOpacity, shadowColor: '#ffffff', shadowRadius: 1, backgroundColor: "#303030", paddingVertical: '1%', paddingHorizontal: '3%', borderRadius: 10 }}>
        <Text style={{ alignSelf: 'center', justifyContent: 'center', color: '#f0f0f0' }}>{mainStore.bannerPage} / {mainStore.bannerTotal}</Text>
      </View>
    </View>
  )
})

