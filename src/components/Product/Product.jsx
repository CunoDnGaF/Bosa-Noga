import { NavLink } from "react-router-dom";

function Product({product, isCatalog}) {
  const img = product.images[0];
 
  return (
    <div className="col-4">
      <div className={isCatalog ? "card catalog-item-card" : "card"}>
        <img src={img}
          className="card-img-top img-fluid" 
          alt={product.title}>
        </img>
        <div className="card-body">
          <p className="card-text">{product.title}</p>
          <p className="card-text">{product.price} руб.</p>
          <NavLink className="btn btn-outline-primary" to={`/catalog/${product.id}`}>Заказать</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Product;