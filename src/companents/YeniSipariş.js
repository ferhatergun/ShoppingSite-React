import React from 'react'
import { auth, db } from '../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { updateDoc, doc} from 'firebase/firestore';
import alertify from 'alertifyjs';



function Admin({siparişler}) {
  const [user,isLoading]=useAuthState(auth)


const onayla=(id)=>{
const ref =doc(db,'siparişler',id)
updateDoc(ref,{
  durum:"Kargolandı"
}).then(()=>(
  alertify.success("Ürün Kargolandı",2)
)).catch((e)=>console.log(e))
}

const iptalet =(id)=>{
  const ref =doc(db,'siparişler',id)
updateDoc(ref,{
  durum:"İptal Edildi"
}).then(()=>(
  alertify.warning("Ürün İptal Edildi",2)
)).catch((e)=>console.log(e))
}


  if(isLoading)
  {
    return <h1>Yükleniyor</h1>
  }
  else if(!siparişler)
  return <h1>yükleniyor</h1>
  else
  {
  return (
    <div> <br/>
    {/* sipariş edilen ürünleri listeler */}
        <h3>Yeni Şiparişler</h3>
    {  
      siparişler.map((yazi,a,b)=>(  
        yazi.durum ==="Onay Bekliyor" ?
      <div key={a} style={{backgroundColor:"#fbfbfb"}}> {/* style den özellikler ekle güzel yap */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Ürün Resmi</th>
            <th scope="col">Ürün İsmi</th>
            <th scope="col">Adeti</th>
          </tr>
        </thead>
        {
          yazi.ürünler.map((yazi1,i)=>(
            <>
            <tbody key={i}> 
            <tr >
              <th scope="row">{i+1}</th>
              <td><img src={yazi1.urunbilgileri.image} className='admin-resim' alt=''></img></td>
              <td>{yazi1.urunbilgileri.title}</td>
              <td>{yazi1.adeti}</td>
              <td>{yazi.durum}</td>
            </tr>
          </tbody>

              
              </>
            ))}    
            <div key={b}>
                <h6>Müsteri Bilgileri </h6> 
                <p>İsim: {yazi.name}</p> <br />
                <p>Adres: {yazi.adress}</p> <br />
                <p>İletişim: {yazi.tel_number}</p> 
            </div>
            <button className='onayla' onClick={()=>onayla(yazi.id)}>Siparişi Kargola</button> {/* tıkladığımız siparişin id'sini yakaladık */}
            <button className='iptal-et' onClick={()=>iptalet(yazi.id)}>İptal Et</button>
       
        </table>
        </div>:null
        
       ))
    }
    
    </div>
  )
  }
}

export default Admin