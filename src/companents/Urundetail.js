import React from 'react'
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
/* import { useDispatch } from 'react-redux';
import { sepeteat } from '../redux/sepet';
import { useSelector } from 'react-redux';
import { sepeteat1 } from '../redux/sepet'; */



function Urundetail({urun,sepeteat}) {
/*   const dispatch =useDispatch();
  const sepet =useSelector(state=>state.sepetslise)
   */
  if(urun !== []) // dizi boş değilse urunu localstorageye yazdık
  {
    localStorage.setItem('urun', JSON.stringify(urun))
  }
  return (
    <div>
    {
      /* bir önceki sayfada tıklanığımız urunun bilgilerini listeledik */
      <div className='row ali'>
        <div className='col-lg-6 col-md-6  sol'>
           <img src={urun.image} alt='' className='detail-img'></img>
        </div>
        <div className='col-lg-6 col-md-6 sag'>
            <h3>{urun.title}</h3> <br/>
            <p>
                { urun.description}
            </p>
            <h5>{urun.price} $</h5> <br></br>
            <div><button className='ekle' onClick={()=>sepeteat(urun)}  /*onClick={()=> dispatch(sepeteat1(urun))}*/>Sepete Ekle <AddShoppingCartIcon /></button> <Link to='/sepet'> <button className='ekle'> Sepete Git</button></Link></div>
        </div>
    </div> 
    }
    
    </div>
  )
}

export default Urundetail