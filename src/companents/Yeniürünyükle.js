import React, { useState } from 'react';
import { addDoc} from 'firebase/firestore';
import alertify from 'alertifyjs';

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
        <table border={0} className='w-50 mt-5'>
          <tr>
            <td>Ürün İsmi</td>
            <td>
              <input required value={title} onChange={(e) => setTitle(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>Ürün Açıklaması</td>
            <td>
              <textarea required
                value={description}
                cols={30}
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>Ürün Fiyatı</td>
            <td>
              <input type='number' required value={price} onChange={(e) => setPrice(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>Ürün Resim Linki</td>
            <td>
              <input required value={image} onChange={(e) => setImage(e.target.value)} />
            </td>
          </tr>
        </table>
        <input type='submit' className='ekle mt-5 ' value={'Yükle'} />
      </form>
    </div>
  );
}

export default Yeniürünyükle;
