import * as React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { CustomText, CustomStyle } from '../../static/CustomStyle'
import { COLOR_DARKGRAY, Colors } from '../../static/CustomColor'
import { truckStatus, searchResultContext } from '../../store/SearchStore'
import { History, LocationState } from 'history';

interface Props {
	id: number,
	title: string,
	contents: string,
	imageUri?: string,
	currentStatus: truckStatus,
	latitude?: number,
	longitude?: number,
	destination?: string,
	history: History<LocationState>,
}

export const ListView: React.FC<Props> = ({ history, id, imageUri, title, contents, currentStatus }) => {
	const handleItemSelect = (id) => {
		history.push(`/trucks/${id}`)
	}
	
	const isOpen = () => { return true } // this has to be removed // ? currentStatus === 'open' }

	return (
		<TouchableOpacity disabled={!isOpen()} onPress={()=>handleItemSelect(id)} style={[styles.listView, { flexDirection: 'row' }]}>
			<View style={{ flex: 1 }}>
				<Image style={{ borderRadius: 30, width: 60, height: 60 }} defaultSource={require('@foodtruckmap/common/src/static/icon_processed/truck_bw_120.png')} source={{ uri: imageUri }} />
			</View>
			<View style={{ flex: 3, justifyContent: 'center' }}>
				<Text style={[CustomText.title, isOpen() ? { color: Colors.black } : { color: Colors.gray }]}>{title}</Text>
				<Text style={[CustomText.body, isOpen() ? { color: Colors.black } : { color: Colors.gray }]}>{contents}</Text>
				<Text style={[CustomText.body, isOpen() ? { color: Colors.black } : { color: Colors.gray }]}>{currentStatus}</Text>
			</View>
		</TouchableOpacity>
	)
}

const localStyle = StyleSheet.create({
	listView: {
		borderBottomColor: `rgba(${COLOR_DARKGRAY}, 0.5)`,
		borderBottomWidth: 1,
		paddingHorizontal: '6%',
		paddingVertical: '3%'
	}
});

const styles = { ...CustomStyle, ...localStyle }