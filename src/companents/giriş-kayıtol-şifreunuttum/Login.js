import React ,{useState ,useEffect}from 'react'
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import './Auth.css'
import  alertify  from 'alertifyjs';

function Login() {

  useEffect(() => {
    function handlePageRefresh() {
     
    }
    handlePageRefresh();
  }, []);
  const [email,setemail]=useState(null)
  const [password,setpassword] = useState(null)

  const send=(e)=>{
    e.preventDefault();
    if(!email || !password)
    {
      alert("boş bırakılamaz")
    }
    else{
      signInWithEmailAndPassword(auth,email,password).then(()=>{alertify.success("Başarıyla Giriş Yapıldı")}).catch(e=>alertify.warning(""+e,6))
    }

  }
  return (
    <div className='kapsayıcı'>
    <div className='kutu'>
    <h2>Giriş Yap</h2>
    <form>
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
        <p> <Link to='/forgotpassword' className='forgot'>Şifremi Unuttum</Link> </p>
        <input type={'submit'} onClick={send} className="button" value={"Giriş Yap"}></input>
    </form>
    <Link to='/register' className='yeni'>Hesabınız yokmu tıklayın ve kayıt olun</Link>
    </div>
    </div>
  )
}

export default Login