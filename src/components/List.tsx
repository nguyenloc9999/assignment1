/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductContext from '@/context/Product'
import React, { useContext, useEffect } from 'react'
import axios from 'axios'

const List = () => {
    const {state, dispatch} = useContext(ProductContext) as any;
    console.log("state", state);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const {data} = await axios.get("http://localhost:3000/products");
                dispatch({type: "FETCH_PRODUCTS", payload: data});
            // eslint-disable-next-line no-empty
            } catch (error) {
            }
            finally{ /* empty */ }
        };
        fetchProducts()
    }, []);

    const addProduct = async (product: any) => {
        try {
            const {data} = await axios.post("http://localhost:3000/products", product);
            dispatch({type: "ADD_PRODUCT", payload: data})
        } catch (error) { /* empty */ }
        finally{ /* empty */ }
    }
    const updateProduct = async (product: any) => {
        try {
            const {data} = await axios.put("http://localhost:3000/products/" + product.id, product);
            dispatch({type: "UPDATE_PRODUCT", payload: data})
        } catch (error) { /* empty */ }
        finally{ /* empty */ }
    }
    const deleteProduct = async (id: any) => {
        try {
            // call api
            await axios.delete("http://localhost:3000/products/" + id);
            // rerender
            dispatch({ type: "REMOVE_PRODUCT", payload: id });
        } catch (error) { /* empty */ }
        finally{ /* empty */ }
    }
  return (
    <div>
        {state?.products.map((item: any) => {
            return <div key={item.id}>
                {item.name}
                </div>
        })}
        <button className="border bg-blue-500 p-2" onClick={() => addProduct({name: "abc"})}>Add Product</button>
        <button className="border bg-blue-500 p-2" onClick={() => updateProduct({name: "abc updated", id: 3})}>Update Product</button>
        <button className="border bg-blue-500 p-2" onClick={() => deleteProduct(3)}>Delete Product</button>
    </div>
  )
}

export default List