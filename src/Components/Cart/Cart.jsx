import axios from 'axios'
import React, { useEffect, useState,useContext } from 'react'
import { CountContext } from '../../Context/CountContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  let[numOfCartItems,setNumOfCartItems]=useState(0);
  let[totalCartPrice,setTotalCartPrice]=useState(0);
  let[cartProduct,setCartProduct]=useState([]);
  let[cartId,setCartId]=useState("");

let{cartCount,setCartCount}=useContext(CountContext)
  useEffect(()=>{
      getAllCarts();
  },[]);

  async function getAllCarts(){
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
      headers:{
        token:localStorage.getItem('token')
      }
    })
    console.log(data);
    setCartId(data.data._id)
    setCartProduct(data.data.products);
    setNumOfCartItems(data.numOfCartItems);
    setTotalCartPrice(data.data.totalCartPrice);

  }
  async function removeCartItem(productId){
    let {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/"+ productId,{
      headers:{
        token:localStorage.getItem('token')
      }
    })
    setCartProduct(data.data.products);
    setNumOfCartItems(data.numOfCartItems); 
    setCartCount(data.numOfCartItems); 
    setTotalCartPrice(data.data.totalCartPrice);
  }
  async function clearCart(){
    setCartProduct([]);
    setNumOfCartItems(0);
    setTotalCartPrice(0);
    let {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
      headers:{
        token:localStorage.getItem('token')
      }
    })
   
  }
  async function updateCart(productId,count){
    let {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/"+productId,{count},{
      headers:{
        token:localStorage.getItem('token')
      }
    })
  }
  return (
    <>
    <button onClick={clearCart} className='btn btn-outline-danger d-block ms-auto my-3'>Clear Cart</button>
     {cartProduct?.map((product)=>{
      return  <div key={product?.product._id} className="row shadow my-3 align-items-center">
          <div className="col-md-2">
            <img className='w-100' src={product?.product.imageCover} alt={product?.product.title} />
          </div>
          <div className="col-md-8">
              <h3>{product?.product.title}</h3>
              <h5 className='text-main ft-sm'>{product?.product.category.name}</h5>
            
            <p><span className="fw-bold me-2">Price:</span>{product?.price}EGP</p>
            <p> <i className="fas fa-star text-main me-2"></i>{product?.product.ratingsAverage}</p>
          </div>
          <div className="col-md-2 d-md-flex flex-column justify-content-center align-items-center">
            <button onClick={()=> removeCartItem(product?.product._id)} className='btn btn-outline-danger px-4'>Remove</button>
            <div className='py-2 d-md-flex align-items-center justify-content-center'>
            <button onClick={()=>{ return updateCart(product?.product._id,product?.count - 1)}} className='btn bg-main text-white'>-</button>
              <span className='text-danger px-3'>{product?.count}</span>
              <button onClick={()=>updateCart(product?.product._id,product?.count + 1)} className='btn bg-main text-white'>+</button>
            </div>
          </div>
      </div>
    
     })
     }
     <div className='d-flex justify-content-between my-4'>
     <Link to={'/checkout/' + cartId}> <button className='btn btn-outline-success'>Check Out</button></Link>
      <p><span className='fw-bold me-2'>Total Cart Price:</span>{totalCartPrice}EGP</p></div>

    </>
  )
}
