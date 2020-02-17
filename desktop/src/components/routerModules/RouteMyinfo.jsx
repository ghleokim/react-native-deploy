import * as React from 'react';
import { ContentContainer } from '../components/modules';
import styled from 'styled-components';
import { BREAK_POINT_MOBILE, BREAK_POINT_TABLET } from '../config/config';

const MainText = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 900;
  font-size: 1.5em;
  text-align: center;
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: row;
`

const FlexItem = styled.div`
  flex: 1;
`

const FormContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  @media only screen and (min-width: ${BREAK_POINT_MOBILE}px) {
    width: 50%;
  }
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    width: 40%;
  }
`


export const RouteMyinfo = () => {
  return (
      <ContentContainer>
        <FlexContainer>
          <MainText>내 정보</MainText>
        </FlexContainer>
      </ContentContainer>
    )
}