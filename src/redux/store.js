import topSalesSlice from "./slice/topSalesSlice";
import catalogSlice from "./slice/catalogSlice";
import productPageSlice from "./slice/productPageSlice";
import cartSlice from "./slice/cartSlice";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "./saga/saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    topSales: topSalesSlice,
    catalog: catalogSlice,
    productPage: productPageSlice,
    cart : cartSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

export default store;