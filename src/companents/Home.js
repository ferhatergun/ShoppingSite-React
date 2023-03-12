import React ,{useEffect ,useState} from 'react'
import { Link } from 'react-router-dom'
import { onSnapshot } from 'firebase/firestore';
function Home({urundetail,search,urunbilgilerRef}){

  const [veriler,setveriler]=useState([])

  useEffect(()=>{
    onSnapshot(urunbilgilerRef,(snapshot)=>{
      setveriler((snapshot.docs.map((doc)=>({id:doc.id,...doc.data()})))) // firebase deki verileri çekip id ve içindeki verilerle birlikte veriler dizisine atadık
    })
  })
 
  return (
    <div className='row B'>
     <div className='col A'>  
    
      {
       /* yuklenme basarılı ise */
       veriler.filter((uruns)=>{return search.toLowerCase()==='' ? uruns:  uruns.title.toLowerCase().includes(search)}) //arama barındaki kelime ile urun başlıklarını karşılaştırdık
      .map((uruns,i)=>(
    <div className='col-lg-3 col-md-4 col-sm-6 card' key={i}> 
    
        <img src={uruns.image} className="card-img-top card-img" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{uruns.title.length >20 ? uruns.title.substring(0, 30)+ "..." :uruns.title} </h5>
        <p className="card-text">{uruns.description.length >40 ? uruns.description.substring(0, 70)+ "..." :uruns.description}</p>
        <p className='fiat'>{uruns.price} $</p>
        <Link to='/detail'><button onClick={()=>urundetail(uruns)}>Ürünü İncele</button></Link>
     </div>
  </div>  



  
      ))
    }
     </div> 

    </div>
   
  )
}

export default Home