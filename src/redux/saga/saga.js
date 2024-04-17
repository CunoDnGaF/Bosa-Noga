import { topSalesLoading, topSalesSuccess, topSalesError } from "../slice/topSalesSlice"
import { productPageLoading, productPageSuccess, productPageError } from "../slice/productPageSlice"
import { catalogLoading, catalogSuccess, catalogError, categoriesLoading, categoriesSuccess, categoriesError } from "../slice/catalogSlice"
import { take, put, spawn, takeLatest, call } from 'redux-saga/effects';

async function getData(path) {
  const response = await fetch(`http://localhost:7070/${path}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

function* handleLoadingSaga(actions, action) {
  try {
    const data = yield call(getData, action.payload);
    yield put(actions.success(data));
  } catch (error) {
    yield put(actions.error(error.message));
  }
}

function* watchLoadingSaga(actions) {
  while(true) {
    const actionType = actions.req.type;
    yield take(actionType);
    yield takeLatest(actionType, handleLoadingSaga, actions)
  }
}

export default function* saga() {
  yield spawn(watchLoadingSaga, {
    req: topSalesLoading, 
    success: topSalesSuccess, 
    error: topSalesError
  })
  yield spawn(watchLoadingSaga, {
    req: catalogLoading, 
    success: catalogSuccess, 
    error: catalogError
  })
  yield spawn(watchLoadingSaga, {
    req: categoriesLoading, 
    success: categoriesSuccess, 
    error: categoriesError
  })
  yield spawn(watchLoadingSaga, {
    req: productPageLoading, 
    success: productPageSuccess, 
    error: productPageError
  })
}