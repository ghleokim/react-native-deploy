import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { observer } from 'mobx-react-lite';
import { mainStoreContext } from '../../store/MainStore';
import { CustomStyle } from '../../static/CustomStyle';
import { Colors, COLOR_HEADER } from '../../static/CustomColor';
import { RouteComponentProps } from 'react-router-dom';
import { useInterval } from '../../functions/functions';
import { fonts } from '../../static/TextStyle';

interface Props extends RouteComponentProps {}

export const Header: React.FC<Props> = observer(({ history }) => {
  const mainStore = useContext(mainStoreContext);
  mainStore.headerHeight = mainStore.screenHeight / 13.5;

  const sellerButton = () => {
    return mainStore.isSeller ? 
      <TouchableOpacity style={{position: 'absolute', right: 10}} onPress={()=>history.push('/seller')}><View style={{ paddingVertical: 7, paddingHorizontal: 4, backgroundColor: Colors.success, borderRadius: 3 }}><Text style={{ color: Colors.white, fontSize: 12 }}>내트럭</Text></View></TouchableOpacity>
      : <></>
  }

  const posA:any = new Animated.Value(-10)
  const posB:any = new Animated.Value(0)
  const opcA:any = new Animated.Value(0)
  const opcB:any = new Animated.Value(1)

  useInterval(()=>{
    Animated.parallel([
      Animated.timing(posA,{ toValue: posA._value === 0 ? -200 : 0, duration: 300 }),
      Animated.timing(posB,{ toValue: posB._value === 0 ? -200 : 0, duration: 300, }),
      Animated.timing(opcA,{ toValue: opcA._value <= 0.5 ? 1 : 0, duration: 300, }),
      Animated.timing(opcB,{ toValue: opcB._value <= 0.5 ? 1 : 0, duration: 300, })
    ]).start()
  },5000)


  const transitionText = (textA, textB, style?) => {
    return <>
      <Animated.Text style={{opacity: opcA, position: 'absolute', top: style ? style.top: 'auto' }}><Text style={{textAlign: 'right'}}>{textA}</Text></Animated.Text>
      <Animated.Text style={{opacity: opcB, position: 'absolute', top: style ? style.top: 'auto'}}><Text style={{marginLeft: 3, textAlign: 'right'}}>{textB}</Text></Animated.Text>
    </>
  }

return (
  <View style={[styles.header, { height: mainStore.headerHeight }]}>
    <Text style={[fonts.Logo, fonts.bold, fonts.sizeH1, styles.headerText]} onPress={()=>history.replace('/')}>food{transitionText('tr', 'd')}<View style={{width: 18}}></View>uck {transitionText('🚚', '🦆', {top: mainStore.headerHeight / 2 - 16})}</Text>
    {sellerButton()}
  </View>
)
})

const localStyle = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: `rgba(${COLOR_HEADER},0.5)`,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.header,
    borderBottomWidth: 1
  },
  headerText: {
    fontSize: 24,
    marginRight: 18
  },
});

const styles = { ...CustomStyle, ...localStyle }