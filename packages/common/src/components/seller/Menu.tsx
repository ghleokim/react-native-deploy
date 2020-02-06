import React, {useContext, useState} from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { CustomStyle, CustomText } from "../../static/CustomStyle";

const LocalStyles = StyleSheet.create({
  form: {
    width: '80%',
    alignSelf: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2AC1BC',
    margin: 10,
    width: '80%',
    alignSelf: 'center'
  },
  caption: {
    width: '80%',
    color: '#a0a0a0',
    alignSelf: 'center',
    fontSize: 13,
    marginVertical: 5,
    marginLeft: 10
  },
  menuContainer: {
    borderBottomColor: '#969698',
    borderBottomWidth: 2,
    borderStyle: "dashed",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    flex: 1
  },
  menuButton: {
    flex: 1,
    marginTop: 5,
    paddingVertical: 3,
    borderRadius: 6,
  },
});

const styles = { ...CustomStyle, ...LocalStyles }

interface IProps {
  id: number,
  name: string,
  price: number,
  content: string,
  imgURL: string,
  isSoldOut: boolean
  handleMenuSubmit: any,
}

export default (props:IProps) => {

  const [editText] = useState({
    price: props.price, 
    name: props.name, 
    content: props.content, 
    isSoldOut: props.isSoldOut,
  })

  const [isEditing, setIsEditing] = useState(false);

  const onChangeText = (target: string, text: string) => {
    editText[target] = text;
  }
  
  const submit = () => {
    let requestDto = {
      name: editText.name,
      content: editText.content,
      price: editText.price,
    }
    props.handleMenuSubmit(props.id, requestDto);
    setIsEditing(false);
  }

  const cancel = () => {
    setIsEditing(false);
  }

  const nonEditingComponent = () => {
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[CustomText.title, { fontSize: 18 }]}>{props.name}</Text>
          <View style={{ marginHorizontal: 10, flexGrow: 1, alignSelf: 'center',  borderStyle: 'dotted', borderColor: '#000000', borderWidth: 1 }}></View>
          <Text style={[CustomText.title, { color: '#20a024', fontSize: 16 }]}>{props.price} 원</Text>
        </View>
        <View>
          <Text style={[CustomText.body]}>{props.content}</Text>
        </View>
        <TouchableOpacity style={[styles.menuButton, {backgroundColor: '#4177c9',}]} onPress={() => setIsEditing(true)}><Text style={{textAlign: 'center', color: '#FFFFFF', fontWeight: '700'}}>수정</Text></TouchableOpacity>
      </View>
    )
    }

  const editingComponent = () => {
    return (
        <View style={{ marginLeft: 15, flexShrink: 1, alignSelf: 'center', width:'100%' }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontWeight: '700', marginRight: 5}}>메뉴</Text>
            <TextInput
              style={{ borderColor: '#303030', borderBottomWidth: 2, paddingVertical: 5, paddingHorizontal: 6 }}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              defaultValue={props.name}
              onChangeText={text => onChangeText('name', text)}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontWeight: '700', marginRight: 5}}>가격</Text>
            <TextInput
              style={{ borderColor: '#303030', borderBottomWidth: 2, paddingVertical: 5, paddingHorizontal: 6 }}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              defaultValue={String(props.price)}
              onChangeText={text => onChangeText('price', text)}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontWeight: '700', marginRight: 5}}>내용</Text>
            <TextInput
              style={{ borderColor: '#303030', borderBottomWidth: 2, paddingVertical: 5, paddingHorizontal: 6 }}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              defaultValue={props.content}
              onChangeText={text => onChangeText('content', text)}
            />
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.menuButton, {backgroundColor: '#4177c9',}]} onPress={() => submit()}><Text style={{textAlign: 'center', color: '#FFFFFF', fontWeight: '700'}}>등록</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.menuButton, {backgroundColor: '#798391',}]} onPress={() => cancel()}><Text style={{textAlign: 'center', color: '#FFFFFF', fontWeight: '700'}}>취소</Text></TouchableOpacity>
          </View>
        </View>
    )
  }

  return (
    <View style={styles.menuContainer}>
      <View style={{ alignSelf: 'center' }}>
        <Image
          defaultSource={{ uri: `https://picsum.photos/id/${props.id}/200` }}
          source={{ uri: props.imgURL }}
          style={{ width: 70, height: 70, borderRadius: 10 }}
        />
      </View>
      <View style={{ marginLeft: 15, flexShrink: 1, alignSelf: 'center', width:'100%' }}>
        {isEditing
          ? editingComponent()
          : nonEditingComponent()
        }
      </View>
    </View>
  );
  
};
