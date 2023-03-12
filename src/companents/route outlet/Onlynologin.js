import React from 'react'
import { Navigate ,Outlet } from 'react-router-dom'
import { auth } from '../../firebase/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'

function Onlynologin() {
  const [user,isLoading] =useAuthState(auth)
  if(isLoading)
  {
    return <h2>Loading...</h2>;
  }
  else if(user)
  {
    return <Navigate to='/'/>; 
  }
   return <Outlet />;
  
}
export default Onlynologin