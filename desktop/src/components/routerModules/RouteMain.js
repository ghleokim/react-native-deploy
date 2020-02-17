import * as React from 'react';
import { AdminMain } from '../pages/AdminMain';

export const RouteMain = () => {
  const handleScroll = (e) => {
    console.log(e)
  }

  return <AdminMain onScroll={(e)=>handleScroll(e)}/>
}