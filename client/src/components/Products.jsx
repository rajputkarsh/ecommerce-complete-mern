import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios"

import Product from "./Product";

import { popularProducts } from "../data";
import { API_PATH, API_PATH_PRODUCT_LIST } from "../constants";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ category, filters, sort }) => {

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            try{
                const request = await axios.get(
                    category 
                    ? API_PATH + API_PATH_PRODUCT_LIST + `?category=${category}` 
                    : API_PATH + API_PATH_PRODUCT_LIST )

                setProducts(request.data)
            }
            catch(error){
                console.log("Error in fetching data")
            }
        }

        getProducts()

    }, [category]);

    useEffect(() => {

        setFilteredProducts(
            products.filter(item => Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)
            ))
        )

    }, [products, filters])

    useEffect(() =>{



        const [sortType, sortDirection] = sort.split("-")

        // sort by date - newest or oldest
        if(sortType === "d"){
            if (sortDirection === "asc"){
                setFilteredProducts((prev) =>
                    [...prev].sort((a, b) => a.createdAt - b.createdAt ))
            }
            else{
                setFilteredProducts((prev) =>
                    [...prev].sort((a, b) => b.createdAt - a.createdAt ))                
            }
        }
        // sort by price
        else if (sortType === "p"){
            if (sortDirection === "asc") {
                setFilteredProducts((prev) =>
                    [...prev].sort((a, b) => a.price - b.price ))
            }
            else {
                setFilteredProducts((prev) =>
                    [...prev].sort((a, b) => b.price - a.price ))
            }            
        }

    }, [sort])

    return (
        <Container>
            { category ? 
                filteredProducts.map((item) => (
                    <Product item={item} key={item.id} />
                ))
                : popularProducts.map((item) => (
                    <Product item={item} key={item.id} />
                ))
        }
        </Container>
    );
};

export default Products;