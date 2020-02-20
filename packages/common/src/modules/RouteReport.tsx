import * as React from 'react';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, } from 'react-native';
import { observer } from 'mobx-react-lite';
import { CustomStyle, CustomText } from '../static/CustomStyle';
import { Colors } from '../static/CustomColor';
import { RouteComponentProps } from 'react-router-dom';
import { ReportStoreContext } from '../store/ReportStore';
import { MenuListView } from '../components/result/MenuListView';
import axios from 'axios';
import { History, LocationState } from 'history';
import Line from '../components/Line'

interface Location extends LocationState {
  division: number,
  targetId: number,
}

interface Props {
  history: History<Location>
}

export const RouteReport: React.FC<Props> = observer(({history}) => {
  const [content] = useState({ content: ''})
  const reportStore = useContext(ReportStoreContext);

  const onChangeText = (text) => {
    content.content = text
  }

  const showDropDownList = () => {
    if(reportStore.dropDownState === false)
      reportStore.sellectedClassifiedCode = '';
      reportStore.dropDownState = !reportStore.dropDownState;
  }

  const cancelReport = () => {
    clear()
    history.goBack()
  }

  const clear = () => {
    reportStore.dropDownState = false
    reportStore.sellectedClassifiedCode = ''
    reportStore.sellectedString = ''

  }

  const sendReport = () => {
    if (!content.content) {
      alert('신고 내용을 입력해주세요.')
      return
    }  

    if (!content.content) {
      alert('신고 내용을 입력해주세요.')
      return
    }  

    if (!reportStore.sellectedClassifiedCode) {
      alert('신고 분류를 선택해주세요.')
      return
    }
    
    axios.post('/reports/report'
        , {...content, category: reportStore.sellectedClassifiedCode, division: history.location.state.division, targetId: history.location.state.targetId})
      .then(() => {
        alert('신고 내용 접수하였습니다.')
        clear()
        history.replace('/')
      })
      .catch(err=>console.log(err))
    }

  return (
    <View style={styles.reportContainer}>

    <View style={styles.reportContentContainer}>

      <View style={styles.reportTitle}>
        <Text style={[CustomText.textCenter, CustomText.titleHN, { fontSize: 22 }]}>신고</Text>
      </View>
      <View style={styles.reportContentReportType}>
        <View style={{flexDirection:'row', alignItems: 'center'}}>
          <Text style={styles.reportSubTitle}>신고 분류</Text>
        </View>
        <View style={{flex:4, flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={showDropDownList} ><Text>{reportStore.sellectedString === '' ? "클릭해 주세요." : reportStore.sellectedString}</Text></TouchableOpacity>
          {(reportStore.dropDownState === true)
            ? <MenuListView history={history}></MenuListView>
            : <></>
          }
        </View>
      </View>
      
      <View style={{marginVertical: 4}}>
        <Line></Line>
      </View>

      <View style={styles.reportContentReportContent}>
        <View style={{flexDirection:'row', alignItems: 'center',}}>
          <Text style={[styles.reportSubTitle, {paddingBottom: 5}]}>신고 내용</Text>
        </View>
        {/* 신고 내용 */} 
        <View style={{borderWidth:1, borderRadius: 10, borderColor: '#dadada', padding: 5}}>
        <TextInput
          multiline
          numberOfLines={10}
          onChangeText={(text) => onChangeText(text)}
          placeholder={'내용을 입력해 주세요.'}
          />
        </View>
      </View>

      <View style={styles.reportContentReportButton}>
        {/* 신고 버튼 */} 
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <TouchableOpacity style={styles.editButton} onPress={() => sendReport()}><Text style={{textAlign: 'center', color: '#FFFFFF', fontWeight: '700', margin:0, padding:0}}>전송</Text></TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={() => cancelReport()}><Text style={{textAlign: 'center', color: '#FFFFFF', fontWeight: '700', margin:0, padding:0}}>취소</Text></TouchableOpacity>
        </View>
      </View>
    </View>
    
  </View>
  )
})

const LocalStyles = StyleSheet.create({
  reportContainer: {
    backgroundColor: '#AAAAAA',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 15,
  },
  
  reportContentContainer: {
    flexDirection: 'column',
    alignContent: 'space-between',
    justifyContent: 'space-between',

    backgroundColor: '#FAFAFA',

    paddingHorizontal: 5,

    borderRightWidth: 2,
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderTopWidth: 1,
    borderLeftColor: '#e6e6e8',
    borderRightColor: '#d6d6d8',
    borderBottomColor: '#86878b',
    borderTopColor: '#f6f6f8',
    borderRadius: 10,
  },

  reportTitle: {
    flex:0.4,
    paddingVertical: 10,
    justifyContent: 'center',
    borderBottomWidth: 2,
  },

  reportContentReportType: {
    zIndex:100,
    flex:0.5,
    flexDirection: 'row',
    paddingVertical: '1vh', 
  },

  reportContentReportContent: {
    paddingVertical: '1vh', 
  },

  reportContentReportButton: {
    flex:1,
  },

  reportCard: {
    paddingVertical: 20
  },

  reportSubTitle: {
    fontSize: 16,
    fontWeight: '800',
  },

  editButton: {
    marginHorizontal: 7,
    paddingVertical: 2,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 6,
    backgroundColor: Colors.navy,
  },

})

const styles = { ...CustomStyle, ...LocalStyles }