import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { topSalesLoading } from '../../../redux/slice/topSalesSlice';
import Product from '../../Product/Product';
import Loader from '../../Loader/Loader'

function TopSales() {
  const {items, loading, error} = useSelector(state => state.topSales);
  const dispatch = useDispatch();
  const path = 'api/top-sales'

  useEffect(() => {
    dispatch(topSalesLoading(path))
  }, [])

  if (loading) {
    return <Loader />;
  } 
  if (error) {
    return <p>Что-то пошло не так...<br></br>Ошибка: {error}</p>;
  } 
  if (items && items.length > 0) {
    return <section className="top-sales">
              <h2 className="text-center">Хиты продаж!</h2>
              <div className="row">
                {items.map(product => <Product key={product.id} product={product} isCatalog={false}/>)}
              </div>
            </section>
  } else {
    return null;
  }
}

export default TopSales;