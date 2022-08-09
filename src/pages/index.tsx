import type { NextPage } from 'next'
import Map from '../components/layout/map/map'
import NavBar from '../components/layout/bottomNav/navBar'
import { useState } from 'react'
import { RootState } from '../core/redux/module/rootReducer'
import { useSelector } from 'react-redux'

const Home: NextPage = () => {
  const { modalOpen } = useSelector((state: RootState) => state.modalOpenSlice)
  return (
    <>
      <Map></Map>

      {!modalOpen && <NavBar />}
    </>
  )
}

export default Home
