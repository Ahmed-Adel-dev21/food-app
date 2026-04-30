import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../../src/api/axsiosClient";
import { authApi } from "../../../../api";


export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  // visibel pass
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePassword = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPassword = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  // -----
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();

  // القيمه اللي راجعه فيهم
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await authApi.Register(data)
      toast.success("Go to Verify");
      console.log(response);
      navigate("/verify-account");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div>
        <h3 className="h5 fw-bold"> Register </h3>
        <span className="text-muted">
          Welcome Back! Please enter your details
        </span>
        <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* ---- user Name ----  */}
            <div className="col-md-6">
              <div className="input-group mt-3  p-1 shadow-sm rounded-2 custom-input-color">
                <span
                  className="input-group-text  bg-transparent border border-1 border-secondary border-start-0 border-bottom-0 border-top-0"
                  id="basic-addon1"
                >
                  <i className="fa-solid fa-user text-secondary fs-5 "></i>
                </span>
                <input
                  type="text"
                  className="form-control border border-0 bg-transparent"
                  placeholder="UserName "
                  aria-label="UserName"
                  {...register("userName", {
                    required: "userName is required",
                    validate: (value) => {
                      if (value.trim().length === 0) {
                        return "userName cannot be empty or spaces only";
                      }
                      if (value.length < 3) {
                        return "At least 3 characters required";
                      }
                      if (value.length > 8) {
                        return "userName cannot exceed 8 characters";
                      }
                      const usernameRegex = /^[A-Za-z]+[0-9]+$/;
                      if (!usernameRegex.test(value)) {
                        return "The userName must start with characters and end with numbers without spaces.";
                      }
                      return true;
                    },
                  })}
                />
              </div>
              <>
                {errors.userName && (
                  <span className="text-danger fw-semibold  text-center">
                    {errors.userName.message}
                  </span>
                )}
              </>
            </div>
            {/* ---- E-mail ----  */}
            <div className="col-md-6">
              <div className="input-group mt-3  p-1 shadow-sm rounded-2 custom-input-color">
                <span
                  className="input-group-text  bg-transparent border border-1 border-secondary border-start-0 border-bottom-0 border-top-0"
                  id="basic-addon1"
                >
                  <i className="fa-solid fa-envelope text-secondary fs-5 "></i>
                </span>
                <input
                  type="email"
                  className="form-control border border-0 bg-transparent"
                  placeholder="Enter your E-mail"
                  aria-label="E-mail"
                  {...register("email", {
                    required: "E-mail",
                    validate: {
                      noSpaces: (value) =>
                        !!value.trim() || "Email cannot be empty",
                      validFormat: (value) =>
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|eg)$/i.test(
                          value.trim(),
                        ) ||
                        "Invalid format. Example: user@domain.com (only .com, .net, .org, .eg are allowed)",
                    },
                  })}
                />
              </div>
              <>
                {errors.email && (
                  <span className="text-danger fw-semibold text-center">
                    {errors.email.message}
                  </span>
                )}
              </>
            </div>
          </div>

          <div className="row">
            {/* ---- Countery ----  */}
            <div className="col-md-6">
              <div className="input-group mt-3  p-1 shadow-sm rounded-2 custom-input-color">
                <span
                  className="input-group-text  bg-transparent border border-1 border-secondary border-start-0 border-bottom-0 border-top-0"
                  id="basic-addon1"
                >
                  <i className="fa-solid fa-flag text-secondary fs-5 "></i>
                </span>
                <input
                  type="text"
                  className="form-control border border-0 bg-transparent"
                  placeholder="Country "
                  aria-label="country "
                  {...register("country", {
                    required: "country  is required",
                    validate: (value) => {
                      if (value.trim().length === 0)
                        return "country  cannot be empty or spaces only";
                      if (value.length < 4)
                        return "At least 4 characters required";
                      if (/\d/.test(value)) return "Must not include Number";

                      return true;
                    },
                  })}
                />
              </div>
              <>
                {errors.country && (
                  <span className="text-danger fw-semibold  text-center">
                    {errors.country.message}
                  </span>
                )}
              </>
            </div>
            {/* ---- Mobile ----  */}
            <div className="col-md-6">
              <div className="input-group mt-3  p-1 shadow-sm rounded-2 custom-input-color">
                <span
                  className="input-group-text  bg-transparent border border-1 border-secondary border-start-0 border-bottom-0 border-top-0"
                  id="basic-addon1"
                >
                  <i className="fa-solid fa-mobile-screen text-secondary fs-5 "></i>
                </span>
                <input
                  type="text"
                  className="form-control border border-0 bg-transparent"
                  placeholder=" PhoneNumber"
                  aria-label="PhoneNumber"
                  {...register("phoneNumber", {
                    required: "phoneNumber  is required",
                    validate: {
                      noSpaces: (value) =>
                        !!value.trim() || "OTP cannot be empty",
                    },
                  })}
                />
              </div>
              <>
                {errors.phoneNumber && (
                  <span className="text-danger fw-semibold text-center">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </>
            </div>
          </div>

          <div className="row">
            {/* ---- password ----  */}
            <div className="col-md-6">
              <div className="input-group mt-3  p-1 shadow-sm rounded-2 custom-input-color">
                <span
                  className="input-group-text  bg-transparent border border-1 border-secondary border-start-0 border-bottom-0 border-top-0"
                  id="basic-addon1"
                >
                  <i className="fa-solid fa-lock text-secondary fs-5 "></i>
                </span>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="form-control border border-0 bg-transparent"
                  placeholder=" New Password"
                  aria-label="Password"
                  {...register("password", {
                    required: "password is required",
                    validate: (value) => {
                      if (value.trim().length === 0)
                        return "Password cannot be empty or spaces only";
                      if (value.length < 8)
                        return "At least 8 characters required";
                      if (!/[A-Z]/.test(value))
                        return "Must include one uppercase letter";
                      if (!/[a-z]/.test(value))
                        return "Must include one lowercase letter";
                      if (!/[0-9]/.test(value))
                        return "Must include one number";
                      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
                        return "Must include one special character";
                      return true;
                    },
                  })}
                />
                <button
                  type="button"
                  className="btn border-0 text-secondary"
                  onClick={togglePassword}
                >
                  <i
                    className={`fa-solid ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </button>
              </div>
              <>
                {errors.password && (
                  <span className="text-danger fw-semibold  text-center">
                    {errors.password.message}
                  </span>
                )}
              </>
            </div>
            {/* ---- confirmed password ----  */}
            <div className="col-md-6">
              <div className="input-group mt-3  p-1 shadow-sm rounded-2 custom-input-color">
                <span
                  className="input-group-text  bg-transparent border border-1 border-secondary border-start-0 border-bottom-0 border-top-0"
                  id="basic-addon1"
                >
                  <i className="fa-solid fa-lock text-secondary fs-5 "></i>
                </span>
                <input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  className="form-control border border-0 bg-transparent"
                  placeholder=" Confirm New Password "
                  aria-label="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                {confirmPassword && password === confirmPassword && (
                  <span className="input-group-text bg-transparent border-0 text-success animate__animated animate__fadeIn">
                    <i className="fa-solid fa-circle-check fs-5"></i>
                  </span>
                )}

                <button
                  type="button"
                  className="btn border-0 text-secondary"
                  onClick={toggleConfirmPassword}
                >
                  <i
                    className={`fa-solid ${isConfirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </button>
              </div>
              <>
                {errors.confirmPassword && (
                  <span className="text-danger fw-semibold  text-center">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </>
            </div>
          </div>
          <Link
            className="text-decoration-none d-block fs-5 text-end px-2 mt-2   main-text-Color "
            to="/login"
          >
            Login
          </Link>
          <button
            type="submit"
            className={`btn auth-btn-hover text-white main-bg-Color w-100 fs-5 mt-4 ${isLoading ? "pointer-events-none opacity-75" : ""}`}
          >
            {isLoading ? (
              <span>
                <i className="fa-solid fa-spinner fa-spin me-2"></i> Wait...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
