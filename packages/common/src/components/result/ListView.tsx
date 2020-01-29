import * as React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { CustomText, CustomStyle } from '../../static/CustomStyle'
import { COLOR_DARKGRAY, Colors } from '../../static/CustomColor'

import { truckStatus, searchResultContext } from '../../store/SearchStore'

interface Props {
	id: number,
	title: string,
	description: string,
	imageUri?: string,
	currentStatus: truckStatus,
	latitude?: number,
	longitude?: number,
	destination?: string,
}

export const ListView: React.FC<Props> = ({ id, imageUri, title, description, currentStatus }) => {
	const searchResultStore = React.useContext(searchResultContext)

	const handleItemSelect = (id) => {
		searchResultStore.isSelected = true;
		searchResultStore.selectedItem = id;
		console.log(searchResultStore.isSelected)
	}
	
	const isOpen = () => { return currentStatus === 'open' }

	return (
		<TouchableOpacity disabled={!isOpen()} onPress={()=>handleItemSelect(id)} style={[styles.listView, { flexDirection: 'row' }]}>
			<View style={{ flex: 1 }}>
				<Image style={{ borderRadius: 30, width: 60, height: 60 }} source={{ uri: imageUri === undefined ? 'https://picsum.photos/200' : imageUri }} />
			</View>
			<View style={{ flex: 3, justifyContent: 'center' }}>
				<Text style={[CustomText.title, isOpen() ? { color: Colors.black } : { color: Colors.gray }]}>{title}</Text>
				<Text style={[CustomText.body, isOpen() ? { color: Colors.black } : { color: Colors.gray }]}>{description}</Text>
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