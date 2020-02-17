import React, { useState, useContext, useEffect } from 'react';
import { useInterval } from './functions';
import styled from 'styled-components';
import { MainStoreContext } from '../../store/MainStore';
import { observer } from 'mobx-react-lite';
import { SCREEN_HEIGHT } from '../config/config';

const Title = styled.h1`
  font-size: 1.2em;
  font-family: Palatino Linotype, Book Antiqua, Palatino, serif;
  text-align: center;
  color: #333333;
  padding: 0 0.3em 0 0.3em;
`;


export const AnimatedSlider = observer(() => {
  const mainStore = useContext(MainStoreContext);

  const contents = [
    { title: '수제버거가', imgURL: 'https://images.unsplash.com/photo-1559249849-58451f22f489?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80' },
    { title: '아이스크림이', imgURL: 'https://images.unsplash.com/photo-1505075232616-5aea40f97c63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' },
    { title: '타코가', imgURL: 'https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' },
  ]

  const [curPage, setPage] = useState(0);


  const styles = {
    title: {
      fontSize: 19.2,
      fontFamily: 'Palatino Linotype, Book Antiqua, Palatino, serif',
      textAlign: 'center',
    },
    animated: {
      transition: '.5s all'
    },
    ready: {
      position: 'absolute',
      opacity: 0,
      // height: 0,
      // width: 0,
    },
    visible: {
      marginTop: '3%',
      color: '#333333',
    },
    invisible: {
      position: 'absolute',
      zIndex: 2,
      color: 'rgba(255,255,255,0)',
      opacity: 0,
      // height: 0,
      // width: 0,
    },
    image: {
      objectFit: 'cover',
      height: SCREEN_HEIGHT * 0.5,
      width: SCREEN_HEIGHT * 0.5
    }
  }

  useEffect(()=>{
    mainStore.HeaderTextTwo = contents[curPage].title
  }, [curPage])

  useInterval(() => {
    setPage((curPage + 1) % 3)
    
    console.log('b')
  }, 3000)

  const transitionImage = () => {
    return <>
      <img src={contents[0].imgURL} style={Object.assign({...styles.image, ...styles.animated, }, curPage === 0 ? styles.visible: curPage === 1 ? styles.invisible : styles.ready)}/>
      <img src={contents[1].imgURL} style={Object.assign({...styles.image, ...styles.animated, }, curPage === 1 ? styles.visible: curPage === 2 ? styles.invisible : styles.ready)}/>
      <img src={contents[2].imgURL} style={Object.assign({...styles.image, ...styles.animated, }, curPage === 2 ? styles.visible: curPage === 0 ? styles.invisible : styles.ready)}/>
    </>
  }

  return (
    <>{transitionImage()}</>
  )
})