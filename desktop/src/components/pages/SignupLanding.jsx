import React, { useContext } from 'react';
import { Link, Col } from '../components/modules';
import { SignupStoreContext } from '../../store/SignupStore';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const MainText = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 900;
  font-size: 1.5em;
  text-align: left;
`

const SubText = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8em;
  text-align: left;
  margin-bottom: 0.5em;
`

export const SignupLanding = () => {
  const signupStore = useContext(SignupStoreContext);

  return (
    <>
    <MainContainer>
      <Col xs={12} sm={9} md={6} lg={6}>
        <MainText>푸드트럭 지도가</MainText>
        <MainText>처음이신가요?</MainText>
        <SubText>가입하고 푸드트럭을 홍보해보세요.</SubText>
        <Link href='#' onClick={()=>{signupStore.current='form'}} style={{textAlign: 'left', padding: 0}}>회원가입 하러가기 →</Link>
      </Col>
    </MainContainer>
    </>
  )
}