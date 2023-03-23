import React from 'react'
import { auth } from './../../firebase/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import { Outlet ,Navigate } from 'react-router-dom'
import AdminMenu from '../AdminMenu';


function OnlyAdmin() {
  const [user,isLoading]=useAuthState(auth)
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  } else if (user.email !== "admin@gmail.com") {
    return <Navigate to="/" />;
  }
  return (
    <>
    <AdminMenu />
  <Outlet /></>
  )
  ;
}





export default OnlyAdmin