import React from 'react'
import noImageData from '../../../../assets/images/no-data.png'
export default function NoData() {
  return (
    <>
    <div className="text-center mb-5">
        <img className='img-fluid' src={noImageData} alt="no Data " />
        <h4 className="my-2">No Data !</h4>
        <span className="text-muted">
          are you sure you want to delete this item ? if you are sure just click
          on delete it
        </span>
      </div>
    
    </>
  )
}



