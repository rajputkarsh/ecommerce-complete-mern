import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {

    const category = useLocation().pathname.split("/")[2]

    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState("d-asc")

    const handleFilters = (e) => {
        const value = e.target.value
        setFilters({
            ...filters,
            [e.target.name] : value,
        })
    }
    
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>{category.substring(0, 1).toUpperCase() + category.substring(1, category.length).toLowerCase() }</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option value="">
                            Color
                        </Option>
                        <Option value="white">White</Option>
                        <Option value="black">Black</Option>
                        <Option value="red">Red</Option>
                        <Option value="blue">Blue</Option>
                        <Option value="yellow">Yellow</Option>
                        <Option value="green">Green</Option>
                    </Select>
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled>
                            Size
                        </Option>
                        <Option value="xs">XS</Option>
                        <Option value="s">S</Option>
                        <Option value="m">M</Option>
                        <Option value="l">L</Option>
                        <Option value="xl">XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={(e) => {setSort(e.target.value)}}>
                        <Option value="d-asc">Newest</Option>
                        <Option value="p-asc">Price (asc)</Option>
                        <Option value="p-desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products category={category} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default ProductList;