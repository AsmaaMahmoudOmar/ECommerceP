import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast";
import { CountContext } from "../../Context/CountContext";


export default function Product({ product }) {
  let{setCartCount}=useContext(CountContext)
  async function addToCart(productId) {
    let res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      { headers:{
        token:localStorage.getItem("token")
      }  }
    ).catch((err)=>{
      toast.error(err.response.data.message)
    });
    setCartCount(res?.data.numOfCartItems);

if(res?.data.status=="success"){
  toast.success(res?.data.message)

}
  }

  return (
    <>
      <div className="col-md-6 col-lg-3 overflow-hidden align-items-center product my-2 p-2">
        <Link
          style={{ textDecoration: "none" }}
          to={"/productDetails/" + product._id}
        >
          <div key={product._id} className="cursor-pointer">
            <img
              className="w-100"
              src={product.imageCover}
              alt={product.title}
            />
            <h3 className="mt-3 text-dark text-decoration-none">
              {product.title?.split(" ").slice(0, 2).join(" ") || " "}
            </h3>
            <h5 className="text-main ft-sm">{product.category.name}</h5>
            <p className="text-dark">
              <span className="fw-bold me-1 text-black">Price:</span>
              {product.price}EGP
            </p>
          </div>
        </Link>
        <button onClick={()=> addToCart(product._id)} className="btn w-100"> Add To Cart</button>
      </div>
    </>
  );
}
