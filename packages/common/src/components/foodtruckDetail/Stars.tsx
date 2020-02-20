import React, {} from 'react';
import { Image } from "react-native";

interface StarProps {
  height? : number,
  width?: number
}

export const StarGray: React.FC<StarProps> = ({height, width}) => {
  return <Image source={require('@foodtruckmap/common/src/static/icon_processed/star-gray.png')} style={{ height: height ? height : 35, width: width ? width : 35 }}/>
}

export const StarYellow: React.FC<StarProps> = ({height, width}) => {
  return <Image source={require('@foodtruckmap/common/src/static/icon_processed/star-yellow.png')} style={{ height:  height? height : 35, width: width ? width : 35 }}/>
}

export const StarYellowOutline: React.FC<StarProps> = ({height, width}) => {
  return <Image source={require('@foodtruckmap/common/src/static/icon_processed/star-yellow-outline.png')} style={{ height:  height? height : 35, width: width ? width : 35 }}/>
}