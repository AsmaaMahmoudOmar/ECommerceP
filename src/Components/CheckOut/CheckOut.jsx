import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CheckOut() {
  let { id } = useParams();
  console.log(id);
  function checkOut(shippingAddress) {
    fetchCheckOut(shippingAddress);
  }
  async function fetchCheckOut(shippingAddress) {
    let res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
      {
        shippingAddress,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    window.location.href = res.data.session.url
  }

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    onSubmit: checkOut
  });

  return (
    <>
      <div className="w-75 m-auto py-5">
        <h1 className="my-5">Order Details</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">Details :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            className="form-control mb-3 shadow-none"
            name="details"
            id="details"
          />

          <label htmlFor="phone">Phone :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="tel"
            className="form-control mb-3 shadow-none"
            name="phone"
            id="phone"
          />
          <label htmlFor="city">City :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="tel"
            className="form-control mb-3 shadow-none"
            name="city"
            id="city"
          />

          <button
            className="bg-main btn px-3 text-light d-block ms-auto"
            
          >
            Order
          </button>
        </form>
      </div>
    </>
  );
}
