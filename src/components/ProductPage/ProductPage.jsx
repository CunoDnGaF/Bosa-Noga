import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { productPageLoading } from '../../redux/slice/productPageSlice';
import { addToCart } from '../../redux/slice/cartSlice';
import NotFound from "../NotFound/NotFound";
import Loader from '../Loader/Loader';

function ProductPage() {
  const params = useParams();
  const {item, loading, error} = useSelector(state => state.productPage);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = `api/items/${params.id}`;
  let img;

  useEffect(() => {
    dispatch(productPageLoading(path))
  }, [])

  useEffect(() => {
    if (item && item.sizes) setSizes(item.sizes.filter(size => size.available));
  }, [item]);

  const handleSelectSize = (size) => {
    if (selectedSize == size) setSelectedSize("");
    else setSelectedSize(size);
  };

  const handleLess = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleMore = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const handleCart = () => {
    const cart = {
      name: `${item.id}_${selectedSize}`,
      id: item.id,
      title: item.title,
      size: selectedSize,
      count: quantity,
      price: item.price,
    };
    dispatch(addToCart(cart));
    navigate('/cart');
  };

  if (loading) {
    return <Loader />;
  } 
  if (error) {
    return <p>Что-то пошло не так...<br></br>Ошибка: {error}</p>;
  } 
  if (item) {
    if(item.images) {
      img = item.images[0];
    }

    return (
      <section className="catalog-item">
        <h2 className="text-center">{item.title}</h2>
        <div className="row">
          <div className="col-5">
              <img src={img}
                  className="img-fluid" alt="">
              </img>
          </div>
          <div className="col-7">
            <table className="table table-bordered">
              <tbody>
                <tr>
                    <td>Артикул</td>
                    <td>{item.sku}</td>
                </tr>
                <tr>
                    <td>Производитель</td>
                    <td>{item.manufacturer}</td>
                </tr>
                <tr>
                    <td>Цвет</td>
                    <td>{item.color}</td>
                </tr>
                <tr>
                    <td>Материалы</td>
                    <td>{item.material}</td>
                </tr>
                <tr>
                    <td>Сезон</td>
                    <td>{item.season}</td>
                </tr>
                <tr>
                    <td>Повод</td>
                    <td>{item.reason}</td>
                </tr>
              </tbody>
            </table>
              <div className="text-center">
                <p>Размеры в наличии: 
                  {sizes.map((size) => (
                  <span
                  onClick={() => handleSelectSize(size.size)}
                  key={size.size}
                  className={
                    selectedSize == size.size
                    ? "catalog-item-size selected"
                    : "catalog-item-size"
                  }
                  >
                    {size.size}
                  </span> 
                  ))}  
                </p>
                {sizes && sizes != []
                ? (<p>Количество: <span className="btn-group btn-group-sm pl-2">
                    <button
                    className="btn btn-secondary"
                    onClick={handleLess}
                    >
                      -
                    </button>
                    <span className="btn btn-outline-primary">{quantity}</span>
                    <button 
                    className="btn btn-secondary"
                    onClick={handleMore}
                    >
                      +
                    </button>
                    </span>
                  </p>)
                : null
                }
              </div>
              {sizes && sizes != []
              ? (<button 
                className="btn btn-danger btn-block btn-lg"
                disabled={selectedSize === ""}
                onClick={handleCart}
                >
                  В корзину
                </button>)
              : null
              }
          </div>
        </div>
        </section>
    )
  } else {
    return <NotFound />;
  }
}

export default ProductPage;