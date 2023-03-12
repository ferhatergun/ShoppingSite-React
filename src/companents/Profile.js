import React from 'react'
import './css/Profile.css'
import { updateDoc, doc} from 'firebase/firestore'
import { db } from '../firebase/firebase'
import alertify from 'alertifyjs';

function Profile({siparişler , user,isLoading}) {

  const teslim=(id)=>{
    const ref =doc(db,'siparişler',id)
    updateDoc(ref,{
      durum:"Teslim Edildi"
    }).then(()=>(
      alertify.success("Ürün Teslim Alındı",2)
    )).catch((e)=>console.log(e)) 
  }
  var a=0;
  if(isLoading)
  {
     return <p>Yükleniyor</p>;
  }
  else if(user)
  {
    return (
      <div>
        <div style={{width:"100%",height:"200px"}}>
          <h5 className='p-2'>Hesabım</h5>
          <p style={{padding:"10px",fontSize:"20px"}}><i>İsim : </i>{user.displayName } <br/> <i>Email : </i>{user.email}</p>
          <h3 style={{textAlign:'center'}}>Siparişlerim</h3>
        </div>
        
        {siparişler.map((urunler,i)=>(  
          urunler.email === user.email ?
          <div key={i} style={{backgroundColor:"#fbfbfb"}}> {/* style den özellikler ekle güzel yap */}
            <p> {++a} .sipariş </p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Ürün Resmi</th>
                  <th scope="col">Ürün İsmi</th>
                  <th scope="col">Adeti</th>
                  <th scope='col'>Durum</th>
                  <td><button onClick={()=>teslim(urunler.id)} className="btn btn-secondary">Teslim Aldım</button></td>
                </tr>
              </thead>
              {urunler.ürünler.map((yazi,i)=>(
                <tbody key={i}> 
                  <tr>
                    <th scope="row">{i+1}</th>
                    <td><img src={yazi.urunbilgileri.image} className='admin-resim' alt=''></img></td>
                    <td>{yazi.urunbilgileri.title}</td>
                    <td>{yazi.adeti}</td>
                    <td>{urunler.durum}</td>
                    
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          :null
        ))}
      </div>
    );
  }
}

export default Profile;
