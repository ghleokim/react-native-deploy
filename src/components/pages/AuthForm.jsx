import React, { useState, useContext } from 'react';
import { CoveredPage, ContentContainer, Button } from '../components/modules';
import { MainStoreContext } from '../../store/MainStore';
import { observer } from 'mobx-react-lite';
import axios from 'axios';

export const AuthForm = observer(() => {
  const mainStore = useContext(MainStoreContext);
  const [auth, setAuth] = useState('login');

  const AuthSelector = () => {
    if (auth === 'login') {
      return <Button onClick={()=>setAuth('signup')}>회원가입</Button>
    } else {
      return <Button onClick={()=>setAuth('login')}>로그인</Button>
    }
  }

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
      if (response.data.authority !== "ROLE_SELLER" && !response.data.isSeller.status) {
        alert('로그인 권한이 없습니다.')
      } else {
        localStorage.setItem('cookies', JSON.stringify(response.data.cookie))
        localStorage.setItem('userEmail', response.data.email)
        localStorage.setItem('isSeller', 'true')
        localStorage.setItem('truckIdList', response.data.isSeller.truckIdList)
        localStorage.setItem('truckId', response.data.truckId)
        mainStore.isLoggedIn = true
        mainStore.userName = response.data.name
      }
    })
    .catch(e=>console.log(e))
  }

  const LoginForm = () => {
    return (
      <>
        <div>로그인페이지</div>
        
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>
            이메일 
            <input key="user-email" type="user-email" value={mainStore.userEmail} onChange={handleEmail} placeholder='' autoComplete="off"/>
          </label>
          <label>
            비밀번호
          </label>
            <input key="user-pw" type="password" value={mainStore.password} onChange={handlePassword} placehoder='' autoComplete="off"/>
          {/* <input type="submit" value="Submit" /> */}
          <Button onClick={handleSubmit}>로그인</Button>
        </form>

      </>
    )
  }

  const SignupForm = () => {
    return (
      <>
        <div>회원가입페이지</div>
      </>
    )
  }


  return (
    <>
      <CoveredPage>
        <ContentContainer>
          {mainStore.isLoggedIn ? <div>welcome, {mainStore.userName}</div>
          : <>
            <AuthSelector />
            {auth === 'login' ? <LoginForm /> : <SignupForm />}
          </>
          }
        </ContentContainer>
      </CoveredPage>
    </>
  )
})