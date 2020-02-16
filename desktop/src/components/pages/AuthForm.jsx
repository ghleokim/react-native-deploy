import React, { useContext, useEffect } from 'react';
import { CoveredPage, ContentContainer, Link, Input, Button } from '../components/modules';
import { MainStoreContext } from '../../store/MainStore';
import { observer } from 'mobx-react-lite';
import axios from 'axios';

export const AuthForm = observer(() => {
  const mainStore = useContext(MainStoreContext);

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
      } else {
        localStorage.setItem('authority', response.data.authority)
        localStorage.setItem('cookies', JSON.stringify(response.data.cookie))
        localStorage.setItem('userEmail', response.data.email)
        localStorage.setItem('isSeller', 'true')
        if ('ROLE_SELLER' === response.data.authority) {
        localStorage.setItem('truckIdList', response.data.isSeller.truckIdList)
        localStorage.setItem('truckId', response.data.truckId)
        }
        mainStore.isLoggedIn = true
        mainStore.userName = response.data.name
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
              <div>로그인페이지</div>
              <div>
                <form>
                  <Input key="userEmail" type="text" value={mainStore.userEmail} onChange={handleEmail} placeholder='이메일' autoComplete="off"/>
                  <Input key="userPassword" type="password" value={mainStore.password} onChange={handlePassword} placeholder='비밀번호' autoComplete="off"/>
                  <Button onClick={handleSubmit}>로그인</Button>
                    {/* <Button style={{backgroundColor: '#3e3e3e'}}>로그인</Button> */}
                </form>
              </div>
              <Link href="/signup">서비스가 처음이신가요 ? 회원가입 하러 가기</Link>
            </> }
        </ContentContainer>
      </CoveredPage>
    </>
  )
})