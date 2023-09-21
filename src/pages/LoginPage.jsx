import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import "./LoginModal.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const formik = useFormik( {
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object( {
      email: yup.string().email( "Must be email" ).required( "Email is required" ),
      password: yup
        .string( "Password must be string" )
        .required( "Password is required" )
        .min( 8, "Min length must be 8" ),
    } ),
    onSubmit: ( values ) => {
      axios
        .post( "https://reqres.in/api/login", values )
        .then( () => {
          formik.resetForm();
          navigate( "/categories" );
        } )
        .catch( () => {
          toast.error( "Error" );
        } );
    },
  } );
  console.log( formik.touched );
  return (
    <div className="full-form vh-100 d-flex justify-content-center align-items-center">
      <form onSubmit={formik.handleSubmit}>
        <div className="user-box form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-danger">{formik.errors.email}</p>
          ) : null}
        </div>
        <div className=" user-box form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-danger">{formik.errors.password}</p>
          ) : null}
        </div>
        <div className="form-group mb-3">
          <input value="Send" type="submit" className="btn btn-primary w-100 mt-4" />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
