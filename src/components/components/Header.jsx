import React, { useContext } from 'react';
import styled from 'styled-components';
import { HEADER_HEIGHT } from '../config/config';
import { Link } from './modules'
import axios from 'axios';
import { MainStoreContext } from '../../store/MainStore';

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
  const mainStore = useContext(MainStoreContext)

  const healthCheck = () => {
    axios.get('/').then(e=>console.log(e)).catch(e=>console.log(e))
  }

  const handleLogout = () => {
    axios.get('/users/logout')
    .then(response=>{
      if (response.data === true) {
        mainStore.isLoggedIn = false;
        localStorage.clear();
        alert('로그아웃되었습니다.')
      } else {
        console.log(response)
      }
    })
    .catch(e=>console.log(e))
  }

  return (
    <Container>
      <FlexContainer>
        <Title>
          Title conatiner
        </Title>
        <div>
          <Link href="/">home</Link>
          <Link href="/guide">guide</Link>
          {
            mainStore.isLoggedIn === true ? 
            <Link href="#" onClick={handleLogout}>로그아웃</Link>
            :<>
            <Link href="/auth">로그인</Link>
            <Link href="/signup">회원가입</Link>
            </>
          }
          <Link onClick={()=>{healthCheck()}}>DEV</Link>
        </div>
      </FlexContainer>
    </Container>
  )
}
