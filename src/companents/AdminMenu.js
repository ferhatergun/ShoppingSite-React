import React  from 'react'
import { Link } from 'react-router-dom'
import '../App.css';

function AdminMenu() {

  return (
    <div>

<nav className="navbar navbar-expand-lg navbar-light bg-light menu">
   <Link  className='navbar-brand' to='/yeni-siparisler'>HepsiŞurada.com</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to='/yeni-siparisler'>Yeni Siparişler<span className="sr-only">(current)</span></Link>
      </li>

      <li className="nav-item ">
       <Link className='nav-link' to='/kargo'>Kargo Aşamasındakiler</Link>
      </li>
      <li className="nav-item ">
       <Link className='nav-link' to='/urun-giris'>Yeni Ürün Yükle</Link>
      </li>

    </ul>
    <form className="form-inline my-2 my-lg-0">
    <a href='/' className='magaza-don'>Mağazaya Dön</a>
    </form>
  </div>
</nav>
    </div>
  )
}

export default AdminMenu