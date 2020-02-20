import React, { useState, useEffect, useRef, useContext } from 'react';
import { ContentContainer, CoveredPage, Button, ImageContainer, Link } from '../components/modules';
import styled from 'styled-components';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/config';
import img from '../../static/mockup-ui.png';
import { AnimatedSlider } from '../components/AnimatedSlider';
import { MainStoreContext } from '../../store/MainStore';
import { observer } from 'mobx-react-lite';

const ScrollViewBase = styled.div`
  transition: transform 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95);
`

const HeaderText1 = styled.h1`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 900;
  font-size: 36px;
  right: 20%;
  z-index: 2;
  margin: 0;
  text-align: end;
`

const HeaderText2 = styled.h1`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 900;
  font-size: 36px;
  z-index: 2;
  margin: 0;
  text-align: end;
`

const HeaderText3 = styled.h1`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 900;
  font-size: 36px;
  right: 20%;
  z-index: 2;
  margin: 0;
  text-align: start;
`

const IPhone = ({children}) => {
  console.log(children)
  const Container = styled.div`
    position: absolute;
    display: flex;
    height: 70%;
    width: 100%;
    background-image: url(${img});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 2;
    justify-content: center;
    align-items: center;
  `

  const ChildContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: 69%; */
    /* height: 72%; */
    background-color: #303030;
    border-radius: 10%;
  `

  return <Container>
      <ChildContainer>{children}</ChildContainer>
    </Container>
}

const ScrollView = ({children}) => {
  const [direction, setDirection] = useState(0);
  const [moving, setMoving] = useState(false);
  const prevY = useRef(0);

  const goToPage = (page) => {
    setMoving(true);
    if (moving === true) {
      window.scrollTo(0, SCREEN_HEIGHT)
    }
    const offset = page * SCREEN_HEIGHT - prevY.current
    // console.log('offset', offset) 
  }

  useEffect(()=>{
    const handleScroll = (e) => {
      const currentY = window.scrollY;
      if (prevY.current < currentY) {
        setDirection(1)
      } else if (prevY.current > currentY) {
        setDirection(-1)
      }

      const curPage = Math.floor(prevY.current / SCREEN_HEIGHT)

      if (currentY !== 0) {
        goToPage(1)
        // console.log(moving)
      }

      prevY.current = currentY;
      // console.log(prevY.current, curPage,)
    }

    window.addEventListener('scroll', handleScroll, {passive: true})

    return () => window.removeEventListener('scroll', handleScroll);
  },[])

  return (
    <ScrollViewBase>
      {children}
    </ScrollViewBase>
  )
}

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: row;
`

const FlexItem = styled.div`
  flex: 1;
`

export const AdminMain = observer(() => {
  const mainStore = useContext(MainStoreContext)

  return (
    <>
      <ScrollView>
        <CoveredPage>
          <ImageContainer style={{backgroundPosition: 'left'}} imgURL='https://images.unsplash.com/photo-1563861019306-9cccb83bdf0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80'>
            <ContentContainer>
              <div style={{paddingRight: SCREEN_WIDTH * 0.2, paddingTop: SCREEN_HEIGHT * 0.1}}>
                <HeaderText1>푸드트럭,</HeaderText1>
                <HeaderText1>도대체 어디서</HeaderText1>
                <HeaderText1>찾아야 하지 ?</HeaderText1>
              </div>
            </ContentContainer>
          </ImageContainer>
        </CoveredPage>
        <CoveredPage>
          <FlexContainer style={{height: '100%'}}>
            <FlexItem style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center', alignItems:'flex-end', paddingRight: '2.5em'}}>
              <HeaderText2>오늘같이 야심한 밤에</HeaderText2>
              <HeaderText2 style={{width: SCREEN_WIDTH * 0.35}}>{mainStore.HeaderTextTwo}</HeaderText2>
              <HeaderText2>먹고 싶을 때</HeaderText2>
            </FlexItem>
            <FlexItem style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'flex-start'}}>
              <AnimatedSlider />
            </FlexItem>
          </FlexContainer>
        </CoveredPage>
        <CoveredPage>
          <ContentContainer>
            <FlexContainer>
              <FlexItem>
                <img style={{height: SCREEN_HEIGHT * 0.8, marginTop: SCREEN_HEIGHT * 0.05, marginLeft: '15%'}} src={img}/>
              </FlexItem>
              <FlexItem style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                <HeaderText3>모바일로 접속하고</HeaderText3>
                <HeaderText3>내 주변 푸드트럭을 찾아보세요 !</HeaderText3>
                {/* <Link href="/guide" style={{fontWeight: '700', margin: 0, padding: 0, paddingTop: '1em'}}>푸드트럭 찾으러 가기→</Link> */}
              </FlexItem>
            </FlexContainer>
          </ContentContainer>
        </CoveredPage>
      </ScrollView>
    </>
  )
})