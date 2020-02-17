import React, { } from 'react';
import { ContentContainer, CoveredPage } from '../components/modules';
import styled from 'styled-components';

const HeaderText1 = styled.h1`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 900;
  font-size: 48px;
  right: 20%;
  z-index: 2;
`

export const AdminMain = () => {

  return (
    <>
      <CoveredPage>
        <ContentContainer style={{
          zIndex: 1,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: 'url("https://images.unsplash.com/photo-1563861019306-9cccb83bdf0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80")'
        }}>
          <HeaderText1>푸드트럭 정보, 어디서 찾지 ?</HeaderText1>
        </ContentContainer>
      </CoveredPage>
      <CoveredPage>
        <ContentContainer>
          <div>hello this is main page.</div>
        </ContentContainer>
      </CoveredPage>
      <CoveredPage>
        <ContentContainer>
          <div>hello this is main page.</div>
        </ContentContainer>
      </CoveredPage>
    </>
  )
}