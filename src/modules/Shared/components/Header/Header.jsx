
export default function Header({Data,title,description,imgUrl}) {
  return (
    <>

    <div className=" px-4 py-2  text-white rounded rounded-4 bg-header">
      <div className=' container-fluid'>
        <div className="row">
          <div className="col-md-8  d-flex align-items-center">
            <div>
              <h3>
              {title} 
              <span className='mx-2 fs-4 fw-normal '>
                {Data}
              </span>

            </h3>
            <p className='py-2 w-75 ' style={{ whiteSpace: 'pre-line' }}>
              {description}

            </p>
            </div>
          </div>
          <div className="col-md-4 text-end  d-flex justify-content-end">
            <img className='w-75 ' src={imgUrl} alt="" />
          </div>
        </div>

      </div>

    </div>
    
    </>
    

  )
}
