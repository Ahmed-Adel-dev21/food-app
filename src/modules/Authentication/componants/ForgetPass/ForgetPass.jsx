import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data,
      );
      navigate("/reset-pass");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div>
        <h3 className="h5 fw-bold">Forgot Your Password?</h3>
        <span className="text-muted">
          No worries! Please enter your email and we will send a password reset
          link.
        </span>
        <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group    p-1 shadow-sm rounded-2 bg-secondary bg-opacity-25">
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
                required: "E-mail is required",
                validate: {
                  noSpaces: (value) =>
                    !!value.trim() || "Email cannot be empty",
                  validFormat: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|eg)$/i.test(
                      value.trim(),
                    ) ||
                    "Example: user@domain.com (only .com, .net, .org, .eg are allowed)",
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

          <button
            type="submit"
            className={`btn auth-btn-hover text-white main-bg-Color w-100 fs-5 my-3 ${isLoading ? "pointer-events-none opacity-75" : ""}`}
          >
            {isLoading ? (
              <span>
                <i className="fa-solid fa-spinner fa-spin me-2"></i> Wait...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
