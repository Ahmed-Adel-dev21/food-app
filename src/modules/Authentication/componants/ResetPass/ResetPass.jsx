import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPass() {
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
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data,
      );
      toast.success("Password reset successfully!");
      console.log(data);
      navigate("/login");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div>
        <h3 className="h5 fw-bold"> Reset Password</h3>
        <span className="text-muted">
          Please Enter Your Otp or Check Your Inbox
        </span>
        <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mt-3  p-1 shadow-sm rounded-2 bg-secondary bg-opacity-25">
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
          <div className="input-group mt-3  p-1 shadow-sm rounded-2 bg-secondary bg-opacity-25">
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
              {...register("seed", {
                required: "OTP is required",
                validate: {
                  noSpaces: (value) => !!value.trim() || "OTP cannot be empty",
                },
              })}
            />
          </div>
          <>
            {errors.seed && (
              <span className="text-danger fw-semibold text-center">
                {errors.seed.message}
              </span>
            )}
          </>
          <div className="input-group mt-3  p-1 shadow-sm rounded-2 bg-secondary bg-opacity-25">
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
                  if (value.length < 8) return "At least 8 characters required";
                  if (!/[A-Z]/.test(value))
                    return "Must include one uppercase letter";
                  if (!/[a-z]/.test(value))
                    return "Must include one lowercase letter";
                  if (!/[0-9]/.test(value)) return "Must include one number";
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
          <div className="input-group mt-3  p-1 shadow-sm rounded-2 bg-secondary bg-opacity-25">
            <span
              className="input-group-text  bg-transparent border border-1 border-secondary border-start-0 border-bottom-0 border-top-0"
              id="basic-addon1"
            >
              <i className="fa-solid fa-lock text-secondary fs-5 "></i>
            </span>
            <input
              type={isPasswordVisible ? "text" : "password"}
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
              onClick={togglePassword}
            >
              <i
                className={`fa-solid ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
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
          <button
            type="submit"
            className={`btn auth-btn-hover text-white main-bg-Color w-100 fs-5 my-3 ${isLoading ? "pointer-events-none opacity-75" : ""}`}
          >
            {isLoading ? (
              <span>
                <i className="fa-solid fa-spinner fa-spin me-2"></i> Wait...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
