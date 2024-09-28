


import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    slidesToScroll: 7,
    autoplay: true,
    autoplaySpeed: 100,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  const { data } = useQuery("category", getCategories);
  const categories = data?.data.data;

  return (
    <div className="my-5">
      <h2 className="h5 fw-semibold text-main">Shop Popular Categories</h2>
      <Slider {...settings}>
        {categories
          ? categories.map((category) => {
              return (
                <div key={category._id}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-100 cursor-pointer"
                    height={200}
                  />
                  <h3 className="h6 mt-2">{category.name}</h3>
                </div>
              );
            })
          : ""}
      </Slider>
    </div>
  );
}




















// import axios from "axios";
// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import Slider from "react-slick";

// export default function CategorySlider() {
//   let [catSlider, setCatSlider] = useState([]);
//   const settings = {
//  dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 7,
//     slidesToScroll: 1
//   };
//   async function getAllCategory() {
//     let { data } = await axios.get(
//       "https://ecommerce.routemisr.com/api/v1/categories"
//     );
//     console.log(data.data);
//     setCatSlider(data.data);
//   }
//   useEffect(() => {
//     getAllCategory();
//   }, []);
//   return (
//     <>
//       <div className="row g-0">
//         {catSlider.map((category) => {
//           return (
//             <Slider {...settings}>

//               <div className="col-md-7">
//                 <img
                  
//                   height={200}
//                   src={category?.image}
//                   alt={category?.name}
//                 />
//                 <p>{category?.name}</p>
//             </div>
//             </Slider>

//           );
//         })}
//       </div>
//     </>
//   );
// }
