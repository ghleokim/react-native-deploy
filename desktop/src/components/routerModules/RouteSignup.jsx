import React, { useContext } from 'react';
import { CoveredPage } from '../components/modules';
import { SignupLanding } from '../pages/SignupLanding';
import { SignupForm } from '../pages/SignupForm';
import { SignupStoreContext } from '../../store/SignupStore';

export const RouteSignup = () => {
  const signupStore = useContext(SignupStoreContext);

  return (
    <>
     <CoveredPage>
        {'landing' === signupStore.current ? <SignupLanding /> : <SignupForm /> }
     </CoveredPage>
    </>
  )
}