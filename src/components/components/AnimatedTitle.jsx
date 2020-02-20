import React, { useState } from 'react';
import { useInterval } from './functions';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.2em;
  font-family: Palatino Linotype, Book Antiqua, Palatino, serif;
  text-align: center;
  color: #333333;
  padding: 0 0.3em 0 0.3em;
`;

export const AnimatedTitle = () => {

  const styles = {
    title: {
      fontSize: 19.2,
      fontFamily: 'Palatino Linotype, Book Antiqua, Palatino, serif',
      textAlign: 'center',
    },
    animated: {
      transition: '.25s all'
    },
    visible: {
      color: '#333333'
    },
    invisible: {
      position: 'absolute',
      top: -50,
      color: 'rgba(255,255,255,0)'
    }
  }

  const [up, setUp] = useState(false);

  useInterval(() => {
    setUp(!up)
    // console.log('b')
  }, 3000)

  const transitionText = (textA, textB) => {
    if (up) {
      return (<span style={{ padding: 0, marginLeft: 3 }}>
        <Title style={{ justifyContent: 'end', margin: 0, padding: 0, ...styles.title, ...styles.visible, ...styles.animated }}>{textA}</Title>
        <Title style={{ margin: 0, padding: 0, ...styles.title, ...styles.invisible, ...styles.animated }}>{textB}</Title>
      </span>)
    } else {
      return (<span style={{ padding: 0, marginLeft: 3 }}>
        <Title style={{ margin: 0, padding: 0, ...styles.title, ...styles.invisible, ...styles.animated }}>{textA}</Title>
        <Title style={{ margin: 0, padding: 0, ...styles.title, ...styles.visible, ...styles.animated }}>{textB}</Title>
      </span>)
    }
  }

  return (
    <Title style={{ margin: 0, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}><span>food</span>{transitionText('tr', ' d')}<span>uck</span>{transitionText('🚚', '🦆')}</Title>
  )
}