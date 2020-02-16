import React, { useContext } from 'react';
import { CoveredPage, ContentContainer } from '../components/modules';
import { SignupLanding } from '../pages/SignupLanding';
import { SignupForm } from '../pages/SignupForm';
import { SignupStoreContext } from '../../store/SignupStore';

export const RouteSignup = () => {
  const signupStore = useContext(SignupStoreContext);

  return (
    <CoveredPage>
      <ContentContainer>
        {'landing' === signupStore.current ? <SignupLanding /> : <SignupForm /> }
      </ContentContainer>
    </CoveredPage>
  )
}