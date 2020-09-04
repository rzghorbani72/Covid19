import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import combineReducer from './reducer';
import rootSaga from './saga';

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, combineReducer());
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancers = [applyMiddleware(...middlewares)];
let store = createStore(persistedReducer, ...enhancers);
sagaMiddleware.run(rootSaga);
let persistor = persistStore(store);
export { store,persistor, sagaMiddleware };