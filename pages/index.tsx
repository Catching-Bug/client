import type { NextPage } from 'next'
import Map from '../src/components/map/map'

const Home: NextPage = () => {
  return <Map latitude={33.5563} longitude={126.79581}></Map>
}

export default Home
