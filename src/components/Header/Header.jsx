import { NavLink } from "react-router-dom";
import Banner from './Banner/Banner'
import { useState } from "react";
import { searchChange } from '../../redux/slice/catalogSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

function Header() {
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const cartCount = items.length;

  const onSearch = () => {
    if (isActive && text =='') {
      setIsActive(false);
    } 
    if (isActive && text && text != '') {
      onSubmit();
    }
    if (!isActive) {
      setIsActive(true);
    }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const handleCart = () => {
    navigate('/cart');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchChange(text));
    navigate('/catalog');
  };

  return (
    <header className="container">
      <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <NavLink className="navbar-brand" to="/">
                <img src="./src/img/header-logo.png" alt="Bosa Noga"></img>
              </NavLink>
              <div className="collapse navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Главная
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/catalog">
                      Каталог
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/about">
                      О магазине
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/contacts">
                      Контакты
                    </NavLink>
                  </li>
                </ul>
                <div>
                  <div className="header-controls-pics">
                    <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={onSearch}></div>
                    <div className="header-controls-pic header-controls-cart" onClick={handleCart}>
                      {cartCount > 0
                        ? <div className="header-controls-cart-full">{cartCount}</div>
                        : <div className="header-controls-cart"></div>
                      }
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </div>
                  <form data-id="search-form" 
                  onSubmit={onSubmit}
                  className={
                    isActive 
                    ? "header-controls-search-form form-inline"
                    : "header-controls-search-form form-inline invisible"
                  }>
                    <input className="form-control" placeholder="Поиск" onChange={onChange} value={text}></input>
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <Banner />
      </header>
  )
}

export default Header;