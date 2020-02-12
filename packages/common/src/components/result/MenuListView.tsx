import * as React from 'react'
import { useContext } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { CustomText, CustomStyle } from '../../static/CustomStyle'
import { COLOR_DARKGRAY, Colors } from '../../static/CustomColor'
import { History, LocationState } from 'history';
import { observer } from 'mobx-react-lite';
import { ReportStoreContext } from '../../store/ReportStore';

interface Props {
    history: History<LocationState>
}

const categoryToStr = (id) => {
    if(id === 90) return '부적절한 언행 | 부적절한 언행 또는 욕설';
    else if(id === 91) return '음란물 | 음란물, 선정적인 내용';
    else if(id === 92) return '폭력적인 내용 | 폭력적인 내용';
};

export const MenuListView: React.FC<Props> = observer(({history}) => {
    const reportStore = useContext(ReportStoreContext);

	const handleItemSelect = (id) => {
        reportStore.sellectedClassifiedCode = id;
        reportStore.sellectedString = categoryToStr(id);
        reportStore.dropDownState = false;
    }

	return (
        <View>
            <TouchableOpacity onPress={()=>handleItemSelect(90)} style={[styles.listView, { flexDirection: 'row' }]}>
                <View style={{ flex: 3, justifyContent: 'center' }}>
    <Text style={[CustomText.title, {color: Colors.black}]}>{categoryToStr(90)}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleItemSelect(91)} style={[styles.listView, { flexDirection: 'row' }]}>
                <View style={{ flex: 3, justifyContent: 'center' }}>
                    <Text style={[CustomText.title, {color: Colors.black}]}>{categoryToStr(91)}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleItemSelect(92)} style={[styles.listView, { flexDirection: 'row' }]}>
                <View style={{ flex: 3, justifyContent: 'center' }}>
                    <Text style={[CustomText.title, {color: Colors.black}]}>{categoryToStr(92)}</Text>
                </View>
            </TouchableOpacity>
        </View>
	)
});

const localStyle = StyleSheet.create({
	listView: {
		borderBottomColor: `rgba(${COLOR_DARKGRAY}, 0.5)`,
		borderBottomWidth: 1,
		paddingHorizontal: '6%',
		paddingVertical: '3%'
	}
});

const styles = { ...CustomStyle, ...localStyle }