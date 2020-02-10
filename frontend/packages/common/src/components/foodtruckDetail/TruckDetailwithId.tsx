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

interface IState {
  id: number,
  imgURL?: string,
  title: string,
  contents: string,
  menus: [],
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
  startRating: number,
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
  const [state, setState] = useState({
    nav: 'menu',
  })

  const [data, setData] = useState<IState>({
    id: 0, imgURL: '', title: '', contents: '', menus: [] })

  const [follow, setFollow] = useState<IFollow>({
    isFollow: true
  })

  const [review, setReview] = useState<IReview[]>([{
    id: 0, content: '', startRating: 1, createdAt: '', updatedAt: '', truckId: 0, userEmail: '', replies: [],
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
    console.log('navcontent', data)

    const handleDeleteReview = (reviewId) => {
      console.log('delete', reviewId)
      setReview(review.filter(item=>item.id !== reviewId))
    }

    return (
      <View style={{paddingTop: 10}}>
        {state.nav === 'menu' ? <MenuList menulist={data.menus} />
          : state.nav === 'info' ? <TruckInfo data={data} />
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
      <TouchableOpacity
        style={{ position: 'absolute', right: 10, top: 50, alignSelf: 'center', paddingTop: 8, paddingBottom: 8, marginBottom: 5, height: 30, width: 30, borderRadius: 15, borderColor: '#FFFFFF', borderWidth: 1.2, alignItems: 'center', justifyContent: 'center', backgroundColor: follow.isFollow === true ? '#ec585c': '#c0c0c0' }}
        onPress={() => clickedFollowButton()} >
        <Image
        style={{ tintColor: '#ffffff', width: 21, height: 21 }}
        source={require('@foodtruckmap/common/src/static/icon_processed/noun_Heart_1015352.png')} />
        
      </TouchableOpacity>
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