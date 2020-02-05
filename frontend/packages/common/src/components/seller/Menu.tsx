import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import { CustomStyle } from "../../static/CustomStyle";

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
  }
});

const styles = { ...CustomStyle, ...LocalStyles }

interface IProps {
  id: number,
  name: string,
  price: number,
  content: string,
  imgURL: string,
}

export default (props:IProps) => {
  const [editText] = useState({
    id: '', 
    truckId: '', 
    price: '', 
    name: '', 
    content: '', 
    isSoldOut: '',
  })

  const [isEditing, setIsEditing] = useState({
    id: false, 
    truckId: false, 
    price: false, 
    name: false, 
    content: false, 
    isSoldOut: false,
  });

  const onChangeText = (target: string, text: string) => {
    editText[target] = text;
  }
  
  const submit = (target: string) => {
    console.log("data: " + editText['name'])
    console.log("editText: " + editText[target])
  
    // axios.put(`${mainStore.proxy}/trucks/update`)
    // .then((res) => {
    //   console.log(res.data);
    //   setData(res.data);
    //   console.log(data);
    // })
  
    isEditing[target] = false;
  }

  
  const cancel = (target: string) => {
    console.log("before editText : " + editText[target]);
    editText[target] = props[target];
    console.log("after editText : " + editText[target]);
    getdd(target);
  }

  const editComponent = (target: string) => {
    return (
      <View>
      {isEditing[target]
        ? <View>
            <TextInput
              style={[styles.input, LocalStyles.form]}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              defaultValue={props[target]}
              onChangeText={text => onChangeText(target, text)}
            />
            <Button title="완료" onPress={()=> submit(target)}></Button>
            <Button title="취소" onPress={()=> cancel(target)}></Button>
          </View>
        : <View>
        <Text style={[styles.input, LocalStyles.form]}>{props[target]}</Text>
          <Button title="수정" onPress={()=> getdd(target)}></Button>
        </View>
      }
      </View>
    )
  }

  const getdd = (target:string) => {
    const result = {...isEditing};
    result[target] = !result[target];
    setIsEditing(result);
  }

  return (
    <View>
      <Image
      style={{width: 50, height: 50}}
      source={{uri: props.imgURL}}
     />  
      <Text>이름: {props.name}</Text>
      {editComponent('name')}
      <Text>내용: {props.content}</Text>
      {editComponent('content')}
      <Text>가격: {props.price}</Text>
      {editComponent('price')}
    </View>
  );
  
};
