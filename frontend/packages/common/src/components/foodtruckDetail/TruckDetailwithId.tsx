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
import { CustomStyle, CustomText } from '../../static/CustomStyle';
import ReviewList from './ReviewList';
import TruckInfo from './TruckInfo';
import { Colors } from '../../static/CustomColor';
import { mainStoreContext } from '../../store/MainStore';

interface IState {
  id: number,
  imgURL?: string,
  title: string,
  contents: string,
  latitude: number,
  longitude: number,
  state: string,
  menus: [],
  starRatingAVG: number
}

interface IFollow {
  isFollow: Boolean
}

interface IReply {
  id: number,
  content: string,
  createdAt: string,
  updatedAt: string,
  reviewId: number,
  userEmail?: string,
  sellerId?: number,
}

interface IReview {
  id: number,
  content: string,
  starRating: number,
  createdAt: string,
  updatedAt: string,
  truckId: number,
  userEmail: string,
  replies: IReply[],
}

interface Props {
  targetId: number
}

export const TruckDetailwithId: React.FC<Props> = ({ targetId }) => {
  const mainStore = useContext(mainStoreContext)
  const isLoggedIn = !!localStorage.getItem('userEmail')

  const [state, setState] = useState({
    nav: 'menu',
  })

  const [data, setData] = useState<IState>({
    id: 0, imgURL: '', title: '', contents: '', menus: [], latitude: 0.0, longitude: 0.0, state: '', starRatingAVG: 0.0})

  const [follow, setFollow] = useState<IFollow>({
    isFollow: true
  })

  const [review, setReview] = useState<IReview[]>([{
    id: 0, content: '', starRating: 1, createdAt: '', updatedAt: '', truckId: 0, userEmail: '', replies: [],
  }])

  const followButtonInfo = {
    width: mainStore.screenWidth / 10, height: mainStore.screenWidth / 10, offset: mainStore.screenWidth / 20
  }

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
    console.log('navcontent', data)

    const handleDeleteReview = (reviewId) => {
      console.log('delete', reviewId)
      setReview(review.filter(item=>item.id !== reviewId))
    }

    return (
      <View style={{paddingTop: 10}}>
        {state.nav === 'menu' ? <MenuList menulist={data.menus} />
          : state.nav === 'info' ? <TruckInfo id={targetId} data={data} />
            : <ReviewList reviewList={review.sort((a,b)=> Date.parse(b.updatedAt) - Date.parse(a.updatedAt))} truckId={targetId} onDelete={handleDeleteReview}/>}
      </View>
    )
  }

  const clickedFollowButton = () => {
    console.log("clickedFollowButton", data);

    // follow 상태를 바꾸는 api 전송
    axios.post(`/follows/follow/`, {
      truckId: targetId
    }).then((response) => {
      console.log("follow response : ", response.data);
      console.log("follow state : ", response.data.isFollow);
      setFollow({isFollow: response.data.isFollow})
    })
    .catch(function (error) {
      console.log(error);
      if (error.response.status === 401) {
        alert('로그인 후 사용 가능한 기능입니다.')
      }
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/trucks/${targetId}`,
      );
      console.log("result: ", result.data.result)
      setData(result.data.result)
      setFollow({isFollow: result.data.isFollow})
    };
    const fetchReview = async () => {
      const result = await axios(`/reviews/all/${targetId}`,
      );
      console.log("Review: ", result.data)
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
      {isLoggedIn ? 
      <TouchableOpacity
        style={{ position: 'absolute', right: 2 + followButtonInfo.offset/ 2, top: 120 + followButtonInfo.offset / 2, alignSelf: 'center', height: followButtonInfo.height, width: followButtonInfo.width, borderRadius: followButtonInfo.offset, borderColor: '#FFFFFF', borderWidth: 1.2, alignItems: 'center', justifyContent: 'center', backgroundColor: follow.isFollow === true ? '#ec585c': '#c0c0c0' }}
        onPress={() => clickedFollowButton()} >
        <Image
        style={{ tintColor: '#ffffff', width: 25, height: 25 }}
        source={require('@foodtruckmap/common/src/static/icon_processed/noun_Heart_1015352.png')} />
      </TouchableOpacity>
      : <></>}
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