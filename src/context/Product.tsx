import React, { createContext, useReducer } from 'react';
import {produce} from "immer";
import { productReducer } from '@/reducers/Product';

const ProductContext = createContext([]);

const initialState = {
    products: [],
    isLoading: false,
    error: ""
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(produce(productReducer), initialState);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <ProductContext.Provider value={{state, dispatch} as any}>
        {children}
    </ProductContext.Provider>
  )
}

export {ProductProvider}
export default ProductContext;