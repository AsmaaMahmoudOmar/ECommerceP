import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../product/Product';
import { Helmet } from 'react-helmet';
import AdsSlider from '../AdsSlider/AdsSlider';
import CategorySlider from '../CategorySilder/CategorySlider';

export default function Home() {
let[products,setProducts] =useState([]);
let[catSlider,setCatSlider]=useState([]);

  async function getAllProducts(){
    let {data} =await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    // console.log(data.data);
    setProducts(data.data);
  }
useEffect(()=>{
  getAllProducts(); 
  getAllCategory();

},[])
async function getAllCategory(){
  let {data}= await  axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  // console.log(data.data);
  setCatSlider(data.data)
}


  return (
    <>
    <Helmet>
      <title> Home </title>
    </Helmet>
    <AdsSlider/>
    <CategorySlider/>
    <div>
  

</div>
    <div className="row">
    {products.map((product)=>{
      return <Product product={product}/>
    })} 
    </div>
    
    </>
      
    
  )
}
