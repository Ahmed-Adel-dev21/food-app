import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../../src/api/axsiosClient";
import { authApi } from '../../../../api';


export default function VerfiyAccount() {
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

  
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data) => {
  
    setIsLoading(true);
    try {
      const response = await authApi.Verify(data);
      toast.success("Now Your acount is Verifed");
      navigate("/login");

    } catch (error) {
  
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div>
        <h3 className="h5 fw-bold">   Verify Account  </h3>
        <span className="text-muted">
          Please Enter Your Otp  or Check Your Inbox
        </span>
        <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mt-3  p-1 shadow-sm rounded-2 custom-input-color">
            <span
              className="input-group-text  bg-transparent border border-1 border-secondary border-start-0 border-bottom-0 border-top-0"
              id="basic-addon1"
            >
              <i className="fa-solid fa-mobile-screen text-secondary fs-5 "></i>
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
          <div className="input-group mt-3  p-1 shadow-sm rounded-2 custom-input-color">
            <span
              className="input-group-text  bg-transparent border border-1 border-secondary border-start-0 border-bottom-0 border-top-0"
              id="basic-addon1"
            >
              <i className="fa-solid fa-lock text-secondary fs-5 "></i>
            </span>
            <input
              type="text"
              className="form-control border border-0 bg-transparent"
              placeholder=" OTP"
              aria-label="OTP"
              {...register("code", {
                required: "OTP is required",
                validate: {
                  noSpaces: (value) => !!value.trim() || "OTP cannot be empty",
                },
              })}
            />
          </div>
          <>
            {errors.code && (
              <span className="text-danger fw-semibold text-center">
                {errors.code.message}
              </span>
            )}
          </>
          
          
         
          <button
            type="submit"
            className={`btn auth-btn-hover text-white main-bg-Color w-100 fs-5 my-3 ${isLoading ? "pointer-events-none opacity-75" : ""}`}
          >
            {isLoading ? (
              <span>
                <i className="fa-solid fa-spinner fa-spin me-2"></i> Wait...
              </span>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
