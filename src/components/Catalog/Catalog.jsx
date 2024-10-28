import Search from './Search/Search';
import Categories from './Categories/Categories';
import ProductList from './ProductList/ProductList';

function Catalog({search}) {
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {search && <Search />}
      <Categories />
      <ProductList />
    </section>
  )
}

export default Catalog;