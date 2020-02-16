import React, { useContext, useEffect, useState } from 'react';
import { Input, Button, ContentContainer } from '../components/modules';
import { SignupStoreContext } from '../../store/SignupStore';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import axios from 'axios';
import { BREAK_POINT_MOBILE, BREAK_POINT_TABLET } from '../config/config';

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

const MainText = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 900;
  font-size: 1.5em;
  text-align: center;
`

const WarningText = styled.div`
  color: #ee1930;
  font-size: 0.7em;
  text-align: left;
`

export const SignupForm = observer(() => {
  const signupStore = useContext(SignupStoreContext);
  const [canSubmit, setCanSubmit] = useState(false)

  const passwordSameCheck = (pass1, pass2) => {
    if (pass1 && pass2) {
      return pass1 === pass2;
    } else {
      return false
    }
  }

  const passwordLengthCheck = (pass1, pass2) => {
    // console.log(pass1, pass2)
    if (pass1 && pass2) {
      return (6 <= pass1.length) && (6 <= pass2.length)
    } else {
      return false
    }
  }

  const businessNumberCheck = (number) => {
    const reg_num = /^[0-9]+$/;
    const splitted = number.split('-')
    if (3 === splitted.length) {
      return (
        (3 === splitted[0].length)
        && (2 === splitted[1].length)
        && (5 === splitted[2].length)
        && (10 === number.split('-').join('').length)
        && reg_num.test(number.split('-').join(''))
      )
    } else if (0 === splitted.length) {
      return (
        (10 === number.split('-').join('').length)
        && reg_num.test(number.split('-').join(''))
      )
    } else {
      return false
    }
  }

  const handleName = (e) => {
    const name = e.target.value;

    signupStore.nameInput = !!name;
    signupStore.sellerName = name;
  }

  const handleEmail = (e) => {
    const email = e.target.value;

    const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[a-zA-Z_-]{2,}){1,2}$/;
    signupStore.emailState = reg_email.test(email);

    signupStore.emailInput = !!email;
    signupStore.sellerEmail = email;
    
    // console.log('email', signupStore.emailState)
  }

  const handlePassword = (e) => {
    const pass1 = e.target.value;
    signupStore.passwordInput = pass1 && signupStore.sellerPasswordCheck
    signupStore.passwordCheckState = passwordSameCheck(pass1, signupStore.sellerPasswordCheck);
    signupStore.passwordLengthState = passwordLengthCheck(pass1, signupStore.sellerPasswordCheck);
    signupStore.sellerPassword = pass1;
    // console.log('pass1', signupStore.passwordCheckState, signupStore.passwordLengthState)
  }
  
  const handlePasswordCheck = (e) => {
    const pass2 = e.target.value;
    signupStore.passwordInput = pass2 && signupStore.sellerPassword
    signupStore.passwordCheckState = passwordSameCheck(signupStore.sellerPassword, pass2);
    signupStore.passwordLengthState = passwordLengthCheck(signupStore.sellerPassword, pass2);
    signupStore.sellerPasswordCheck = pass2;
    // console.log('pass2', signupStore.passwordCheckState, signupStore.passwordLengthState)
  }

  const handleBusiness = (e) => {
    const number = e.target.value;
    signupStore.businessState = businessNumberCheck(String(number));
    signupStore.sellerBusinessRegistrationNumber = number;
  }

  useEffect(()=>{
    setCanSubmit(
      signupStore.nameInput
      && signupStore.emailInput
      && signupStore.emailState
      && signupStore.passwordInput
      && signupStore.passwordCheckState
      && signupStore.passwordLengthState
      && signupStore.businessState
    )
  },[canSubmit, signupStore.emailInput, signupStore.emailState, signupStore.passwordInput, signupStore.passwordCheckState, signupStore.passwordLengthState, signupStore.businessState, signupStore.nameInput])
  
  const handleSubmit = () => {
    axios.post('/sellers/sign_up',{
      sellerName: signupStore.sellerName,
      sellerEmail: signupStore.sellerEmail,
      sellerPassword: signupStore.sellerPassword,
      sellerBusinessRegistrationNumber: signupStore.sellerBusinessRegistrationNumber
    })
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
  }


  return (
    <>
    <ContentContainer>
      <MainText>회원가입</MainText>
      <form>
        <FormContainer>
          <Input key="sellerName" type="user-name" value={signupStore.sellerName} onChange={handleName} placeholder='이름' autoComplete="off"/>
          <Input key="sellerEmail" type="user-email" value={signupStore.sellerEmail} onChange={handleEmail} placeholder='이메일' autoComplete="off"/>
          <Input key="sellerPassword" type="password" value={signupStore.sellerPassword} onChange={handlePassword} placeholder='비밀번호' autoComplete="off"/>
          <Input key="sellerPasswordCheck" type="password" value={signupStore.sellerPasswordCheck} onChange={handlePasswordCheck} placeholder='비밀번호 확인' autoComplete="off"/>
          { !signupStore.passwordInput || signupStore.passwordCheckState ? <></> : <WarningText>비밀번호가 다릅니다. 확인해주세요.</WarningText> }
          { !signupStore.passwordInput || signupStore.passwordLengthState ? <></> : <WarningText>비밀번호가 너무 짧습니다. 6자리 이상 입력해주세요.</WarningText> }
          <Input key="sellerBusinessRegistrationNumber" type="text" value={signupStore.sellerBusinessRegistrationNumber} onChange={handleBusiness} placeholder='사업자 등록번호 (ex. 1234567890 또는 123-45-67890)' autoComplete="off"/>
          { !signupStore.sellerBusinessRegistrationNumber || signupStore.businessState ? <></> : <WarningText>형식이 잘못되었습니다.</WarningText> }
          { canSubmit ? <Button onClick={handleSubmit}>회원가입</Button> : <Button style={{backgroundColor: '#3e3e3e'}}>회원가입</Button> }
        </FormContainer>
      </form>
    </ContentContainer>
    </>
  )
})