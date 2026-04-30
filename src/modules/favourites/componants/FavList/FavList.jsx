import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import chief from '../../../../assets/images/Recipes.png'

export default function FavList() {
  return (
    <>
    <Header  title={'Favorite '}
                

             description={`You can now add your items that any user can order it from the Application and you can edit`} 
             imgUrl={chief}
             
                />
    </>
  )
}
