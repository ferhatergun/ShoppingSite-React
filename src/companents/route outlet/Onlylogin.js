import React from 'react'
import { Navigate ,Outlet } from 'react-router-dom'
import { auth } from '../../firebase/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import Menu from '../Menu';


function Onlylogin({sepet,setsearch}) {
  const [user,isLoading] =useAuthState(auth)
  if(isLoading)
  {
    return <h2>Loading...</h2>;
  }
  else if(user)
  {
    return (
        <>
        <Menu sepet={sepet} setsearch={setsearch}></Menu>
        <Outlet />
        </>
        );
  }
   return  <Navigate to='/'/>;
 
}
export default Onlylogin