import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import { auth } from './../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import  alertify  from 'alertifyjs';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';


function Menu({sepet,setsearch}) { // sepet. lenght işlemi yapmak lazım
    const [user]=useAuthState(auth)
    
    const logout=()=>{
       alertify.error("başarıyla Çıkış Yapıldı")
        signOut(auth);
    }

    const StyledBadge = styled(Badge)(() => ({ // sepet içindeki öge sayısının yeri
      '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        padding: '0 4px',
        
      },
    }));
  return (
    <div>

<nav className="navbar navbar-expand-lg navbar-light bg-light menu">
   <Link to='/' className='navbar-brand'>HepsiŞurada.com</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
       <Link to='/sepet' className='nav-link'>
      <li className="nav-item" >
     <p className='mr-2'>Sepet</p>  
        <IconButton aria-label="cart" style={{height:'20px',width:'20px',}}  className='mr-2'>
        <StyledBadge badgeContent={sepet.length} color="primary" >
        
         <ShoppingCartIcon  />
        
        </StyledBadge>
        </IconButton> 
         
      </li>
      </Link>
      {
        user ? 
      <>
        {
          user.email === "admin@gmail.com" ? 
          <li className="nav-item ">
          <a className='nav-link' href='/yeni-siparisler'>Admin Paneli</a>
          </li> :
          <li className="nav-item ">
          <Link className='nav-link' to='/profile'> Hesabım  <AccountCircleIcon /></Link>
          </li>
        }
        
      <li className="nav-item ">
       <Link className='nav-link'  onClick={logout}><b>Çıkış Yap <LogoutIcon /></b></Link>
      </li>
      </>
      :
      <li className="nav-item ">
       <Link className='nav-link' to='/login'>Giriş Yap</Link>
      </li>
      }
      
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2 searchbar" type="search" placeholder="Arama Yap" aria-label="Search" onChange={(e)=>setsearch(e.target.value)}/>
    </form>
  </div>
</nav>
    </div>
  )
}

export default Menu