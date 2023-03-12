import { createSlice } from "@reduxjs/toolkit";
import  alertify  from 'alertifyjs';

const sepetslice =createSlice({
    name:'sepet',
    initialState:[],
    reducers:{
        sepettemizle:()=> [] ,
        sepettensil:(state,securun) =>{
            var kalanurunler = state.filter(u=>u.urunbilgileri.id !== securun.urunbilgileri.id)
            state = kalanurunler
            alertify.error("Ürün Sepetinize Silindi",2)
        },
        sepeteat1:(state,securun)=>{
            var yeniurun = state;
            var uruneklendi = yeniurun.find(abc=>abc.urunbilgileri.id === securun.id)
            if(uruneklendi){
                uruneklendi.adeti+=1;
            } 
            else{
                yeniurun.push({urunbilgileri:securun , adeti :1})
            }
            state = yeniurun
            alertify.success("Ürün Sepetinize Eklendi",2)
        },

        sepettesayisi:(state,securun,isaret) =>{
            var ind = -1;
            state.forEach((data, index) =>{
            if (data.urunbilgileri.id=== securun.urunbilgileri.id){
                ind =index;
            }   
            });
            const tempArr = state;
            tempArr[ind].adeti += isaret;
            if (tempArr[ind].adeti===0)
                tempArr[ind].adeti = 1;
                
            state=[...tempArr]
        }

        }
    }
)

export const {sepettemizle,sepettensil,sepeteat1,sepettesayisi} =sepetslice.actions
export default sepetslice.reducer