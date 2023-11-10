import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import style from "./Login.module.css";

export default function Login(props) {
  let navigate = useNavigate();
  let schema = Yup.object({
    email: Yup.string().required("Email is requiered").email("Email Not Valid"),
    password: Yup.string()
      .required("Password is requiered")
      .matches(/^[A-Z][a-z0-9]{3,7}$/),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: sendLoginValues,
  });

  async function sendLoginValues(values) {
    let { data } = await axios.post(
      "http://localhost:3001/users/login",
      values
    );
    if (data) {
      localStorage.setItem("UserToken", data.token);
      props.info();
      navigate("/");
    } else {
      console.log("error");
    }
  }
  return (

    <section className={`${style.formSection} shadow my-5 bg-body-tertiary rounded d-flex justify-content-center w-50`}>
      <div>

              <h2 className="text-center mb-3">Sign In</h2>
              <form className={`${style.form}`} onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                {formik.errors.email ? (
                  <p className="alert alert-danger">{formik.errors.email}</p>
                ) : (
                  ""
                )}

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    id="exampleInputPassword1"
                  />
                </div>
                {formik.errors.password ? (
                  <p className="alert alert-danger">{formik.errors.password}</p>
                ) : (
                  ""
                )}
                
                  <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                  </div>
              </form>
      </div>
            </section>

  );
}
