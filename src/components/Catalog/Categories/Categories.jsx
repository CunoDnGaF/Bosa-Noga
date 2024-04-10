import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { categoriesLoading, categoryChange } from '../../../redux/slice/catalogSlice';
import Loader from '../../Loader/Loader';

function Categories() {
  const {categories, catLoading, catError, activeCategory} = useSelector(state => state.catalog);
  const dispatch = useDispatch();
  const path = 'api/categories';

  useEffect(() => {
    dispatch(categoriesLoading(path))
  }, [])

  const handleClick = function(id) {
    dispatch(categoryChange(id));
  }

  if (catLoading) {
    return <Loader />;
  } 
  if (catError) {
    return <p>Что-то пошло не так...<br></br>Ошибка: {catError}</p>;
  } 
  if (categories) {
    return <ul className="catalog-categories nav justify-content-center">
              <li className="nav-item">
                <a className={activeCategory === '' ? "nav-link active" : "nav-link"} href="#" onClick={() => handleClick('')}>Все</a>
              </li>
              {categories.map(categorie => 
              <li className="nav-item" key={categorie.id}>
                <a className={activeCategory === categorie.id ? "nav-link active" : "nav-link"} href="#" onClick={() => handleClick(categorie.id)}>{categorie.title}</a>
              </li>
              )}
            </ul>
  } else {
    return null;
  }
}

export default Categories;