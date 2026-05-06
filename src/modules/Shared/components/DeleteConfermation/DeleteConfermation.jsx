import React from 'react'
import noImageData from '../../../../assets/images/no-data.png'


export default function DeleteConfermation({deleteItem,categoryName}) {
  return (
    <>
    <img src={noImageData} alt="no Data " />
          <h4 className="my-2">Delete This {deleteItem} ?</h4>
          <span className="text-muted">
            are you sure you want to delete <span className="text-danger fw-bold">{categoryName}</span>  ? if you are sure just click on delete it
          </span>
    </>
  )
}
