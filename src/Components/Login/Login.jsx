import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function Login() {
  let { isLogin, setIsLogin } = useContext(AuthContext);
  let [errorMessage, setErrorMessage] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let Navigate = useNavigate();

  // *Call Api and send input for backEnd and Return Message if input error
  async function login(values) {

    //  console.log(values);
    setErrorMessage("");
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsLoading(false);
      });
    // console.log(data);
    localStorage.setItem('token',data.token);
    setIsLoading(false);
    setIsLogin(true);
    Navigate('/home');
  }

  //!====>  Validation by Yup library ;

  let validationSchema = Yup.object({
    email: Yup.string()
      .matches(
        /^[A-Z]+[0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        "Email is invalid Example99@yahoo.com"
      )
      .required("Email is required"),
    password: Yup.string()
      .matches(/^.{8,15}$/, "Password at least 8 character")
      .required("Password is required"),
  });

  //? library formik take (initialValues of input ,function validation ,function login);


  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });
  return (
    <>
      <div className="w-75 m-auto py-5">
        <h1 className="my-3">Login :</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            className="form-control mb-3"
            name="email"
            id="email"
          />

          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">
              <p>{formik.errors.email}</p>
            </div>
          ) : null}
          <label htmlFor="password">Password :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            className="form-control mb-3"
            name="password"
            id="password"
          />

          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">
              <p>{formik.errors.password}</p>
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
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
