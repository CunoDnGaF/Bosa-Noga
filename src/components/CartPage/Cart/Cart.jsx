import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeItem } from '../../../redux/slice/cartSlice';

function Cart() {
  const { items } = useSelector((state) => state.cart);
  const totalAmount = items.reduce((accumulator, item) => accumulator + item.price * item.count, 0);
  const dispatch = useDispatch();

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  if(items.length > 0) {
    return (
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
              <td scope="row">{i + 1}</td>
              <td>
                <NavLink className="navbar-brand" to={`/catalog/${item.id}`}>
                  {item.title}
                </NavLink>
              </td>
              <td>{item.size}</td>
              <td>{item.count}</td>
              <td>{item.price} руб.</td>
              <td>{item.price * item.count} руб.</td>
              <td><button className="btn btn-outline-danger btn-sm" onClick={() => handleRemove(item.name)}>Удалить</button></td>
            </tr>
            ))}
            <tr>
              <td colSpan="5" className="text-right">Общая стоимость</td>
              <td>{totalAmount} руб.</td>
            </tr>
          </tbody>
        </table>
      </section>
    )
  } else {
    return <h2>Ваша корзина пуста</h2>
  }
}

export default Cart;