import React from "react";
import avatar from '../../../../assets/images/avatar.png'

export default function NavBar({ loginData }) {
  return (
    <>
    <nav className="navbar  navbar-expand-lg bg-body-tertiary my-3 rounded rounded-5 px-4 py-1">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img width='45px' src={avatar} alt="avatar" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav d-flex align-items-center ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <h6 className=" px-2 my-0  active" aria-current="page" href="#">
                    {loginData?.userName}
                  </h6>
                </li>
                <li>
                  <i className="btn fa-solid fa-bell"></i>
                </li>
              </ul>
              
              
            </div>
          </div>
        </nav>
      
    </>
  );
}
