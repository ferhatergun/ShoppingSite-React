import React ,{useState}from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import './Auth.css'
import  alertify  from 'alertifyjs';

function Forgotpassword() {
    const [email,setemail]=useState(null)

    const send=(e)=>{
        e.preventDefault();
        if(!email)
        {
            alert("boş bırakılamaz")
        }
        else
        {
            sendPasswordResetEmail(auth,email).then(()=>{ alert("Baraşılı! Mail Adresinizi Kontrol Ediniz") }).catch((e)=>{alertify.warning(""+e)})

        }
    } 
return (
    <div className='kapsayıcı'>
    <div className='kutu'>
    <h2>Şifreyi Sıfırla</h2>
    <form onSubmit={send}>
        <div className="txt_field">
                <input 
                type="text" 
                required 
                onChange={(e)=>setemail(e.target.value)}
                value={email}
                name="name"
                />
                <span></span>
                <label>Mail Adresi</label>
        </div>
        <input type={'submit'} className="button" value={"Gönder"}></input>
    </form>
    <Link to='/login' className='yeni'>Giriş Yap Sayfasına Dön</Link>
    </div>
    </div>

  )
}

export default Forgotpassword