import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'

function Body() {
  return (
    <div>
      <Header />
      <main className='container'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body;