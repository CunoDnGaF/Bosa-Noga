import { useDispatch, useSelector } from 'react-redux'
import { searchChange } from '../../../redux/slice/catalogSlice';

function Search() {
  const { searchValue } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChangeField = (e) => {
    const { value } = e.target;
    dispatch(searchChange(value));
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={onSubmit}>
      <input className="form-control" placeholder="Поиск" value={searchValue} onChange={onChangeField}></input>
    </form>
  )
}

export default Search;