import React from 'react';
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import Product from '../../Product/Product';
import Loader from '../../Loader/Loader';

function ProductList() {
  const { activeCategory, searchValue } = useSelector(state => state.catalog);
  const OFFSET = 6;

  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState(null)
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState([]);

  async function fetchProducts ({ categoryId, query, offset }) {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (categoryId) {
        params.append('categoryId', categoryId)
      }
      if (query) {
        params.append('q', query)
      }
      if (offset) {
        params.append('offset', offset)
      }
      const response = await fetch(`https://bosa-noga-be.onrender.com/api/items?${params}`)
    
      const data = await response.json()
      
      if (data.length < OFFSET) {
        setHasMore(false)
      }

      if (!offset) {
        setItems([...data])
      } else {
        setItems(prevItems => {
          return [...prevItems, ...data]
        })
      }
      setError(null)
      return data
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setOffset(0)
    setItems([])
    setHasMore(true)
    fetchProducts({
      categoryId: activeCategory,
      query: searchValue
    })
  }, [activeCategory, searchValue]);

  const fetchMoreProducts = async () => {
    await fetchProducts({
      categoryId: activeCategory,
      query: searchValue,
      offset: offset + 6
    })
    setOffset(offset + 6)
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
        </div>
          {hasMore && <button className="btn btn-outline-primary" onClick={fetchMoreProducts}>Загрузить ещё</button>}
      </React.Fragment>
    )
  }
}

export default ProductList;