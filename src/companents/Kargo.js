import React from 'react'
import { auth} from '../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import alertify from 'alertifyjs';



function Kargo({siparişler}) {
  const [user,isLoading]=useAuthState(auth)


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
        <h3>Kargolanmış Şiparişler</h3>
    {  
      siparişler.map((yazi,a,b)=>(  
        yazi.durum ==="Kargolandı" || yazi.durum==="Teslim Edildi" ?
      <div key={a} style={{backgroundColor:"#fbfbfb", border:"1px solid black",marginBottom:"5px"}}> {/* style den özellikler ekle güzel yap */}
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
               <div key={b}>
                 <h6>Müsteri Bilgileri </h6> 
                  <p>İsim: {yazi.name}</p> <br />
                  <p>Adres: {yazi.adress}</p> <br />
                  <p>İletişim: {yazi.tel_number}</p> 
              </div>
              </>
            ))
        }    
        </table>
        </div>:null
        
       ))
    }
    
    </div>
  )
  }
}

export default Kargo