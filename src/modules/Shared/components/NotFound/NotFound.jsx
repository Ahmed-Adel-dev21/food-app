import { IoReturnDownBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import errorImage from "../../../../assets/images/error-404.png";
import logo from "../../../../assets/images/logo.png";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div className="not-Found vh-100">
        <div className="py-2 ms-5">
          <img className="w-25" src={logo} alt="logo" />
        </div>

        <div className="  d-flex flex-grow-1 justify-content-center align-items-center ">
          <div className="  d-flex justify-content-center  col-md-6">
            <div>
              <h2 className="fw-bold fs-1">Oops.... </h2>
              <h5 className="text-success fs-4">Page not found</h5>
              <p>
                This Page doesn’t exist or was removed! We suggest you back to
                home.
              </p>

              <button
                onClick={() => navigate("/dashboard")}
                className="color-card border border-0 fw-semibold py-2 px-5 my-4 rounded rounded-3 d-flex justify-content-center align-items-center text-white"
              >
                <IoReturnDownBack className="fs-2 me-2" />
                Back To <br /> Home
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <img className="w-100" src={errorImage} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
