import React from 'react';
import thunk from "redux-thunk";
import reducers from './reducers';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";


export const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default function MyProvider({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}