import React ,{useState}from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import './Auth.css'
import { updateProfile } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import alertify from 'alertifyjs'


function Register() {
    const [name,setname]=useState(null)
    const [email,setemail]=useState(null)
    const [password,setpassword]=useState(null)

    const send =(e)=>{
        e.preventDefault()
      if(!email || !password || !name)  // formiğe bağla
        {
          alert("boş bırakılamaz");
        }
        else
        { 
         createUserWithEmailAndPassword(auth,email,password)
          .then((kullanıcı)=>{updateProfile(kullanıcı.user,{displayName:name}) 
          .then(()=>{
            alertify.success("Kayıt Başarılı"); 
          })
          .catch(e=>alertify.warning(""+e,6))})
          .catch(e=>alertify.warning(""+e,6))
        }

      
      
        
      }
  return (
    <div className='kapsyıcı'>
    <div className='kutu'>
    <h2>Kayıt Ol</h2>
  <form>
  <div className="txt_field">
            <input 
            type="text" 
            required 
            onChange={(e)=>setname(e.target.value)}
            value={name}
            name="name"
            />
            <span></span>
            <label>İsim Soyisim</label>
        </div>
        <div className="txt_field">
            <input 
            type="email" 
            required 
            onChange={(e)=>setemail(e.target.value)}
            value={email}
            name="email"
            />
            <span></span>
            <label>Email</label>
        </div>
        <div className="txt_field">
            <input 
            type="password" 
            required 
            onChange={(e)=>setpassword(e.target.value)}
            value={password}
            name="password"
            />
            <span></span>
            <label>Şifre</label>
        </div>
    <input type='submit' onClick={send}  className="button" value={"Kayıt Ol"}/>
  </form>
    <Link to='/login' className='yeni'>Hesabınız mevcut mu tıklayın ve giriş yapın</Link>
    </div>
    
    </div>

  )
}

export default Register