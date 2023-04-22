import React, { useState } from 'react';
import { addDoc} from 'firebase/firestore';
import alertify from 'alertifyjs';
import  TextField  from '@mui/material/TextField';

function Yeniürünyükle({urunbilgilerRef}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const send = (e) => {
    e.preventDefault();
    addDoc(urunbilgilerRef, {
      description: description,
      image: image,
      price: price,
      title: title,
    })
      .then(() => {
        alertify.success('Ürün Başarıyla Mağazaya Eklendi');
        setTitle('');
        setDescription('');
        setPrice('');
        setImage('');
      })
      .catch((e) => alertify.warning('a' + e));
  };

  return (
    <div className='yeniurun'>
      <h3 className='mt-5'>Yeni Ürün Yükle</h3>
      <form onSubmit={send}>
        <table border={0} className='mt-5'>
          <tr>
            <td>
              <TextField id="outlined-basic" label="Ürün İsmi" variant="outlined" value={title}  
              onChange={(e) => setTitle(e.target.value)} sx={{width:'300px'}}/>
            </td>
          </tr>
          <tr>
            <td>
            <TextField id="outlined-basic" label="Ürün Açıklaması" variant="outlined" 
            multiline sx={{width:'300px'}}
            rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
            />
            </td>
          </tr>
          <tr>
            <td>
              <TextField id="outlined-basic" label="Ürün Fiyatı" variant="outlined" value={price} 
              onChange={(e) => setPrice(e.target.value)} sx={{width:'300px'}}/>
            </td>
          </tr>
          <tr>
            <td>
              <TextField id="outlined-basic" label="Ürün Resim Linki" variant="outlined" value={image} 
              onChange={(e) => setImage(e.target.value)}  sx={{width:'300px'}}/>
            </td>
          </tr>
        </table>
        <input type='submit' className='ekle mt-5 ' value={'Yükle'} />
      </form>
    </div>
  );
}

export default Yeniürünyükle;
