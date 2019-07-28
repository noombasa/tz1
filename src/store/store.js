import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "../reducers/index.js";
import sagas from "../sagas/index";

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = compose(applyMiddleware(sagaMiddleware))(
	createStore
);

const store = createStoreWithMiddleware(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

sagaMiddleware.run(sagas);

export default store;
