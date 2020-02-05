import React, { useEffect, useState, useContext } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MenuList from './MenuList';
import Line from '../Line'
import axios from 'axios'
import { mainStoreContext } from '../../store/MainStore';
import { CustomStyle, CustomText } from '../../static/CustomStyle';
import ReviewList from './ReviewList';
import TruckInfo from './TruckInfo';

interface IState {
  id: Number,
  imgURL?: string,
  title: string,
  contents: string,
  menus: []
}

interface IReview {
  id: number,
  content: string,
  startRating: number,
  createdAt: string,
  updatedAt: string,
  truckId: number,
  userEmail: string
}

interface Props {
  targetId: number
}

export const TruckDetailwithId: React.FC<Props> = ({ targetId }) => {
  const mainStore = useContext(mainStoreContext)
  const [state, setState] = useState({
    nav: 'menu',
  })

  const [data, setData] = useState<IState>({
    id: 0, imgURL: '', title: '', contents: '', menus: []
  })
  const [review, setReview] = useState<IReview[]>([{
    id: 0, content: '', startRating: 1, createdAt: '', updatedAt: '', truckId: 0, userEmail: ''
  }])

  const DetailNavBar: React.FC = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#ffffff' }}>
        <TouchableOpacity
          style={[
            { flex: 1, alignItems: 'center', height: 50, paddingTop: 10 },
            state.nav === 'menu' ? { borderBottomColor: '#EDAA11', borderBottomWidth: 2 } : {}
          ]}
          onPress={() => setState({ ...state, nav: 'menu' })}>
          <Text style={[CustomText.title, { fontSize: 18 }]}>메뉴</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { flex: 1, alignItems: 'center', height: 50, paddingTop: 10 },
            state.nav === 'info' ? { borderBottomColor: '#EDAA11', borderBottomWidth: 2 } : {}
          ]}
          onPress={() => setState({ ...state, nav: 'info' })}>
          <Text style={[CustomText.title, { fontSize: 18 }]}>정보</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { flex: 1, alignItems: 'center', height: 50, paddingTop: 10 },
            state.nav === 'review' ? { borderBottomColor: '#EDAA11', borderBottomWidth: 2 } : {}
          ]}
          onPress={() => setState({ ...state, nav: 'review' })}>
          <Text style={[CustomText.title, { fontSize: 18 }]}>리뷰</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const DetailNavContents: React.FC = () => {
    return (
      <View style={{paddingTop: 10}}>
        {state.nav === 'menu' ? <MenuList menulist={data.menus} />
          : state.nav === 'info' ? <TruckInfo data={data} />
            : <ReviewList reviewList={review} />}
      </View>
    )

  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${mainStore.proxy}/trucks/${targetId}`,
      );
      console.log(JSON.stringify(result.data));
      setData(result.data)
    };
    const fetchReview = async () => {
      const result = await axios(
        `${mainStore.proxy}/reviews/all/${targetId}`,
      );
      console.log(JSON.stringify(result.data))
      setReview(result.data)
    }
    fetchData();
    fetchReview();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{ width: '100%', height: 150, marginBottom: -30 }}
        source={{ uri: data.imgURL ? data.imgURL : '' }}
        defaultSource={{ uri: `https://picsum.photos/id/${data.id ? data.id : 0}/200` }}
      />
      <View style={{ paddingBottom: 10, backgroundColor: '#edaa11', width: '70%', alignSelf: 'center', borderRadius: 9, marginBottom: 5 }}>
        <View style={{ width: '100%', backgroundColor: '#f2be46', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 9, alignItems: 'center' }}>
          <Text style={[styles.titleHN, { fontSize: 24 }]}>{data.title}</Text>
        </View>
      </View>
      <View style={styles.truckContentsContainer}>
        <Text style={[CustomText.italic, CustomText.body, CustomText.textCenter, { fontSize: 16 }]}>{data.contents}</Text>
      </View>
      <DetailNavBar />
      <DetailNavContents />
    </View>
  )
}

const localStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    width: '95%',
    margin: 'auto',
  },
  intro: {
    fontSize: 10
  },
  truckContentsContainer: {
    paddingBottom: 10,
  },
})

const styles = { ...CustomText, ...CustomStyle, ...localStyle }