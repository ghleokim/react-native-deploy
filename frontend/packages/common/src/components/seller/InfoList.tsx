import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet
} from "react-native";
import Line from '../Line'
import InfoStaticMaps from '../map/InfoStaticMaps';
import OpeningState from '../seller/OpeningState';
import { WebPicker } from './WebPicker';
import axios from 'axios';

interface IState {
    id: Number,
    _lat: Number,
    _lng: Number,
    state: string,
  }

interface IProps {
  data: IState,
}

export default (infoData: IProps) => {
    useEffect(() => {
        axios.get(`openingHours/getTime/${infoData.data.id}`)
            .then((response) => {
                console.log('getTime : ', response);
                setBeginTime(response.data.beginTime);
                setEndTime(response.data.endTime);
            })
            .catch((err) => console.log(err));
    }, []);

    const [beginTime, setBeginTime] = useState('09:00');
    const [endTime, setEndTime] = useState('18:00');

    const HoursOfOperation: React.FC = () => {
        const SubmitButton: React.FC = () => {
            const sendTimeSetting = () => {
                axios.put('openingHours/updateTime', { beginTime: beginTime, endTime: endTime })
                    .then((response) => {
                        console.log('updateTime : ', response);
                    })
                    .catch((err) => console.log(err))
            }
            return (
                <View style={{height: 30, width: 100}}>
                    <Button title='시간 수정' onPress={ sendTimeSetting }></Button>
                </View>
            )
        }
        return (
            // 디자인 수정 필요
            <View>
                <View style={{ height: 50, width: '50%' }}>
                    <Text>시작 시간</Text>
                    <WebPicker currentValue={beginTime} onChange={(e) => { console.log(setBeginTime(e)) }} options={[{ label: '00', value: 0 }, { label: '01', value: 1 }, { label: '02', value: 2 },]} style={'jin'} ></WebPicker>
                </View>
                <View style={{ height: 50, width: '50%' }}>
                    <Text>종료 시간</Text>
                    <WebPicker currentValue={endTime} onChange={(e) => { console.log(setEndTime(e)) }} options={[{ label: '00', value: 0 }, { label: '01', value: 1 }, { label: '02', value: 2 },]} style={'jin'} ></WebPicker>
                </View>
                <SubmitButton />
            </View>
        )
    }

    return (
        <View>
            {infoData.data.state !== 'closed' ? <InfoStaticMaps data={infoData.data}/> : <></>}
            <Line/>
            <OpeningState state={infoData.data.state}></OpeningState>
            <Line/>
            <HoursOfOperation/>
        </View>
    );
};