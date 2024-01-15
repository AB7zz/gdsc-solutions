import React from 'react'
import Slide1 from '../components/Slide1/Slide1'
import Slide3 from '../components/Slide3/Slide3'
import Slide6 from '../components/Slide6/Slide6'

const Home = () => {
  return (
      <div>
        <Slide1 />
        <Slide3 />
        <Slide6 />
        <div className='component'></div>
    </div>
  )
}

export default Home