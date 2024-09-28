import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import { InfinitySpin } from "react-loader-spinner";

export default function Categories() {
  function getCategories() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((response) => {
        return response;
      })
      .catch((err) => err);
  }

  const { data} = useQuery("getCategories", getCategories);

  return (
    <>
          <Helmet>
            <title>Categories</title>
            <meta name="description" content="Categories Page" />
          </Helmet>
          <div className="row my-3 g-4 pt-5">
            {data?.data.data.map((category) => {
              return (
                <div className="col-md-3" key={category._id}>
                  <div className="shadow cursor-pointer  overflow-hidden rounded-2">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-100 mb-2"
                      height={300}
                    />
                    <h2 className="h5 fw-bold text-center p-3">{category.name}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      
  );
}