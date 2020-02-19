import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Button,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { mainStoreContext } from '../../store/MainStore';
import { CustomStyle } from '../../static/CustomStyle';
import { Colors, COLOR_HEADER } from '../../static/CustomColor';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { useInterval } from '../../functions/functions';

interface Props extends RouteComponentProps {}

export const Header: React.FC<Props> = observer(({ history }) => {
  const mainStore = useContext(mainStoreContext);
  mainStore.headerHeight = mainStore.screenHeight / 13.5;

  // test for dev
  const devTest = () => {
    axios.get('/')
      .then((response) => { console.log('db health check',response); alert(JSON.stringify(response.data)) })
      .catch((error) => { console.log(error.response); alert(JSON.stringify(error.response.data)) })
  }

  const sellerButton = () => {
    return mainStore.isSeller ? 
      <TouchableOpacity style={{position: 'absolute', right: 10}} onPress={()=>history.push('/seller')}><View style={{ paddingVertical: 7, paddingHorizontal: 4, backgroundColor: Colors.success, borderRadius: 3 }}><Text style={{ color: Colors.white, fontSize: 12 }}>내트럭</Text></View></TouchableOpacity>
      : <></>
  }

  const [duck, setDuck] = useState(false);

  const stA:any = {
    pos: new Animated.Value(-10),
    width: new Animated.Value(0),
    height: new Animated.Value(0),
    opacity: new Animated.Value(0),
  }
  const stB:any = {
    pos: new Animated.Value(0),
    width: new Animated.Value(10),
    height: new Animated.Value(10),
    opacity: new Animated.Value(1),
  }

  // useInterval(()=>{
  //   console.log(duck, stA, stB)
  //   Animated.parallel([
  //     Animated.timing(stA.pos, {
  //       toValue: stA.pos._value ? 0 : -10,
  //       duration: 1000
  //     }),
  //     Animated.timing(stB.pos, {
  //       toValue: stB.pos._value ? 0 : -10,
  //       duration: 1000
  //     }),
  //     Animated.timing(stA.width, {
  //       toValue: stA.width._value === 10? 0 : 10,
  //       duration: 1000
  //     }),
  //     Animated.timing(stB.width, {
  //       toValue: stB.width._value === 10? 0 : 10,
  //       duration: 1000
  //     }),
  //     Animated.timing(stA.height, {
  //       toValue: stA.height._value === 10? 0 : 10,
  //       duration: 1000
  //     }),
  //     Animated.timing(stB.height, {
  //       toValue: stB.height._value === 10? 0 : 10,
  //       duration: 1000
  //     }),
  //     Animated.timing(stA.opacity, {
  //       toValue: stA.opacity._value === 1 ? 0 : 1,
  //       duration: 1000
  //     }),
  //     Animated.timing(stB.opacity, {
  //       toValue: stB.opacity._value === 1 ? 0 : 1,
  //       duration: 1000
  //     }),
  //   ]).start()
  // }, 2000)

  // useEffect(()=>{
  //   console.log(duck)
  //   Animated.parallel([
  //     Animated.timing(stA.pos, {
  //       toValue: duck ? 0 : -10,
  //       duration: 1000
  //     }),
  //     Animated.timing(stB.pos, {
  //       toValue: !duck ? 0 : -10,
  //       duration: 1000
  //     }),
  //     Animated.timing(stA.width, {
  //       toValue: duck ? 0 : 10,
  //       duration: 1000
  //     }),
  //     Animated.timing(stB.width, {
  //       toValue: !duck ? 0 : 10,
  //       duration: 1000
  //     }),
  //     Animated.timing(stA.height, {
  //       toValue: duck ? 0 : 10,
  //       duration: 1000
  //     }),
  //     Animated.timing(stB.height, {
  //       toValue: !duck ? 0 : 10,
  //       duration: 1000
  //     }),
  //     Animated.timing(stA.opacity, {
  //       toValue: duck == true ? 0 : 1,
  //       duration: 1000
  //     }),
  //     Animated.timing(stB.opacity, {
  //       toValue: duck == false ? 0 : 1,
  //       duration: 1000
  //     }),
  //   ]).start()
  // }, [duck])

  // useInterval(()=>{
  //   setDuck(!duck)
  // },2000)

  const posA:any = new Animated.Value(-10)
  const posB:any = new Animated.Value(0)
  const opcA:any = new Animated.Value(0)
  const opcB:any = new Animated.Value(1)

  useInterval(()=>{
    Animated.parallel([
      Animated.timing(posA,{ toValue: posA._value === 0 ? -200 : 0, duration: 300 }),
      Animated.timing(posB,{ toValue: posB._value === 0 ? -200 : 0, duration: 300, }),
      Animated.timing(opcA,{ toValue: opcA._value === 0 ? 1 : 0, duration: 300, }),
      Animated.timing(opcB,{ toValue: opcB._value === 0 ? 1 : 0, duration: 300, })
    ]).start()
  },5000)


  const transitionText = (textA, textB) => {
    return <>
      <Animated.Text style={{opacity: opcA, position: 'absolute',}}><Text style={{textAlign: 'right'}}>{textA}</Text></Animated.Text>
      <Animated.Text style={{opacity: opcB, position: 'absolute',}}><Text style={{marginLeft: 3, textAlign: 'right'}}>{textB}</Text></Animated.Text>
    </>
  }

return (
  <View style={[styles.header, { height: mainStore.headerHeight }]}>
    <Text style={styles.headerText} onPress={()=>history.replace('/')}>food{transitionText('tr', 'd')}<View style={{width: 18}}></View>uck {transitionText('🚚', '🦆')}</Text>
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
    fontFamily: "Palatino Linotype, Book Antiqua, Palatino, serif",
    fontWeight: '700',
    fontSize: 24,
    marginRight: 18
  },
});

const styles = { ...CustomStyle, ...localStyle }