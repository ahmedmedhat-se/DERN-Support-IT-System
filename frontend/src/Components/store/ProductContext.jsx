import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const apiRequest = await axios.get("http://localhost:5000/api/products");
            setProducts(apiRequest.data);
        } catch (error) {
            console.error(`Error Occurred When Fetching Data: ${error}`);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products }}>
            {children}
        </ProductContext.Provider>
    );
};