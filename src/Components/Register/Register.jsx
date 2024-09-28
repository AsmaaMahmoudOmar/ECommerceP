import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let [inputType, setInputType] = useState([
    {
      labelName: "Name",
      name: "name",
      type: "text",
      id: "name",
    },
    {
      labelName: "Email",
      name: "email",
      type: "email",
      id: "email",
    },
    {
      labelName: "Password",
      name: "password",
      type: "password",
      id: "password",
    },
    {
      labelName: "Re Password",
      name: "rePassword",
      type: "password",
      id: "rePassword",
    },
    {
      labelName: "Phone",
      name: "phone",
      type: "tel",
      id: "phone",
    },
  ]);
  let [isLoading, setIsLoading] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");
  let Navigate =useNavigate();

  async function register(values) {
    setIsLoading(true);
    setErrorMessage("");
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
        setIsLoading(false);
      });
    // console.log(data);
    setIsLoading(false);
    Navigate('/login');
  }
  function validate(values) {
    let error = {};
    if (values.name == "") {
      error.name = "Name is required";
    } else if (values.name.length < 3) {
      error.name = "Name is must greater than 3";
    } else if (values.name.length > 20) {
      error.name = "Name is must less than 20";
    }
    if (values.email == "") {
      error.email = "Email is required";
    } else if (
      !/^[A-Z]+[0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      error.email = "Email is invalid Example99@yahoo.com";
    }
    if (values.password == "") {
      error.password = "Password is required";
    } else if (!/^.{8,15}/.test(values.password)) {
      error.password = "at least 8 character";
    }
    if (values.rePassword == "") {
      error.password = "Password is required";
    } else if (values.password != values.rePassword) {
      error.rePassword = "Password and rePassword doesn't match";
    }
    if (values.phone == "") {
      error.password = "Phone is required";
    } else if (!/^01[0125][0-9]{8}/.test(values.password)) {
      error.password = "Enter egyptian number ";
    }
    return error;
  }
  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name is must greater than 3")
      .max(20, "Name is must less than 20")
      .required("Name is required"),
    email: Yup.string()
      .matches(
        /^[A-Z]+[0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        "Email is invalid Example99@yahoo.com"
      )
      .required("Email is required"),
    password: Yup.string()
      .matches(/^.{8,15}$/, "Password at least 8 character")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "rePassword not match password")
      .required("Re Password is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Enter egyptian number ")
      .required("phone is required"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    // validate:validate
    validationSchema,
    onSubmit: register,
  });
  // console.log(formik);

  return (
    <>
      <div className="w-75 m-auto py-5">
        <h1 className="my-3">Register :</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
            className="form-control mb-3"
            type="text"
            name="name"
            id="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">
              <p>{formik.errors.name}</p>
            </div>
          ) : null}

          <label htmlFor="email">Email:</label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            className="form-control mb-3"
            type="email"
            name="email"
            id="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">
              <p>{formik.errors.email}</p>
            </div>
          ) : null}

          <label htmlFor="password">Password:</label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
            className="form-control mb-3"
            type="password"
            name="password"
            id="password"
          />

          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">
              <p>{formik.errors.password}</p>
            </div>
          ) : null}

          <label htmlFor="rePassword">Re Password:</label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            className="form-control mb-3"
            type="password"
            name="rePassword"
            id="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">
              <p>{formik.errors.rePassword}</p>
            </div>
          ) : null}
          <label htmlFor="phone">Phone:</label>
          <input
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="form-control mb-3"
            type="tel"
            name="phone"
            id="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">
              <p>{formik.errors.phone}</p>
            </div>
          ) : null}

          {errorMessage ? (
            <div className="alert alert-danger">
              <p>{errorMessage}</p>
            </div>
          ) : null}

          {isLoading ? (
            <button
              disabled
              className="bg-main btn px-3 text-light d-block ms-auto"
              type="button"
            >
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={isLoading}
              className="bg-main btn px-3 text-light d-block ms-auto"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
