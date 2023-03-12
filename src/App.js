import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route,} from 'react-router-dom';
import Sepetlistesi from './companents/Sepetlistesi';
import Home from './companents/Home';
import alertify from 'alertifyjs';
import Urundetail from './companents/Urundetail';
import Yenisipariş from './companents/YeniSipariş';
import Kargo from './companents/Kargo';
import Yeniürünyükle from './companents/Yeniürünyükle';
import Forgotpassword from './companents/giriş-kayıtol-şifreunuttum/Forgotpassword';
import Login from './companents/giriş-kayıtol-şifreunuttum/Login';
import Register from './companents/giriş-kayıtol-şifreunuttum/Register';
import Everyone from './companents/route outlet/Everyone'
import Onlynologin from './companents/route outlet/Onlynologin'
import OnlyAdmin from './companents/route outlet/OnlyAdmin'
import Onlylogin from './companents/route outlet/Onlylogin';
import Profile from './companents/Profile';
import { auth, db } from './firebase/firebase';
import { collection } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
 
function App() {
  const [user,isLoading]=useAuthState(auth)
  const [sepet,setsepet] = useState([]) 
  const [detayurun,setdetayurun]=useState(JSON.parse(localStorage.getItem('urun'))??[]) // localstorageye yazdığımız urunu aldık
  const [search,setsearch]=useState('')
  const siparisRef=collection(db,'siparişler') // firebase deki collectionların referanslarını aldık
  const urunbilgilerRef=collection(db,'ÜrünBilgileri')
  const [siparişler,setsiparişler]=useState(); // sisteme kayıtlı olan tüm kullanıcıları aldık

  useEffect(()=>{
    onSnapshot(siparisRef,(snapshot)=>{
      setsiparişler((snapshot.docs.map((doc)=>({id:doc.id,...doc.data()})))) // firebase deki verileri çekip id ve içindeki verilerle birlikte veriler dizisine atadık
    })
  }) 



 function sepeteat(uruns){ /* urunu sepete sayısı ile atan fonksiyon  */
 
  var yeniurun = sepet;
  var uruneklendi = yeniurun.find(abc=>abc.urunbilgileri.id === uruns.id)
  if(uruneklendi){
    uruneklendi.adeti+=1;
    
  } 
  else{
    yeniurun.push({urunbilgileri:uruns , adeti :1})
  }
  setsepet(yeniurun)
  alertify.success("Ürün Sepetinize Eklendi",2)
  
}
  const sepettesayisi=(urun,isaret)=>{ /* sepetteki ürünü 1 arttırıp 1 azaltan fonksiyon */
  console.log(urun)
    let ind = -1;
    sepet.forEach((data, index) =>{
      if (data.urunbilgileri.id=== urun.urunbilgileri.id){ // daha onceden sepette olup olmadığını kontrol ettik
        ind =index;
      }   
      });
    const tempArr = sepet;
   tempArr[ind].adeti += isaret;
    if (tempArr[ind].adeti===0)
        tempArr[ind].adeti = 1;
   setsepet([...tempArr]) 
  }

   function sepettensil(urun){ /* ürünü sepetten silen fonksiyon */
    let kalanurunler = sepet.filter(u=>u.urunbilgileri.id !== urun.urunbilgileri.id)
    setsepet(kalanurunler)
    alertify.error("Ürün Sepetinize Silindi",2)
  }
  const sepettemizle=()=>{ /* tüm sepeti silme fonksiyonu */
    setsepet([]);
    alertify.error("Sepetteki Tüm Ürünler Silindi");
  }
  const urundetail=(uruns)=>{ /* butona tıkladığımız urunun bilgilerini bir değişebilen bir değişkene attık ve onu detail sayfasına gönderdikk */
    setdetayurun(uruns)
  }



  return (
    <div className="container">
    {/* icerik */}
    <Routes>
      <Route  element={<Everyone sepet={sepet} setsearch={setsearch} />}>
        <Route path="/sepet" element={<Sepetlistesi siparişler={siparişler} siparisRef={siparisRef}  setsepet={setsepet} sepet={sepet} sepettesayisi={sepettesayisi} sepettensil={sepettensil} sepettemizle={sepettemizle} />} />
        <Route path="/" index element={<Home urundetail={urundetail} search={search} urunbilgilerRef={urunbilgilerRef}/>} />
        <Route path="/detail" element={<Urundetail urun={detayurun} sepeteat={sepeteat} />} />
      </Route>
      <Route element={<Onlynologin />}> {/* sadece kayıt olamayanlar  */}
        <Route path="/login" index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
      </Route>
      <Route element={<Onlylogin  sepet={sepet} setsearch={setsearch} />} > {/* sadece üye olanlar görebilir */}
         <Route path='/profile' element={<Profile siparişler={siparişler} user={user} isLoading={isLoading} />} />
      </Route>
      <Route element={<OnlyAdmin />}>
        <Route path="/kargo" element={<Kargo siparişler={siparişler}/>} />
        <Route path="/urun-giris" element={<Yeniürünyükle urunbilgilerRef={urunbilgilerRef} />} />
        <Route path="/yeni-siparisler" index element={<Yenisipariş  siparişler={siparişler} />} />
      </Route>
    </Routes>

  

    <div className='row'>
    <div className='col footer'></div>
    </div>
    </div>
    
  );
}

export default App;
