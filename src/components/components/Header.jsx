import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { HEADER_HEIGHT } from '../config/config';
import { Link } from './modules'
import { MainStoreContext } from '../../store/MainStore';
import { observer } from 'mobx-react-lite';

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
  padding: 0.5em 0.7em 0.25em 0.6em;
  justify-content: space-between;
  align-items: baseline;
  align-self: center;
`;

const Title = styled.h1`
  font-size: 1.2em;
  font-family: '"Palatino Linotype", "Book Antiqua", Palatino, serif';
  text-align: center;
  color: #333333;
  padding: 0 0.3em 0 0.3em;
`;

export const Header = observer(() => {
  const mainStore = useContext(MainStoreContext)

  const checkAuth = () => {
    axios.get('/users/getUser')
    .then(response=>{
      mainStore.isLoggedIn = true;
      mainStore.userName = response.data.result.name;
      mainStore.userEmail = response.data.result.userEmail;
    })
    .catch(e=>console.log(e))
  }

  useEffect(()=>{
    checkAuth();
  },[])

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
        <div>
          <Title style={{margin: 0,}}>
            foodtruck 🚚
          </Title>
          <Link onClick={()=>{healthCheck()}}>DEV</Link>
        </div>
        <div>
          <Link href="/">home</Link>
          <Link href="/guide">guide</Link>
          {
            mainStore.isLoggedIn === true ? 
            <>
              <Link href="/myinfo">판매자 {mainStore.userName} 님</Link>
              <Link href="#" onClick={handleLogout}>로그아웃</Link>
            </>
            :<>
              <Link href="/auth">로그인</Link>
              <Link href="/signup">회원가입</Link>
            </>
          }
        </div>
      </FlexContainer>
    </Container>
  )
})