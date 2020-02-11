import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { CustomStyle } from "../../static/CustomStyle";
import Dropzone from 'react-dropzone'
import axios from 'axios'

interface IProps {
    id?: number,
    name?: string,
    price?: number,
    content?: string,
    imgURL?: string,
    isSoldOut?: boolean,
    handleMenuSubmit: Function,
    handleMenuCancel: Function,
}

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
    textInput: { borderColor: '#303030', borderBottomWidth: 2, paddingVertical: 5, paddingHorizontal: 6, textAlign: 'right'}
  });
  
  const styles = { ...CustomStyle, ...LocalStyles }
  
export default (props: IProps) => {

    const [editText] = useState({
        price: props.price, 
        name: props.name, 
        content: props.content, 
        isSoldOut: props.isSoldOut,
      })

    const [imgURL, setImgURL] = useState(props.imgURL || 'https://www.idaegu.co.kr/news/photo/201912/2019122601000845100051951.jpg')
      
    const submit = () => {
        const reg_price = /^([0-9]+)$/;

        if ( ""+editText.price=='' || editText.name=='' || editText.content=='' ) {
            alert("빈칸을 채워주세요.");
            return;
        }

        if (!reg_price.test(String(editText.price))) {
            alert("유효하지 않은 가격입니다.");
            return;
        }

        let requestDto = {
            name: editText.name,
            content: editText.content,
            price: editText.price,
            imgURL: imgURL,
        }
        props.handleMenuSubmit(requestDto, props.id);
    }

    const cancel = () => {
        props.handleMenuCancel();
    }
    

    const onChangeText = (target: string, text: string) => {
        editText[target] = text;
      }

    const imageFileReg = /\.(gif|jpg|jpeg|tiff|png|bmp)$/i
    const submitImage = (files) => {

        if (files.length === 0) {
            alert("사진이 존재하지 않습니다.");
            return;
        }

        if (files.length !== 1) {
            alert("사진을 1개만 등록해주세요.")
            return;
        }

        const file = files[0];
        const fileName = file.name;
        const fileSize = file.size;

        if (!imageFileReg.test(fileName)) {
            alert("지원하지 않는 확장자입니다.")
            return;
        }

        if (fileSize > 20000000) { // 20MB
            alert("20MB를 초과하는 이미지는 등록할 수 없습니다.")
            return;
        }
        
        const formData = new FormData();
        formData.append('userfile', file);

        axios.post("/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
        .then((res) => {
            alert("파일 등록 완료")
            setImgURL(res.data.imgName)
        })
    }

      return (
        <>
        <View style={{ alignSelf: 'center' }}>
            <Dropzone onDrop={acceptedFiles => submitImage(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Image
                                source={{ uri: imgURL.startsWith('http') ? imgURL : `${axios.defaults.baseURL}/user/${imgURL}` }}
                                style={{ width: 70, height: 70, borderRadius: 10 }}
                                />
                            </div>
                      </section>
                )}
            </Dropzone>

      </View>

      <View style={{ marginLeft: 15, flexShrink: 1, alignSelf: 'center', width:'100%' }}>
            
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{fontWeight: '700', marginRight: 5}}>메뉴</Text>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            defaultValue={editText.name}
            onChangeText={text => onChangeText('name', text)}
          />
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{fontWeight: '700', marginRight: 5}}>가격</Text>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            defaultValue={editText.price === undefined ? '' : String(editText.price)}
            onChangeText={text => onChangeText('price', text)}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{fontWeight: '700', marginRight: 5}}>내용</Text>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            defaultValue={editText.content}
            onChangeText={text => onChangeText('content', text)}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity style={[styles.menuButton, {backgroundColor: '#4177c9',}]} onPress={() => submit()}><Text style={{textAlign: 'center', color: '#FFFFFF', fontWeight: '700'}}>등록</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.menuButton, {backgroundColor: '#798391',}]} onPress={() => cancel()}><Text style={{textAlign: 'center', color: '#FFFFFF', fontWeight: '700'}}>취소</Text></TouchableOpacity>
        </View>
      </View>
      </>
      )
}