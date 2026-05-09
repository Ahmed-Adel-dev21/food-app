import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaBars, FaChevronLeft } from "react-icons/fa";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changePassword } from "../../../../api/modules/auth";
import logoUser from "../../../../assets/images/3.png";
import logoImage from "../../../../assets/images/logo.png";
import { AuthContext } from "../../../../Context/AuthContext";

export default function SideBar() {
  const { loginData } = useContext(AuthContext);

  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggelColapsed = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const isActive = (path) => location.pathname === path;

  // modale
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
  };

  const [isLoading, setIsLoading] = useState(false);

  // visibel pass
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const toggleOldPassword = () =>
    setIsOldPasswordVisible(!isOldPasswordVisible);
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
  const password = watch("newPassword");
  const confirmNewPassword = watch("confirmNewPassword");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await changePassword(data);
      toast.success("Change Password successfully!");
      handleClose(true)
      
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="sidebar-container  d-flex position-sticky vh-100 top-0 ">
        <Sidebar collapsed={collapsed} className="border border-0">
          <div className="d-flex justify-content-start ms-2 mt-3">
            <button
              onClick={toggelColapsed}
              className=" border-0 fs-4 bg-transparent text-white"
            >
              {collapsed ? <FaBars /> : <FaChevronLeft />}
            </button>
          </div>
          <div className="d-flex justify-content-center  ">
            <img className=" img-fluid " src={logoUser} alt="logoUser" />
          </div>
          <Menu>
            <MenuItem
              active={isActive("/dashboard")}
              className="text-white fs-6   "
              icon={<i className="fa-solid fa-house"></i>}
              component={<Link to="/dashboard" />}
            >
              {" "}
              Home{" "}
            </MenuItem>
            {loginData?.userGroup != "SystemUser" ? (
              <MenuItem
                active={isActive("/dashboard/users")}
                className="text-white fs-6   "
                icon={<i className="fa-solid fa-users"></i>}
                component={<Link to="/dashboard/users" />}
              >
                {" "}
                Users{" "}
              </MenuItem>
            ) : (
              <></>
            )}
            <MenuItem
              active={isActive("/dashboard/recipes")}
              className="text-white fs-6   "
              icon={<i className="fa-solid fa-receipt"></i>}
              component={<Link to="/dashboard/recipes" />}
            >
              {" "}
              Recipes{" "}
            </MenuItem>
            {loginData?.userGroup != "SystemUser" ? (
              <MenuItem
                active={isActive("/dashboard/categories")}
                className="text-white fs-6   "
                icon={<i className="fa-solid fa-layer-group"></i>}
                component={<Link to="/dashboard/categories" />}
              >
                {" "}
                Categories{" "}
              </MenuItem>
            ) : (
              <></>
            )}

            {loginData?.userGroup == "SystemUser" ? (
              <MenuItem
                active={isActive("/dashboard/favorites")}
                className="text-white fs-6   "
                icon={<i className="fa-solid fa-heart"></i>}
                component={<Link to="/dashboard/favorites" />}
              >
                {" "}
                Favorites{" "}
              </MenuItem>
            ) : (
              <></>
            )}
            <MenuItem
              active={isActive("/dashboard/change-password")}
              className="text-white fs-6   "
              icon={<i className="fa-solid fa-unlock-keyhole"></i>}
              onClick={() => handleShow()}
            >
              {" "}
              Change Password{" "}
            </MenuItem>
            <MenuItem
              className="text-white fs-6   "
              icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}
              onClick={logout}
            >
              {" "}
              <span className="bg-tr"> logout</span>{" "}
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body className="my-1 mx-4">
          <div className="logo-container mx-auto w-75 my-3">
            <img className="w-100 " src={logoImage} alt="logo" />
          </div>
          <div>
            <h3 className="h5 fw-bold"> Change Your Password</h3>
            <span className="text-muted">Enter your details below</span>
            <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mt-3  p-1 shadow-sm rounded-2 custom-input-color">
                <span
                  className="input-group-text  bg-transparent border border-1 border-secondary border-start-0 border-bottom-0 border-top-0"
                  id="basic-addon1"
                >
                  <i className="fa-solid fa-lock text-secondary fs-5 "></i>
                </span>
                <input
                  type={isOldPasswordVisible ? "text" : "password"}
                  className="form-control border border-0 bg-transparent"
                  placeholder=" Old Password"
                  aria-label="old Password"
                  {...register("oldPassword", {
                    required: "Old Password is required",
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
                  onClick={toggleOldPassword}
                >
                  <i
                    className={`fa-solid ${isOldPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </button>
              </div>
              <>
                {errors.oldPassword && (
                  <span className="text-danger fw-semibold text-center">
                    {errors.oldPassword.message}
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
                  type={isPasswordVisible ? "text" : "password"}
                  className="form-control border border-0 bg-transparent"
                  placeholder=" New Password"
                  aria-label="Password"
                  {...register("newPassword", {
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
                {errors.newPassword && (
                  <span className="text-danger fw-semibold  text-center">
                    {errors.newPassword.message}
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
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  className="form-control border border-0 bg-transparent"
                  placeholder=" Confirm New Password "
                  aria-label="confirmNewPassword"
                  {...register("confirmNewPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                {confirmNewPassword && password === confirmNewPassword && (
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
                {errors.confirmNewPassword && (
                  <span className="text-danger fw-semibold  text-center">
                    {errors.confirmNewPassword.message}
                  </span>
                )}
              </>
              <button
                type="submit"
                className={`btn auth-btn-hover text-white main-bg-Color w-100 fs-5 my-4 ${isLoading ? "pointer-events-none opacity-75" : ""}`}
              >
                {isLoading ? (
                  <span>
                    <i className="fa-solid fa-spinner fa-spin me-2"></i> Wait...
                  </span>
                ) : (
                  "Change Password"
                )}
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
