import { useDispatch, useSelector } from "react-redux";
import { orderLoading, changeOwnerData, orderSuccess, orderError } from '../../../redux/slice/cartSlice';
import Loader from '../../Loader/Loader';

function Order() {
  const { items, body, loading, error, success } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const submitOrder = async (order) => {
    const response = await fetch(`http://localhost:7070/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(order),
    });
    if(response.ok) {
      dispatch(orderSuccess());
    } else {
      dispatch(orderError(response.statusText));
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(changeOwnerData({id, value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(orderLoading());
    submitOrder(body);
  };

  if(loading) return <Loader />
  if(error) return <div>{error}</div>
  if(success) return <h4>Ваш заказ успешно оформлен</h4>

  if(items.length > 0) {
    return (
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input 
              className="form-control" 
              id="phone" 
              placeholder="Ваш телефон"
              required
              onChange={handleChange}
              >
              </input>
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input 
              className="form-control" 
              id="address" 
              placeholder="Адрес доставки"
              required
              onChange={handleChange}
              >
              </input>
            </div>
            <div className="form-group form-check">
              <input 
              type="checkbox" 
              className="form-check-input"
              required
              id="agreement"
              >
              </input>
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
            </div>
            <button type="submit" className="btn btn-outline-secondary">Оформить</button>
          </form>
        </div>
      </section>
    )
  } else {
    return null;
  }
}

export default Order;