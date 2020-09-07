import React from 'react';
// import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import './App.css';
import HomePage from "./pages/HomePage";
import {store, persistor} from "../stores/store";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                {/*<PersistGate persistor={persistor}>*/}
                    <HomePage/>
                {/*</PersistGate>*/}
            </Provider>
        </div>
    );
}

export default App;
