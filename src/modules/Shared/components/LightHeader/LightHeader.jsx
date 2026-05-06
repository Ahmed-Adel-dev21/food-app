import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LightHeader({Fill}) {
    const nanigate=useNavigate()
  return (
    <>
    <div className="container-fluid ">
        <div className="LightHeader-color row d-flex justify-content-between align-items-center py-3 px-4 rounded rounded-3">
            <div className='col-md-8'>
                <h4>{Fill} the <span className='text-success'>Recipes</span> !</h4>
                <p className='my-2'> you can now fill the meals easily using the table and form ,<br/> click here and sill it with the table !</p>
            </div>
            <div className='col-md-4 text-md-end'>
                <button onClick={()=>nanigate("/dashboard/recipes")} className='btn btn-success py-2 px-4'>All Recipes <i class="fa-solid fa-arrow-right-long mx-1"></i></button>
            </div>
            
        </div>

    </div>
    
    </>
  )
}
