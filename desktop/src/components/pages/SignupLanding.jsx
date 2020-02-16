import React, { useContext } from 'react';
import { Link, ImageContainer, ContentContainer } from '../components/modules';
import { SignupStoreContext } from '../../store/SignupStore';
import styled from 'styled-components';
import { BREAK_POINT_MOBILE, BREAK_POINT_TABLET } from '../config/config';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const FormContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-top: 7%;
  margin-left: 10%;
  margin-right: auto;
  width: 95%;
  @media only screen and (min-width: ${BREAK_POINT_MOBILE}px) {
    width: 50%;
  }
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    width: 40%;
  }
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
      <ImageContainer imgURL={'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2851&q=80'}>
        <ContentContainer>
          <FormContainer>
            <MainText>푸드트럭 지도가</MainText>
            <MainText>처음이신가요?</MainText>
            <SubText>가입하고 푸드트럭을 홍보해보세요.</SubText>
            <Link href='#' onClick={()=>{signupStore.current='form'}} style={{display: 'block', textAlign: 'left', padding: 0, fontWeight: '700'}}>회원가입 하러가기 →</Link>
          </FormContainer>
        </ContentContainer>
      </ImageContainer>
    </MainContainer>
    </>
  )
}