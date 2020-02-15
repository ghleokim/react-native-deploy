import React, {} from 'react';
import styled from 'styled-components';
import { HEADER_HEIGHT } from '../config/config';
import { Button } from './modules'
import axios from 'axios';

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: ${HEADER_HEIGHT};
  top: 0;
  z-index: 100;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.3rem 0.7rem 0.25rem 0.6rem;
  justify-content: start;
  align-items: baseline;
`;

const Title = styled.h1`
  font-size: 1.5em;
  font-family: '"Palatino Linotype", "Book Antiqua", Palatino, serif';
  text-align: center;
  color: #333333;
  margin-bottom: 0.5em; 
  padding: 0 0.3em 0 0.3em;
`;

export const Header = () => {
  const healthCheck = () => {
    axios.get('/').then(e=>console.log(e)).catch(e=>console.log(e))
  }

  return (
    <Container>
      <FlexContainer>
        <Title>
          Title conatiner
        </Title>
        <div>
          <Button href="/">home</Button>
          <Button href="/guide">guide</Button>
          <Button href="/auth">signup</Button>
          <Button onClick={()=>{healthCheck()}}>DEV</Button>
        </div>
      </FlexContainer>
    </Container>
  )
}
