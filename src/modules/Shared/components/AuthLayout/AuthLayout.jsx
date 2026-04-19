import { Outlet } from 'react-router-dom'
import logoImage from '../../../../assets/images/logo.png'

export default function AuthLayout() {
  return (
    <>
    <div className="auth-comtainer">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-lg-5 col-md-7 bg-white rounded rounded-2 py-4 px-5">
            <div className='p-2'>

            <div className="logo-container mx-auto w-75">
              <img className='w-100 ' src={logoImage} alt="logo" />
            </div>
            <div className="my-3">
            <Outlet/>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
