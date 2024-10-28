import { createBrowserRouter } from 'react-router-dom';
import Body from '../components/Body';
import About from '../components/About/About';
import Contacts from '../components/Contacts/Contacts';
import NotFound from '../components/NotFound/NotFound';
import Main from '../components/Main/Main';
import Catalog from '../components/Catalog/Catalog';
import ProductPage from '../components/ProductPage/ProductPage';
import CartPage from '../components/CartPage/CartPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Body />,
    children: [
      {
        index: true,
        element: <Main />
      },
      {
        path: '/catalog',
        element: <Catalog search={true}/>
      },
      {
        path: '/catalog/:id',
        element: <ProductPage />
      },
      {
        path: '/cart',
        element: <CartPage />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contacts',
        element: <Contacts />
      },
      {
        path: '/*',
        element: <NotFound />
      },
    ]
  }
],
{basename: '/Bosa-Noga'}
)