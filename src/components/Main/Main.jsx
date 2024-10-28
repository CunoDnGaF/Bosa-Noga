import React from 'react';
import TopSales from './TopSales/TopSales';
import Catalog from '../Catalog/Catalog';

function Main() {
  return (
    <React.Fragment>
      <TopSales />
      <Catalog />
    </React.Fragment>
  )
}

export default Main;