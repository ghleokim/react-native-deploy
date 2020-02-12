import * as React from 'react';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { observer } from 'mobx-react-lite';
import { CustomStyle, CustomText } from '../static/CustomStyle';
import { Colors } from '../static/CustomColor';
import { RouteComponentProps } from 'react-router-dom';
import { ReportStoreContext } from '../store/ReportStore';
import { MenuListView } from '../components/result/MenuListView';
import axios from 'axios';
import { History, LocationState } from 'history';

interface Location extends LocationState {
  division: number,
  targetId: number,
}

interface Props {
  history: History<Location>
}

export const RouteReport: React.FC<Props> = observer(({history}) => {
  const [write, setWrite] = useState(false)
  const [content, setContent] = useState({ content: ''})
  const reportStore = useContext(ReportStoreContext);

  const onChangeText = (text) => {
    content.content = text
  }

  const showDropDownList = () => {
    if(reportStore.dropDownState === false)
      reportStore.sellectedClassifiedCode = '';
      reportStore.dropDownState = !reportStore.dropDownState;
  }

  const sendReport = () => {
    if (!!content.content) {
      axios.post('/reports/report'
        , {...content, category: reportStore.sellectedClassifiedCode, division: history.location.state.division, targetId: history.location.state.targetId})
      .then(response=>{
        console.log(response)
      })
      .catch(err=>console.log(err))
      } else {
        alert('신고 내용을 입력해주세요.')
      }
  }

  return (
    <View>
      <View>
        {/* 드롭다운 버튼 */}
        <Button title={reportStore.sellectedString === '' ? "dropDown" : reportStore.sellectedString} onPress={showDropDownList}></Button>
        {(reportStore.dropDownState === true) ?
          <MenuListView history={history}></MenuListView>
          : <></>
        }
      </View>
      <View>
        {/* 신고 내용 */} 
        <TextInput
          multiline
          numberOfLines={5}
          onChangeText={(text) => onChangeText(text)}
          defaultValue={content.content} />
      </View>
      <View>
        {/* 신고 버튼 */} 
        <Button title='신고하기' disabled={false} onPress={sendReport}/>
      </View>
    </View>
  )
})

const LocalStyles = StyleSheet.create({
  mainBanner: {
    height: 150,
    width: '100%',
    backgroundColor: '#f3f3f3'
  },
  mainBannerImage: {
    height: 150,
    width: '100%',
  },
  mainButtonWrapper: {
    height: 100,
    width: '100%',
    padding: 10
  },
  mainButton: {
    width: '100%',
    borderColor: 'rgba(236, 76, 100, 0.7)',
    backgroundColor: '#ec585c',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    backgroundColor: 'rgba(200,200,200,0.2)',
    color: '#ffffff'
  },
  staticInfo: {
    backgroundColor: '#e4e4e5',
    marginTop: 5,
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  staticText: {
    ...CustomText.logo,
    fontSize: 14,
    color: '#505050'
  },
  staticTextLink: {
    textDecorationLine: 'underline',
  }
})

const styles = { ...CustomStyle, ...LocalStyles }