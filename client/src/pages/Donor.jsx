import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/shared/Spinner'

const Donor = () => {
    const {loading} = useSelector(state => state.auth)
  return (
    <>
        {loading && <Spinner message="Please wait..." />}
      <div className='container mx-auto'>donor page</div>
    </>
  )
}

export default Donor
