import React from 'react'
import Slider from 'react-slick'
import slider2 from "../../assets/slider-image-2.jpeg"
import slider3 from "../../assets/slider-image-3.jpeg"
import img1 from "../../assets/1.jpg"
import img2 from "../../assets/2.jpg"

export default function AdsSlider() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        Touch:true,
        arrows:false
      };
  return (
    <>
    <div className="row g-0">
        <div className="col-lg-9">
        <Slider {...settings}>
            <img height={500} src={slider3} alt="sliderAd1" />  
            <img height={500} src={slider2} alt="sliderAd2" />  
        </Slider>
        </div>
        <div className="col-lg-3">
            <img height={250} src={img1} className='w-100' alt="ad1" />
            <img height={250} src={img2} className='w-100' alt="ad2" />
        </div>
    </div>
     
    </>
  )
}
