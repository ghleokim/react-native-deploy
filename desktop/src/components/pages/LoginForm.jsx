import React, { useContext } from 'react';
import { CoveredPage, ContentContainer, Link, Input, Button } from '../components/modules';
import { MainStoreContext } from '../../store/MainStore';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import styled from 'styled-components';
import { BREAK_POINT_MOBILE, BREAK_POINT_TABLET } from '../config/config'

const MainText = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 900;
  font-size: 1.5em;
  text-align: center;
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

const WarningText = styled.div`
  color: #ee1930;
  font-size: 0.7em;
  text-align: left;
`


export const LoginForm = observer(({history}) => {
  const mainStore = useContext(MainStoreContext);

  console.log(mainStore.userEmail)

  const handleEmail = (e) => {
    mainStore.userEmail = e.target.value
  }

  const handlePassword = (e) => {
    mainStore.password = e.target.value
  }

  const handleSubmit = (e) => {
    axios.post('/users/login', { userEmail: mainStore.userEmail, userPassword: mainStore.password })
    .then(response => {
      console.log(response);
      if (!response.data.isSeller.status) {
        alert('로그인 권한이 없습니다.')
        history.replace('/')
      } else {
        localStorage.setItem('authority', response.data.authority)
        localStorage.setItem('cookies', JSON.stringify(response.data.cookie))
        localStorage.setItem('userEmail', response.data.email)
        localStorage.setItem('isSeller', 'true')
        localStorage.setItem('userName', response.data.name)
        if ('ROLE_SELLER' === response.data.authority) {
        localStorage.setItem('truckIdList', response.data.isSeller.truckIdList)
        localStorage.setItem('truckId', response.data.truckId)
        }
        mainStore.isLoggedIn = true
        mainStore.userName = response.data.name
        history.push('/myinfo')
      }
    })
    .catch(e=>console.log(e))
  }

  return (
    <>
      <CoveredPage>
        <ContentContainer>
          {mainStore.isLoggedIn === true ? <div>welcome, {mainStore.userName}</div>
          : <>
              <MainText>로그인</MainText>
                <form>
                  <FormContainer>
                    <WarningText>구매자이신가요? 모바일로 로그인 해주세요. 판매자만 로그인 가능합니다.</WarningText>
                    <Input key="userEmail" type="text" value={mainStore.userEmail} onChange={handleEmail} placeholder='이메일' autoComplete="off"/>
                    <Input key="userPassword" type="password" value={mainStore.password} onChange={handlePassword} placeholder='비밀번호' autoComplete="off"/>
                    <Button onClick={handleSubmit}>로그인</Button>
                  </FormContainer>
                </form>
              <Link href="/signup">회원가입</Link>
            </> }
        </ContentContainer>
      </CoveredPage>
    </>
  )
})