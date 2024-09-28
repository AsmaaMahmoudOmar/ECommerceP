import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

export default function ProductDetails() {
  let params = useParams();
  let [productDetail, setProductDetails] = useState();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    Touch:true,
    arrows:false
  };
  useEffect(() => {
    getProductDetails(params.id);
  });

  async function getProductDetails(productId) {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + productId
    );
    setProductDetails(data.data);
  }

  return <>
  <Helmet>
    <title>{productDetail?.title.split(" ").slice(0,2).join(" ")||" "}</title>
  </Helmet>
  <div className="row align-items-center py-5">
    <div className="col-md-3">
        <Slider {...settings}>
          {productDetail?.images.map((img)=>{
        return <img key={img} className="w-100 cursor-pointer" src={img} alt={productDetail?.title} /> 

          })}
        </Slider>

    </div>
    <div className="col-md-9">
        <h3>{productDetail?.title}</h3>
        <h5 className='text-main ft-sm'>{productDetail?.category.name}</h5>
        <p className="lead">{productDetail?.description}</p>
        <p><span className="fw-bold me-2">Price:</span>{productDetail?.price}EGP</p>
        <p> <i className="fas fa-star text-main me-2"></i>{productDetail?.ratingsAverage}</p>
        <button className='btn w-100 mt-3 bg-main text-white'> Add To Cart</button>

    </div>

  </div>
  
  
  </>;
}
