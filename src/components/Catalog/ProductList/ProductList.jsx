import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { catalogLoading, loadMoreLoading } from '../../../redux/slice/catalogSlice';
import Product from '../../Product/Product';
import Loader from '../../Loader/Loader';

function ProductList() {
  const {items, loading, error, activeCategory, searchValue, loadMoreItems, loadMore} = useSelector(state => state.catalog);
  const dispatch = useDispatch();
  let path;

  const [offset, setOffset] = useState(0);
  const [lmi, setlmi] = useState([]);

  if (activeCategory === '') {
    path = 'api/items?';
  } else {
    path = `api/items?categoryId=${activeCategory}&`;
  }
  
  if (searchValue !== '') {
    path = `${path}q=${searchValue}&`
  }

  useEffect(() => {
    dispatch(catalogLoading(path));
  }, [activeCategory, searchValue, offset])

  useEffect(() => {
    setlmi([]);
    setOffset(6);
  }, [activeCategory])

  const handleClick = () => {
    setOffset(offset + 6);
    dispatch(loadMoreLoading(`${path}offset=${offset}`));
    setlmi([...lmi, ...loadMoreItems]);
  }

  if (loading) {
    return <Loader />;
  } 
  if (error) {
    return <p>Что-то пошло не так...<br></br>Ошибка: {error}</p>;
  } 
  if (items) {
    return (
      <React.Fragment>
        <div className="row">
          {items.map(product => <Product key={product.id} product={product} isCatalog={true}/>)}
          {lmi && lmi.map(product => <Product key={product.id} product={product} isCatalog={true}/>)}
        </div>
          {loadMore && <button className="btn btn-outline-primary" onClick={handleClick}>Загрузить ещё</button>}
      </React.Fragment>
    )
  }
}

export default ProductList;