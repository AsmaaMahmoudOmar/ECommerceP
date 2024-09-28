import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import { InfinitySpin } from "react-loader-spinner";

export default function Brands() {
  let [page, setPage] = useState(1);

  function getBrands(pageNum = 1) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands?page=${pageNum}`)
      .then((response) => {
        return response;
      })
      .catch((err) => err);
  }

  const { data, isLoading, isPreviousData } = useQuery({
    queryKey: ["getBrands", page],
    queryFn: () => getBrands(page),
    keepPreviousData: true,
  });

  return (
    <>
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="Brands Page" />
      </Helmet>
      {isLoading ? true : (
        <main className="pt-5">
          <div className="row my-3 g-4">
            {data?.data.data.map((category) => {
              return (
                <div className="col-md-4 col-lg-3" key={category._id}>
                  <div className="shadow cursor-pointer categoryCard overflow-hidden rounded-2">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-100 mb-2"
                    />
                    <h2 className="h5 fw-bold text-center p-3">{category.name}</h2>
                  </div>
                </div>
              );
            })}
          </div>
          <nav aria-label="Page navigation example" className="my-5">
            <ul className="pagination justify-content-center">
              <li className="page-item ">
                <button
                  className="page-link cursor-pointer text-main fw-semibold"
                  aria-label="Previous"
                  onClick={() => setPage((old) => Math.max(old - 1, 1))}
                  disabled={page === 1}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link cursor-pointer text-main fw-semibold"
                  aria-label="Next"
                  onClick={() => {
                    if (!isPreviousData || data.next) {
                      setPage((old) => old + 1);
                    }
                  }}
                  disabled={page === 2}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </main>
      )}
    </>
  );
}