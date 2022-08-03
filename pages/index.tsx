import type { NextPage } from 'next'
import Dashboard from '../components/Home/Dashboard'
import Layout from '../components/Layout/Layout'
const Home: NextPage = () => {
  return (
    <Layout title='Coderecs'>
      <Dashboard />
    </Layout>
  )
}

export default Home
