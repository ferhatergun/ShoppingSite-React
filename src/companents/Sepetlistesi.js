import React ,{useState,useEffect} from 'react'
import '../App.css'
import { auth } from '../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { collection } from 'firebase/firestore';



function Sepetlistesi({sepet,sepettesayisi,sepettensil,sepettemizle,setsepet}) {
  const [bildirim,setbildirim]=useState(false)
  const [isim,setisim]=useState(null)
  const [adres,setadres]=useState(null)
  const [iletisim,setiletisim]=useState(null)
  const [user,isLoading]=useAuthState(auth)

  const siparisRef=collection(db,'siparişler')

  const sipariş = (e) => {
    e.preventDefault();
  
    if (sepet.length !== 0 && isim && adres && iletisim) {
      addDoc(siparisRef, {
        adress: adres,
        email: user.email,
        name: isim,
        tel_number: iletisim,
        ürünler: sepet,
        durum: "Onay Bekliyor",
      })
        .then(() => {
          setisim("");
          setadres("");
          setiletisim("");
          setsepet([]); // siparişi onayladıktan sonra sepeti temizledik
          setbildirim(true); // burada siparişiniz alınmıştır mesajını verebilmek için bildirim kullanılmıştır ve 5 saniye ekranda gözükür
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
    else
    {
      alert("Lütfen Sepetinizin Dolu Olduğunu Kontrol Ediniz")
    }
  };
  
  useEffect(() => {
    if (bildirim) {
      const timeoutId = setTimeout(() => {
        setbildirim(false);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [bildirim]);
  
  
      
  
      
        var toplam=[];
        var sum=0;
        toplam =  sepet.map ((yazi)=>[((yazi.urunbilgileri.price)*(yazi.adeti))]);
        for(var i=0;i<toplam.length;i++)
        {
            sum+=Number(toplam[i]); //bu işlemler toplam ödenecek tutarı belirler
        }


      
  return (
    <div>
    <h3>Sepet Listesi</h3>
    <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Ürün İsmi</th>
      <th scope="col">Toplam Adet</th>
      <th scope="col">Toplam tutar</th>
    </tr>
  </thead>
  <tbody>
    {
        sepet.map((yazi,i)=>( // sepetteki ürünleri listeledik
        <tr key={i}>
        <th scope="row">{i+1}</th>
        <td>{yazi.urunbilgileri.title} ( 1 price : {yazi.urunbilgileri.price})</td>
        <td><button onClick={()=>sepettesayisi(yazi,+1)} className='sepet'>+</button>{yazi.adeti}<button onClick={()=>sepettesayisi(yazi,-1)} className='sepet'>-</button></td>
        <td>{((yazi.urunbilgileri.price) * (yazi.adeti) ).toFixed(1)} $</td> {/* virgülden sonra 1 basamak gösterir */}
        <td ><button onClick={()=>sepettensil(yazi)} className='sepet'>X</button></td>
        </tr>
        )) 
    }
      <tr>
          <td></td>
          <td></td>
          <th>Toplam Ödenecek Tutar:</th>
          <td> 
          {sum.toFixed(1)} $
          </td>
          <td><button className='spt-tmzl' onClick={()=>sepettemizle(sepet)}>Sepeti Temizle</button></td>
      </tr>
  </tbody>
</table>
    {/* musteri bilgilerini alma */}
    {
      isLoading ? <h1>Loading...</h1>: // yüklendi ise alta geç
      user ? // user giriş yapmış ise sipariş bilgilerini girmesi gereken form gelir
      <div className='onaylaa'>
      <form onSubmit={sipariş}>
      <div className="txt_field">
            <input 
            type="text" 
            required 
            onChange={(e)=>setisim(e.target.value)}
            value={isim}
            name="isim"
            />
            <span></span>
            <label>İsim Soyisim</label>
        </div>
        <div className="txt_field">
            <input 
            type="text" 
            required 
            onChange={(e)=>setadres(e.target.value)}
            value={adres}
            name="adres"
            />
            <span></span>
            <label>Teslimat Adresi</label>
        </div>
        <div className="txt_field">
            <input 
            type="text" 
            required 
            onChange={(e)=>setiletisim(e.target.value)}
            value={iletisim}
            name="iletisim"
            />
            <span></span>
            <label>İletişim</label>
        </div>
      
    <p><input type='submit' value='Siparişi Ver' ></input></p>
    </form>
    </div>
      :<h1 className='d-flex justify-content-center mt-5'>Satın Almak İçin Lütfen Giriş Yapınız</h1> // user giriş yapmamış ise bu gelir
    }
    <br />
    {
      bildirim? 
    <div className="alert alert-success" role="alert">
      <h5 className="alert-heading">Tebrikler Siparişiniz Alındı</h5>
      <p></p>
      <hr/>
      <p className="mb-0">3 İş Günü İçerisinde Size Ulaşacaktır</p>
    </div> : null
    }
        </div>
      )
    }

    export default Sepetlistesi