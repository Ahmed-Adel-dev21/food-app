import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import chief from '../../../../assets/images/eating vegan food-rafiki.png'


export default function Dashboard({loginData}) {
  return (
    <>
    <Header title={'Welcome'}
     description={`This is a welcoming screen for the entry of the application , you can now see the options`} 
     imgUrl={chief}
     Data={loginData?.userName} />
  
    </>
  )
}
